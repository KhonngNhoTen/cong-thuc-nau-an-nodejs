const connection = require('../config/database');
const Schema = connection.Schema;
const foodSchema = new Schema({
    cookingRecipe: String,
    doing: String,
    imgSrc: String
}, {
    collection: 'foods'
});

const food = connection.model('foods', foodSchema);
module.exports = food;
