/**
 * Created by DELL on 2017/11/24.
 */
const Logs = require('../models/log');
const log = {};
log.creatLog = async (ctx) => {
    let userInfo = ctx.session.userInfo;
    let user_id = userInfo.uuid;
    let {type} = ctx.request.body;
    return new Logs({user_id, type}).save();
};
log.getLogs = async (ctx) => {
    let userInfo = ctx.session.userInfo;
    let {uuid} = userInfo;
    return Logs.where({user_id: uuid}).fetchAll();
};
module.exports = log;
