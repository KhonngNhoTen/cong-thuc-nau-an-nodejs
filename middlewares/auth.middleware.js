const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    // const token = authorization.split(' ')[1];
    // console.log(authorization);
    if (!token) res.sendStatus(403);
    else
        jwt.verify(
            token,
            process.env.PRIVATE_KEY,
            (err, data) => {
                if (err) {
                    console.log(err);
                    if(err.name === 'TokenExpiredError') {
                        res.status(401).json({msg: 'jwt expired'});
                    }
                    else
                       res.status(403).json({msg: 'error'});
                    return;   
                }
                else {
                    res.locals.userId = data.data;
                    next();
                }
            });
}