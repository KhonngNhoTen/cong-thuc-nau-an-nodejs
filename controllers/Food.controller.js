const Food = require('../models/Foods');
const Menu = require('../models/Menus');
const User = require('../models/User');
const fs = require('fs');
const rootPath = require('app-root-path');
class FoodController {
    async getAllFoods(req, res) {
        const userId = res.locals.userId;
        const menuId = req.params.menuId;
        await User.findById(userId)
            .populate({
                path: 'menus',
                match: { _id: menuId },
                populate: {
                    path: 'foods',
                    model: 'foods'
                }
            })
            .then(r => {
                res.status(200)
                    .json({ foods: r.menus[0].foods });
            });
    }

    async save(req, res) {
        const foodId = req.params.id;
        const menuId = req.params.menuId;
        // save food
        if (!foodId) {
            if (!req.file) {
                res.sendStatus(500).send('Please upload image');
                return;
            }
            try {
                const food = await new Food(req.body);
                food.imgSrc = req.file.filename;
                await food.save();
                const menu = await Menu.findById(menuId);
                menu.foods.push(food._id);
                await menu.save();
                res.status(201).json({
                    success: true,
                    food
                });
            } catch (error) {
                console.log(`Create food fail ${error}`);
                res.sendStatus(500);
            }
        }
        // update food
        else {
            try {
                const food = await Food.findById(foodId).updateOne(req.body);
                res.status(200).json({
                    success: true,
                    food
                });
            } catch (error) {
                console.log(`Create food fail ${error}`);
                res.sendStatus(500);
            }
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        const menuId = req.params.menuId;
        try {
            const food = await Food.findById(id);
            const path = rootPath + '/public/images/' + food.imgSrc;
            fs.unlink(path, async (err) => {
                if (err) { console.log(err); return; }
                await food.deleteOne({ _id: id });
                const menu = await Menu.findById(menuId);
                const index = menu.foods.indexOf(id);
                if (index !== -1) {
                    menu.foods.splice(index, 1);
                    menu.save();
                }
                res.sendStatus(204);
            });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

}

const controller = new FoodController;
module.exports = controller;