/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const user = new Router();
const userService = require('../services/user');
user.post('/register', async (ctx) => {
    return userService.register(ctx);
});
user.post('/login', async (ctx, next) => {
    return userService.login(ctx);
});


// auth identify  middleware
user.use(async (ctx, next) => {
    let {userInfo} = ctx.session;
    if (userInfo && userInfo['id']) {
        return await next();
    } else {
        let err = new Error('need login');
        err.code = 401;
        throw err;
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
