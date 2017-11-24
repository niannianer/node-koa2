/**
 * Created by DELL on 2017/11/24.
 */
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa();
const routes = require('./routes');

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './static'
app.use(static(path.join(__dirname, staticPath)));

const bodyParser = require('koa-bodyparser');

// 使用ctx.body解析中间件
app.use(bodyParser());
// init routes ;
routes.init(app);

// catch 404 ;
app.use(async (ctx) => {
    ctx.body = {
        code: 404,
        msg: 'not found'
    }
})

app.listen(3000, () => {
    console.log('koa application  is starting at port 3000')
});
