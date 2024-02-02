
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models/db')

module.exports = async ( req, res, next ) => {
    const { authorization } = req.headers;
    if(!authorization){
        throw new Error('Unauthorized')
    }

    if(!(authorization.startsWith('Bearer'))){
        throw new Error('Unauthorized')
    }
    const token = authorization.split(' ')[1]
    console.log(req.headers)
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(token)

    const user = await db.users.findFirst({where: {user_id: payload.id}})
    
    delete user.user_password
    console.log(user)
    req.user = user

    next()

};