/**
 * Created by DELL on 2017/11/24.
 */
const func = require('../utils/func');
const User = require('../models/user');
const user = {};
user.register = async (ctx) => {
    let {body} = ctx.request;
    let {mobile, password, userName} = body;
    let user_name = userName || '';
    if (!mobile || !password) {
        let err = new Error('arguments error');
        err.code = 400;
        throw err;
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
        let err = new Error('this mobile has registered');
        err.code = 402;
        throw err;
    }
    return new User({mobile, password, user_name}).save();
};
user.login = async (ctx) => {
    let {body} = ctx.request;
    let {mobile, password} = body;
    if (!mobile || !password) {
        let err = new Error('arguments error');
        err.code = 400;
        throw err;

    }
    let userInfo = await  new User({mobile, password}).fetch()
        .then(users => {
            if (users) {
                return users.toJSON();
            }
            else {
                let err = new Error('password or mobile error');
                err.code = 403;
                throw err;
            }

        });
    ctx.session.userInfo = userInfo;
    return userInfo;
};
module.exports = user;
