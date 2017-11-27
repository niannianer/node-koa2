/**
 * Created by DELL on 2017/11/27.
 */
const bs = require('../bs');
require('./user');
const Logs = bs.model('log', {
    tableName: 'logs',
    logs: () => {
        return this.belongsTo('user');
    }
});
module.exports = Logs;
