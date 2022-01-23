const connection = require('../config/database');
const Schema = connection.Schema;
const foodSchema = new Schema({
    cookingRecipe: String,
    doing: String,
    imgId: Schema.Types.ObjectId
    }, {
        collection: 'foods'
});

const food = connection.model('foods', foodSchema);
module.exports = food;
