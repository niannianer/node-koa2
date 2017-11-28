/**
 * Created by DELL on 2017/11/28.
 */
const Router = require('koa-router');
const file = new Router();
const koaBody = require('koa-body');
const fileService = require('../services/file');
//
file.use(koaBody({multipart: true}));
file.post('/upload', async (ctx) => {
    return fileService.upload(ctx);
});
module.exports = file;
