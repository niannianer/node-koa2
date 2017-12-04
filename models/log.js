/**
 * Created by DELL on 2017/11/27.
 */
const bs = require('../bs');
const user = require('./user');
const Logs = bs.model('log', {
    tableName: 'logs',
    user: function () {
        return this.belongsTo(user,'user_id','id');
    }
});
module.exports = Logs;
