/**
 * Created by DELL on 2017/11/24.
 */
const Log = require('../models/log');
const log = {};
log.create = async (ctx) => {
    let userInfo = ctx.session.userInfo;
    let user_id = userInfo.uuid;
    let {type} = ctx.request.body;
    return new Log({user_id, type}).save();
};
log.getAll = async (ctx) => {
    let userInfo = ctx.session.userInfo;
    let {uuid} = userInfo;
    return Log.where({user_id: uuid}).fetchAll();
};
module.exports = log;
