let http = require('http')
let port = 3000;
let fs   = require('fs')
let url  = require('url')
let path = require('path')
let mime = require('mime')//实现类型转化

//.css  .js  .html  前后端通信是通过字符串来通信的

http.createServer(function (req,res) {
    let {pathname,query} = url.parse(req.url,true);
 // /clock
    if (pathname ==='/clock')
    {
        let date = new Date();
        res.end(date.toLocaleString())
        return;
    }
    //处理静态文件的
    fs.stat('.'+ pathname,function (err,stats) {
        if (err)
        {
            res.statusCode=404
            res.end(`${pathname} not found`)
        }
        else if (stats.isFile())
        {
            res.setHeader('Content-Type',mime.getType(pathname)+';text/html;charset=utf8')
            fs.createReadStream('.'+ pathname).pipe(res)
        }
        else if (stats.isDirectory())
        {
            res.setHeader('Content-Type','text/html;charset=utf8')
            console.log('.' + pathname)
            let p =  path.join('.'+ pathname , './index.html')
            fs.createReadStream(p).pipe(res)
        }
    })

}).listen(port,() => {
    console.log(`服务器已经启动在${port}上`)
})

