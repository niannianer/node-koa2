/**
 * Created by DELL on 2017/11/24.
 */
const bs = require('../bs');
const Logs = bs.Model.extend({
    tableName: 'logs'
});
const log = {};
log.write = async (ctx) => {
    return [];

};
log.getLogs = async (ctx) => {
    return Logs.forge({}).fetchAll();
};
module.exports = log;
