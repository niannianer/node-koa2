/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const user = new Router();
const userService = require('../services/user');
const CustomError = require('../utils/custom-error');

user.post('/register', async (ctx) => {
    return userService.register(ctx);
});
user.post('/login', async (ctx, next) => {
    return userService.login(ctx);
});


// auth identify  middleware
user.use(async (ctx, next) => {
    let {userInfo} = ctx.session;
    if (userInfo && userInfo['uuid']) {
        return await next();
    } else {
        throw new CustomError(401, 'need login');
    }
});
user.post('/logout', async (ctx) => {
    ctx.session = null;
    return 'logout';
});
user.get('/pages', async (ctx) => {
    return userService.getPages(ctx);
});
module.exports = user;
