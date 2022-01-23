const User = require ('../models/User');
module.exports = async function (user) {
    if (user.password) user.password = md5(user.password);
    try {
        await User.findById(user._id).updateOne(user);
        return true;
    } catch (error) {
        throw new Error(`Update User fail: ${error}`);
    }
}