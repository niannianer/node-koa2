/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const log = new Router();
const response = require('../utils/response');
const logService = require('../services/log');
log.get('/getLogs', async (ctx) => {
    return response(logService.getLogs)(ctx);
});
module.exports = log;
