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
                    res.sendStatus(403);
                }
                else {
                    res.locals.userId = data.data;
                    next();
                }
            });
}