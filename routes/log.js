/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const log = new Router();
const CustomError = require('../utils/custom-error');

const logService = require('../services/log');
// auth identify  middleware
log.use(async (ctx, next) => {
    let {userInfo} = ctx.session;
    if (userInfo && userInfo['uuid']) {
        return await next();
    } else {
        throw new CustomError(401, 'need login');
    }
});
log.get('/getLogs', async (ctx) => {
    return logService.getLogs(ctx);
});
log.post('/create', async (ctx) => {
    return logService.creatLog(ctx);
});
module.exports = log;
