/**
 * Created by DELL on 2017/11/24.
 */
const bs = require('../bs');
const fun = require('../utils/fun');
const CustomError = require('../utils/custom-error');
const Users = bs.Model.extend({
    tableName: 'users'
});
const user = {};
user.register = async (ctx) => {
    let {body} = ctx.request;
    if (!body) {
        throw new CustomError(400, 'arguments is need ');
    }
    let {mobile, password, userName} = body;
    let user_name = userName || '';
    let user_id = fun.getRandText(32);
    if (!mobile || !password) {
        throw new CustomError(400, 'arguments error ');
    }
    let users = await Users.forge({mobile}).fetchAll();
    if (users.length) {
        throw  new CustomError(402, ' this mobile has registered ');
    }
    return Users.forge({mobile, password, user_name, user_id}).save();
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
    return userInfo;
};
user.getPages = async (ctx) => {
    let then = new Date().getTime();
    let time = new Date().getTime() - then;
    return `${ctx.url} get many pages  cost ${time}`;
};
module.exports = user;
