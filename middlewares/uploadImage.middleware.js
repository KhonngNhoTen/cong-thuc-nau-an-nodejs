const multer = require('multer');
const rootPath = require('app-root-path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, rootPath + '/public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });


module.exports.singleUpload = (name) => {
    return upload.single(name);
}