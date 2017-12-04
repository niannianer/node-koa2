/**
 * Created by DELL on 2017/11/24.
 */
const Log = require('../models/log');
const log = {};
log.create = async (ctx) => {
    let userInfo = ctx.session.userInfo;
    let user_id = userInfo.id;
    let {type} = ctx.request.body;
    return new Log({user_id, type}).save();
};
log.getAll = async () => {
    return Log.forge().fetchAll({withRelated: 'user'});
};
module.exports = log;
