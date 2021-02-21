
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

function afterEachH(html, next) {

    //console.log(html);
    //正则表达式提取去重
    let md5s = Array.from(new Set(html.match(md5Re)));
    let sha1s = Array.from(new Set(html.match(sha1Re)));
    let sha256s = Array.from(new Set(html.match(sha256Re)));

    let sums = [...md5s, ...sha1s, ...sha256s];
    console.log(sums);

    for (let i = 0; i < sums.length; i++) {

        let info = sumMap.get(sums[i]);
        if (!info) {
            console.log('Unknown checksum:' + sums[i]);
            continue;
        }
        //存在信息判断文件是否存在
        fetch(info.name, { method: 'HEAD' })
            .then(res => {
                console.log(info.name + " rs.url" + res.url);
                if (res.ok) {
                    //文件存在则替换为超链接   
                    html = html.replaceAll('dog', 'monkey')


                } else if (res.status == 404) {
                    console.log('文件未找到' + info.name);
                }
            });

    }

    // 解析成 html 后调用。
    // beforeEach 和 afterEach 支持处理异步逻辑
    // ...
    // 异步处理完成后调用 next(html) 返回结果
    next(html);
}



