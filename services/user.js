/**
 * Created by DELL on 2017/11/24.
 */
const fun = require('../utils/fun');
const CustomError = require('../utils/custom-error');
const Users = require('../models/user');
const user = {};
user.register = async (ctx) => {
    let {body} = ctx.request;
    if (!body) {
        throw new CustomError(400, 'arguments is need ');
    }
    let {mobile, password, userName} = body;
    let user_name = userName || '';
    let uuid = fun.getRandText(32);
    if (!mobile || !password) {
        throw new CustomError(400, 'arguments error ');
    }
    let users = await new Users({mobile}).fetch()
        .then(users => {
            if (users) {
                return users.toJSON();
            } else {
                return null;
            }
        });
    if (users) {
        throw  new CustomError(402, ' this mobile has registered ');
    }
    return new Users({mobile, password, user_name, uuid}).save();
};
user.login = async (ctx) => {
    let {body} = ctx.request;
    if (!body) {
        throw new CustomError(400, 'arguments is need ');
    }
    let {mobile, password} = body;
    if (!mobile || !password) {
        throw new CustomError(400, 'arguments error ');
    }
    let userInfo = await  new Users({mobile, password}).fetch()
        .then(users => {
            if (users) {
                return users.toJSON();
            }
            else {
                throw new CustomError(403, 'password or mobile error');
            }

        });
    ctx.session.userInfo = userInfo;
    return userInfo;
};
user.getPages = async (ctx) => {
    let then = new Date().getTime();
    let time = new Date().getTime() - then;
    console.log(`${ctx.url} get many pages  cost ${time}`);
    return `${ctx.url} get many pages  cost ${time}`;
};
module.exports = user;
