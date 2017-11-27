/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const router = new Router();
const user = require('./user');
const log = require('./log');


const init = (app) => {

    // add cors middleware
    router.use(async (ctx, next) => {
        let res = ctx.response;
        let origin = ctx.request.get('Origin');
        res.set('Access-Control-Allow-Origin', origin);
        res.set('Access-Control-Allow-Credentials', true);
        res.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
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
    //  加载路由中间件
    app.use(router.routes()).use(router.allowedMethods());
}
module.exports = {
    init
};
