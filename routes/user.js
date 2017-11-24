/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const user = new Router();
const response = require('../utils/response');
const userService = require('../services/user');
user.get('/pages', async (ctx) => {
    return response(userService.getPages)(ctx);
});
user.post('/register', async (ctx) => {
    return response(userService.register)(ctx);
});
user.post('/login', async (ctx, next) => {
    return response(userService.login)(ctx);
});
user.post('/logout', async (ctx, next) => {
    ctx.body = 'logout';
});
module.exports = user;
