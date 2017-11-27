/**
 * Created by DELL on 2017/11/27.
 */
const bs = require('../bs');
const Log = bs.Model.extend({
    tableName: 'logs'
});
module.exports = Log;
