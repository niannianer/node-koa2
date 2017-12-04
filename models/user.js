/**
 * Created by DELL on 2017/11/27.
 */
const bs = require('../bs');
const User = bs.Model.extend( {
    tableName: 'users',
    uuid:true
});
module.exports = User;
