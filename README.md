# 说明

本站是为介绍一些基本的软件,以及存放在局域网方便下载,避免搭建新环境的第一步是漫长的等待下载。



- ./docsify.min.js 本站使用[docsify](https://docsify.js.org/#/)搭建
- ./dl/   软件保存目录
- ./docs/ 文档保存目录  
- ./checksum.sh 更新文件hash值到 `./docs/checksum.md`,添加参数`-f`清空源文件 重新计算所有hash
 


# 版本

`开源软件` 往往意味着免费/自由(free),感谢开源组织的付出 [Apache](https://www.apache.org/),
[GNU](https://www.gnu.org/)等组织的付出。   
但是开源并不一定是免费如
[Red Hat Enterprise Linux operating system](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux),
需要免费选择功能类似的[CentOS](https://www.centos.org/)

**付费/捐赠是对软件开发商最好的支持**

商业公司在提供付费软件的同时,还可能提供功能受限的免费版本 (个人家庭版/商业版)。 

下载的文件常用后缀名 msi/exe `安装包`,zip `压缩包`。
安装版本可能会常驻服务,注册表写入数据,难以卸载干净,看个人习惯可以下载`免安装版本`,解压即用。

 
部分软件可能会有`特供版`,可能更好(添加实用小功能),可能更差(添加广告),注意甄别。


# 校验和

推荐从官网下载最新的版本,如需要从其他地方下载注意校验和官方的校验和是否一致,
避免发生类似`XcodeGhost`开发工具带毒事件。    
参考`Apache Software Foundation`的
[HOW TO VERIFY DOWNLOADED FILES](https://www.apache.org/info/verification.html).
 

在`Linux`上，使用 `sha256sum` 或 `md5sum` 命令行工具来验证下载文件的完整性。  
在`OS X`上，使用`shasum -a 256`或`md5`命令行工具来验证下载文件的完整性。   
在`Windows PowerShell 5.0`上 ，可以使用`Get-FileHash`命令行工具来验证下载文件的完整性。



linux 查看校验和
```bash
$ sha256sum  jdk-15.0.2_windows-x64_bin.zip
92994c5546a3d80d470cd6ba0a6248216f0c069c2a16f64437e4f421775d6be9  jdk-15.0.2_windows-x64_bin.zip
$ md5sum jdk-15.0.2_windows-x64_bin.zip
82283d1d0793f2ded0d6c06212a08074  jdk-15.0.2_windows-x64_bin.zip
```

windows
```
> Get-FileHash jdk-15.0.2_windows-x64_bin.zip | Format-List
Algorithm : SHA256
Hash      : 92994C5546A3D80D470CD6BA0A6248216F0C069C2A16F64437E4F421775D6BE9
Path      : jdk-15.0.2_windows-x64_bin.zip
```

如果安装有`7z`,则可以选中文件右键`CRC SHA`-`*`查看校验和
```
名称: jdk-15.0.2_windows-x64_bin.zip
大小: 187986283 字节 (179 MiB)
CRC32: B6AB22B2
CRC64: B73FCC17259383A0
SHA256: 92994C5546A3D80D470CD6BA0A6248216F0C069C2A16F64437E4F421775D6BE9
SHA1: D440B082C0A0F8173381BC628D35753261918BA0
BLAKE2sp: 6E2010FE7AA20DD93943C8591F679DB44F6D4F719541002E8B9CAC4DE9E1068D
```
82283d1d0793f2ded0d6c06212a08074  jdk-15.0.2_windows-x64_bin.zip

 
[JDK 11.0.10 checksum](https://www.oracle.com/webfolder/s/digest/11-0-10-checksum.html)
提供了`SHA256`
[Fedora 33 x86_64 CHECKSUM](https://getfedora.org/static/checksums/Fedora-Workstation-33-1.2-x86_64-CHECKSUM)
提供了 `SHA256`和`PGP`
 


# 命令行参数

很多程序都可以使用特殊格式的参数来修改程序的一些行为，这样的参数被称为旗标或选项。

比如 `火狐浏览器` 可以在选项-常规-连接设置,直观独立的设置网络代理。
但是`chrome 浏览器`在 设置-高级-打开您计算机的代理设置,中设置的是系统代理。

使用命令行参数就可以独立设置`chrome 浏览器`的代理

    "C:\Program Files\Google\Chrome\Application\chrome.exe" --proxy-server="127.0.0.1:10809"

可以将完整的命令保存为bat文件,或者选择应用程序右键发送快捷方式,修改快捷方式的属性,在`目标[T]:` 后追加所需的参数,
这样和一般的桌面快捷方式并无二致。

再比如本地已经有了稳定的JAVA(JDK 7)开发环境,不能轻易更改环境变量配置。下载最新eclipse尝鲜发现需要`JDK 8`才可以启动。
这时候就可以使用`-vm`参数,比起修改`eclipse.ini`更简单且改错也无所谓 只是一个快捷方式。具体的参数可以查看官方文档/wiki/搜索引擎。
[FAQ How do I run Eclipse? - Eclipsepedia](https://wiki.eclipse.org/FAQ_How_do_I_run_Eclipse%3F)



