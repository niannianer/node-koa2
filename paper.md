# 前后端分离思想


## 浏览器的同源策略
* 如果协议，端口和域名对于两个页面是相同的，则两个页面具有相同的源
* 同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。
这是一个用于隔离潜在恶意文件的关键的安全机制。

## 跨域 HTTP 请求
* 当一个资源从与该资源本身所在的服务器不同的源请求一个资源时，
资源会发起一个跨域 HTTP 请求。
* 出于安全考虑，浏览器会限制从脚本内发起的跨域HTTP请求。
    * XMLHttpRequest 或 Fetch 发起的跨域 HTTP 请求。
    * Web 字体 (CSS 中通过 @font-face 使用跨域字体资源)。
    * 使用 drawImage 将 Images/video 画面绘制到 canvas。
    * Scripts (未处理的异常)。
    * 其他。。。
 ## 跨域资源共享（ CORS ）
  * 跨域资源共享（ CORS ）机制允许 Web 应用服务器进行跨域访问控制，从而使跨域数据传输得以安全进行。
  * 浏览器支持在 API 容器中（例如 XMLHttpRequest 或 Fetch ）使用 CORS，以降低跨域 HTTP 请求所带来的风险。
  * CORS 需要客户端和服务器同时支持。目前，所有浏览器都支持该机制（IE 10 提供了对规范的完整支持，但在较早版本（8 和 9）中，
   CORS 机制是借由 XDomainRequest 对象完成）。
```javascript
// client
// origin ：https://zj-static.zj-hf.cn
     var request = new XMLHttpRequest();
     var url = 'https://zj-weixin.zj-hf.cn/personalCenter';
     request.open('GET', url, true);
     request.onreadystatechange = handler;
     request.send(); 
```
```javascript
// server 
      res.header("Access-Control-Allow-Origin", '*');  // 允许所有域名访问
      res.header('Access-Control-Allow-Credentials', false); // 不携带身份信息
```
## 预检请求
*  “需预检的请求”要求必须先使用 OPTIONS   
方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。
* "预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。
* 下列情况下需先发送预检请求。
   * 使用了下面任一 HTTP 方法：PUT，DELETE，CONNECT，OPTIONS，TRACE，PATCH。
   * 人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。
   该集合为：Accept，Accept-Language，Content-Language，Content-Type，DPR，Downlink，Save-Data，Viewport-Width，Width。
   * Content-Type 的值不属于下列之一:application/x-www-form-urlencoded，multipart/form-data，text/plain
```javascript
// client
// origin ：https://zj-static.zj-hf.cn

  var request = new XMLHttpRequest();
  var url = 'https://zj-weixin.zj-hf.cn/personalCenter';
  var body = '<?xml version="1.0"?><person><name>Arun</name></person>';
   request.open('POST', url, true);
   request.setRequestHeader('X-PINGOTHER', 'pingpong');// 集合之外的header
   request.setRequestHeader('Content-Type', 'application/xml'); // 不是三种之一
   request.send(body); 
    
```

```javascript
 // server 
 // add cors middleware
     app.use(async (ctx, next) => {
         let origin = ctx.get('Origin');
         ctx.set('Access-Control-Allow-Origin', origin);
         ctx.set('Access-Control-Allow-Credentials', false);
         ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
         ctx.set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
         let method = ctx.method;
         if ('OPTIONS' === method) {
             return ctx.body = 'options';
         }
         await  next();
     });
```
## 简单请求
* 某些请求不会触发 CORS 预检请求，称为简单请求。
* 简单请求必须满足下列条件。
   * 使用下列方法之一： GET，HEAD，POST
   * 不得人为设置该集合之外的其他首部字段。该集合为：
   Accept，Accept-Language，Content-Language，Content-Type，DPR，Downlink，Save-Data，Viewport-Width，Width。
   * Content-Type 的值仅限于下列三者之一：
   application/x-www-form-urlencoded，multipart/form-data，text/plain。
   * 简单请求将直接发送实际请求。
