/**
 * Created by DELL on 2017/11/27.
 */
const bs = require('../bs');
require('./log');
const Users = bs.model('user', {
    tableName: 'users',
    logs: () => {
        return this.hasMany('log');
    }
});
module.exports = Users;
