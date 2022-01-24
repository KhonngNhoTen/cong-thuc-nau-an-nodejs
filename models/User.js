const connection = require('../config/database');
const Schema = connection.Schema;
const UserSchema = new Schema({
    email: String,
    password: String,
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'menus'
    }]
}, {
    collection: 'users'
});

const User = connection.model('users', UserSchema);
module.exports = User;
