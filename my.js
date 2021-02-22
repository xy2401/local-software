
//保存校验和对应的映射对象
let sumMap = new Map();
let sumList = [];

const md5Re = /\b[0-9a-f]{32}\b/g;
const sha1Re = /\b[0-9a-f]{40}\b/g;
const sha256Re = /\b[0-9a-f]{64}\b/g;

fetch("./docs/checksum.md")
    .then(response => response.text())
    .then(data => {
        //console.log(data);
        data = data.split("\n").slice(3);
        //console.log(data[0]);

        let info = {};
        for (let i = 0; i < data.length; i++) {
            let attributes = data[i].split('|').map(a => a.trim());
            if (attributes.length != 5) {
                console.log('data format error');
                console.log(data[i]);
                info = null;//清空数据
            }

            if (i % 2 == 0) {//两行为一组数据
                info = {};//new出一个对象
                info['date'] = attributes[1];
                info['size'] = attributes[2];
                info['name'] = attributes[3];
                sumList.push(info);
            } else {
                if (!info) {
                    console.log('hash data format error');
                    console.log(data[i]);
                }
                info['md5'] = attributes[1];
                info['sha1'] = attributes[2];
                info['sha256'] = attributes[3];

                sumMap.set(attributes[1], info);
                sumMap.set(attributes[2], info);
                sumMap.set(attributes[3], info);

                info = null;//清空数据
            }
        }
    });




function beforeEachM(content) {
    // 每次开始解析 Markdown 内容时调用
    // ...
    return content;
}

async function afterEachH(html, next) {

    //console.log(html);
    //正则表达式提取去重
    let md5s = Array.from(new Set(html.match(md5Re)));
    let sha1s = Array.from(new Set(html.match(sha1Re)));
    let sha256s = Array.from(new Set(html.match(sha256Re)));

    let sums = [...md5s, ...sha1s, ...sha256s];
    console.log(sums);

    let fetchPromise = [];
    for (let i = 0; i < sums.length; i++) {

        let info = sumMap.get(sums[i]);
        if (!info) {
            console.log('Unknown checksum:' + sums[i]);
            continue;
        }
        //存在信息判断文件是否存在 多次请求防止阻塞
        fetchPromise.push(fetch(info.name, { method: 'HEAD' })
            .then(res => { return { 'res': res, 'info': info, 'sum': sums[i], 'status': info.status = res.status } }));
    }

    //结果里面其实有很多数据,但是只要一个http的status就可以了 
    let fetchResult = await Promise.all(fetchPromise);

    //重新提取一边 不然多次替换字符串会有替换值被替换的问题
    html = html.replaceAll(/\b[0-9a-f]{32,64}|\b/g, match => {

        let info = sumMap.get(match);
        if (!info) {
            return match;
        }
        if (info.status == 200) {
            return `<a href="${info.name}" title="date: ${info.date}\nsize: ${info.size}\nname: ${info.name}\n\nmd5: ${info.md5}\nsha1: ${info.sha1}\nsha256: ${info.sha256}">${match}</a>`;
        } else if (info.status == 404) {
            console.log('文件未找到' + info.name);
        } else {
            console.log('文件未知状态:' + info.status);
        }
        return match;
    });


    // 解析成 html 后调用。
    // beforeEach 和 afterEach 支持处理异步逻辑
    // ...
    // 异步处理完成后调用 next(html) 返回结果
    next(html);
}



