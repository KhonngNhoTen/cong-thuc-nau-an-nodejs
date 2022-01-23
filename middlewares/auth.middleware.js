const jwt = require('jsonwebtoken');

module.exports = (req, res,next) => {
    const token = req.headers['authorization'];
    // const token = authorization.split(' ')[1];
    // console.log(authorization);
    jwt.verify(
        token,
        process.env.PRIVATE_KEY,
        (err, data) => {
           if(err){
               console.log(err);
               res.status(403);
           }
           else {
               res.locals.userId = data.data;
               next();
           }  
        });
}