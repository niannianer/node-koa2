/**
 * Created by DELL on 2017/11/24.
 */
const Logs = require('../models/log');
const log = {};
log.creatLog = async (ctx) => {

    return [];

};
log.getLogs = async (ctx) => {
    return Logs.forge({}).fetchAll();
};
module.exports = log;
