const connection = require('../config/database');
const Schema = connection.Schema;
const MenuSchema = new Schema({
    name: String,
    description: String
}, {
    collection: 'menus'
});

const Menu = connection.model('menus', MenuSchema);
module.exports = Menu;
