
require('dotenv').config();
const bcrypt = require("bcryptjs");
const db = require("../models/db");
const prisma = require("../models/db");
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next) => {
  const { username, password, confirmPassword, email } = req.body;
  try {
    //validation
    if (!(username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("password not match");
    }
    const hased = await bcrypt.hash(password, 8);
    console.log(hased);

    const data = {
      user_username: username,
      user_password: hased,
      user_email: email
    };
    //                                db  / const db
    const rs = await db.users.create({ data: data });
    console.log(rs);

    res.json({message: "Register SUCCESSFUL!!!"});
  } catch (err) {
    next(err);
  };
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    // validation

    if ( !(username.trim() && password.trim() )){
      throw new Error('username or password must not blank')
    }

    // find username in db.users
    const user = await db.users.findFirstOrThrow({
      where: {
        user_username: username,
      }
    })
    // check password
    const pwOk = await bcrypt.compare(password, user.user_password)

    if(!pwOk){
      throw new Error("invalid login") && console.log("invalid login")
    }

    // issue jwt token
    const payload = { id: user.user_id }

    console.log(payload)

    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({ token });

  } catch(err) {
    next(err);
  };
};

exports.getMe = (req, res, next) => {
  res.json( req.user )
}
