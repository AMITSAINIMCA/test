const jwt = require('jsonwebtoken');
// var jwtExp = require('express-jwt');
const commanService = require('./../services/comman');
const config = require('./../config.json');
// var auth = jwtExp({
//     secret: config.secret,
//     userProperty: 'payload'
// });
const TokenMiddleware = (optional = 0) => {
    const verifyToken = async (req, res, next) => { 
      let { authorization } = req.headers;
  
      //making auth optional for some routes
      if(!optional){
          console.log("If",optional,authorization)
        next();
      }
      else{
        try{
            if(optional){ 
                 //console.log("else",optional,authorization)
                const token = req.body.token || req.query.token || req.headers['authorization']
                // decode token
                if (token) {
                  // verifies secret and checks exp
                  jwt.verify(token, config.JWT_SECRET, async(err, decoded) =>{
                      if (err) {
                          return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
                      } 
                    let userData = await commanService.getUserIndentified(decoded._id); 
                      if(typeof userData.data != "undefined" && userData.data!=null && Object.keys(userData.data).length>0){
                        req.payload = decoded;
                        next();
                      }else{
                          return res.status(403).send({
                              error_code:1,
                              "error": true,
                              "message": 'Invalid Token'
                          });
                      }
                  });
                } else {
                  // if there is no token
                  // return an error
                 return res.status(403).send({
                      error_code:1,
                      "error": true,
                      "message": 'No token provided.'
                  });
                }
      
            }
        }catch(ex){
            return res.status(401).send({
                error_code:1,
                "error": true,
                "message": ex.message
            });
        }
      }
    }
   
    return {
      verifyToken
    }
  } 
module.exports = TokenMiddleware; 