const connection = require('../config/database');
const Schema = connection.Schema;
const jwt = require('jsonwebtoken');
const { resolve } = require('app-root-path');
const UserSchema = new Schema({
    email: String,
    password: String,
    refeshToken: String,
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'menus'
    }]
}, {
    collection: 'users'
});

UserSchema.methods.getAccessToken = () => {
    const id = this._id;
    return new Promise((resolve, reject) => {
        jwt.sign(
            { id },
            process.env.PRIVATE_KEY,
            { expiresIn:'15s' },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
    });
}
UserSchema.methods.getRefeshToken = (expiresIn) => {
    const id = this._id;
    return new Promise((resolve, reject) => {
        jwt.sign(
            { id },
            process.env.REFESH_PRIVATE_KEY,
            { expiresIn: '30d' },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
    });
}

UserSchema.methods.verifyToken = async (token) => {
    return new Promise ( (resolve, reject) => {
        jwt.verify(
            token,
            process.env.PRIVATE_KEY,
            (err) => {
                if(err.name === 'TokenExpiredError') resolve(true);
                else resolve(false)
            })
    }); 
}

const User = connection.model('users', UserSchema);
module.exports = User;
