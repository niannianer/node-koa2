/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const user = new Router();
const userService = require('../services/user');
user.get('/pages', async (ctx) => {
    return userService.getPages(ctx);
});
user.post('/register', async (ctx) => {
    return userService.register(ctx);
});
user.post('/login', async (ctx, next) => {
    return userService.login(ctx);
});
user.post('/logout', async (ctx, next) => {
    ctx.body = 'logout';
});
module.exports = user;
