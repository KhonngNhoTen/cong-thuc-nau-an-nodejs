const User = require('../models/User');
const md5 = require('md5');
module.exports = async (user) => {
   // Cach buoc tao moi mot user bao gom
   // kiem tra user.email da ton tai chua
   const isDuplicate = await User.findOne({email: user.email});
   // tao moi user
   if(!isDuplicate) {
      const model = new User(user);
      model.password = md5(model.password);
      await model.save();
      return model;  
   }
   throw new Error("User's email is duplicated");
}

