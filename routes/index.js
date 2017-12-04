/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const router = new Router();
const user = require('./user');
const log = require('./log');
const file = require('./file');


const init = (app) => {
// add cors middleware
    app.use(async (ctx, next) => {
        let origin = ctx.get('Origin');
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Credentials', true);
        ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        ctx.set('Access-Control-Allow-Headers', ',X-Requested-With, Content-Type, Accept');
        let method = ctx.method;
        if ('OPTIONS' == method) {
            return ctx.body = 'options';
        }
        await  next();
    });
    // add error hand middleware
    router.use(async (ctx, next) => {
        try {
            let data = await  next();
            ctx.body = {
                code: 200,
                data,
                msg: 'ok'
            }
        }
        catch (err) {
            if (err.name === 'CustomError') {
                ctx.body = {
                    code: err.code,
                    msg: err.message
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: err.message || err
                }
            }
        }
    });
    // 装载所有子路由
    router.use('/user', user.routes(), user.allowedMethods());
    router.use('/log', log.routes(), log.allowedMethods());
    router.use('/file', file.routes(), file.allowedMethods());
    //  加载路由中间件
    app.use(router.routes()).use(router.allowedMethods());
}
module.exports = {
    init
};
