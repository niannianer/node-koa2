/**
 * Created by DELL on 2017/11/24.
 */
const func = {};
func.createRandomString = (len = 16) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = possible.length;
    for (let i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * length));

    return text;
}
module.exports = func;
