const config = require('./../config.json');
const jwt = require("jsonwebtoken");
var jwtService = {};
/* 
    * Author : Amit Saini
    * varaiable : user details
    * Use for jwt token
    */
jwtService.generateJwt = async (valobj)=>{
    return new Promise(async (resolve,reject)=>{
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        valobj.exp = parseInt(expiry.getTime() / 1000);
       resolve(jwt.sign(valobj, config.JWT_SECRET));// DO NOT KEEP YOUR SECRET IN THE CODE!
    });
}

var self = module.exports = jwtService;