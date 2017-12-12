/**
 * Created by DELL on 2017/11/24.
 */
const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const app = new Koa();
const routes = require('./routes');


// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './static';
app.use(static(path.join(__dirname, staticPath)));

// 使用ctx.body解析中间件
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// session middleware
const session = require('koa-session');
app.keys = ['koa session key'];
const config = {
    key: 'koa:sessionID', /** (string) cookie key (default is koa:sess) */
    maxAge: 1000 * 60 * 60,
    domain: 'koa-dev.zj-hf.cn',// 指定了 cookie 将要被发送至哪个或哪些域中
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

app.use(session(config, app));

// init routes ;
routes.init(app);

// catch 404 error ;
app.use(async (ctx) => {
    ctx.body = {
        code: 404,
        msg: 'not found'
    }
})

// start server at port 3000
app.listen(3000, () => {
    console.log('koa application  is starting at port 3000')
});
