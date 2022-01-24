const Menu = require('../models/Menus');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
class MenuController {

    async getAllMenu(req, res) {
       await User.findById(res.locals.userId)
                .populate('menus')
                .then(rs => {
                    res
                        .status(200)
                        .json({ menus: rs.menus })
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                });

    }

    async getMenu(req, res) {
        const id = req.params.id;
        await Menu.findById(id)
            .then((rs) => {
                res.status(200)
                    .json({
                        success: true,
                        message: 'Create successfully'
                    });
            })
            .catch(err => {
                res.status(500)
                    .json({
                        success: false,
                        message: 'Create fail'
                    });
            });
    }

    async saveMenu(req, res) {
        const menuID = req.params.id;
        if (!menuID) {
            try {
                const menu = await new Menu(req.body);
                await menu.save();
                const user = await User.findById(res.locals.userId);
                user.menus.push(menu._id);
                await user.save();
                res.status(201).json({
                    success: true,
                    message: 'Create Menu successfully'
                });
            } catch (error) {
                console.log(error);
                res.json({
                    success: false,
                    message: 'Create Menu fail'
                });
            }
        } else {
            await Menu.findById(menuID).updateOne(req.body)
                .then((rs) => {
                    res.json({
                        success: true,
                        message: 'Updates Menu successfully'
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(200).json({
                        success: false,
                        message: 'Updates Menu fail'
                    });
                });
        }
    }

    async deleteMenu(req, res) {
        const id = req.params.id;
        await Menu.deleteOne({ _id: id })
            .then( async () => {
                const user = await User.findById(res.locals.userId);
                const index = user.menus.indexOf(id);
                if (index !== -1) {
                    user.menus.splice(index, 1);
                    user.save();
                }
                res.status(204).json({
                    success: true,
                    message: 'Delete Menu successfully'
                });
            })
            .catch(() => {
                res.json({
                    success: false,
                    message: 'Delete Menu fail'
                });
            })
    }

}
const controller = new MenuController;
module.exports = controller;