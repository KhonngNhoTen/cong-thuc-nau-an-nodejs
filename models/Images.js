const connection = require('../config/database');
const Schema = connection.Schema;
const ImageSchema = new Schema({
    src: String,
}, {
    collection: 'images'
});

const Image = connection.model('images', ImageSchema);
module.exports = Image;
