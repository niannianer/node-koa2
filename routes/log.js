/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const log = new Router();
const logService = require('../services/log');
// auth identify  middleware
log.use(async (ctx, next) => {
    let {userInfo} = ctx.session;
    if (userInfo && userInfo['id']) {
        return await next();
    } else {
        let err = new Error('need login');
        err.code = 401;
        throw err;
    }
});
log.get('/getAll', async (ctx) => {
    return logService.getAll(ctx);
});
log.post('/create', async (ctx) => {
    return logService.create(ctx);
});
module.exports = log;
