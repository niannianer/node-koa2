/**
 * Created by DELL on 2017/11/24.
 */
const func = require('../utils/func');
const CustomError = require('../utils/custom-error');
const User = require('../models/user');
const user = {};
user.register = async (ctx) => {
    let {body} = ctx.request;
    if (!body) {
        throw new CustomError(400, 'arguments is need ');
    }
    let {mobile, password, userName} = body;
    let user_name = userName || '';
    let uuid = func.createRandomString(32);
    if (!mobile || !password) {
        throw new CustomError(400, 'arguments error ');
    }
    let users = await new User({mobile}).fetch()
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
    return new User({mobile, password, user_name, uuid}).save();
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
    let userInfo = await  new User({mobile, password}).fetch()
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
module.exports = user;
