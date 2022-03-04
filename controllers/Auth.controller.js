const md5 = require('md5');
const User = require('../models/User');
const createUser = require('../services/createUser.service');
const updateUser = require('../services/updateUser.service');
const jwt = require('jsonwebtoken');
class AuthController {
    async login(req, res) {
        console.log(req.body);
        req.body.password = md5(req.body.password);
        const result = await User.findOne(req.body);
        if (result) {
            // jwt.sign(
            //     { data: result.id },
            //     process.env.PRIVATE_KEY,
            //     { expiresIn: '1d' },
            //     (error, token) => {
            //         if(!error)
            //         res.status(201).json({
            //             message: 'Login successfully',
            //             success: true,
            //             token: token
            //         });
            //     }
            // );
            const token = await result.getAccessToken();
            const refeshToken = await result.getRefeshToken();
            res.json({
                token: token, 
                refeshToken: refeshToken,
                success: true
            });
        } else {
            res.json({
                message: 'Login fail',
                success: false
            });
        }
    }
    async save(req, res) {
        const userID = req.params.id;
        if (!userID) {
            // luu
            const user = await createUser(req.body);
            jwt.sign(
                { data: user.id },
                process.env.PRIVATE_KEY,
                { expiresIn: '1d' },
                (error, token) => {
                    if (!error)
                        res.status(201).json({
                            message: 'Create user successfully',
                            success: true,
                            token: token
                        });
                }
            );
        } else {
            // cap nhat
            try {
                await updateUser();
                res.status(201).json({msg: 'Update new user fail'});
            } catch (error) {
                console.log(error);
                res.status(501).send('Update user successfully');
            }
        }

    }

    async setEmail(req, res) {
        res.send('email');
    }

    async refeshToken (req, res) {
        const token = req.headers['authorization'];
        const user = new User();
        const token_ = await user.getAccessToken();
        if( await user.verifyToken(token)) res.json({ok: true,token:token_ });
        else res.json({ok:false});
    }
}


module.exports = new AuthController;