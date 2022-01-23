const md5 = require('md5');
const User = require('../models/User');
const createUser = require('../services/createUser.service');
const updateUser = require('../services/updateUser.service');
class AuthController {
    async login(req, res) {
        req.body.password = md5(req.body.password);
        const result = await User.findOne(req.body);
        if (result) {
            res.status(201).json({
                message: 'Login successfully',
                success: true
            });
        } else {
            res.status(500).json({
                message: 'Login fail',
                success: false
            });
        }
    }
    async save(req, res) {
        const userID = req.params.id;
        if (!userID) {
            // luu
            await createUser(req.body)
            res.status(201).send('Create new user successfully');
        } else {
            // cap nhat
            try {
                await updateUser();
                res.status(201).send('Update new user fail');
            } catch (error) {
                console.log(error);
                res.status(501).send('Update user successfully');
            }
        }

    }

    async setEmail(req, res) {
        res.send('email');
    }

}


module.exports = new AuthController;