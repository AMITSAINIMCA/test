var express = require('express');
var userValiationService = require('./../validation/user');
const userAccountManager = require('./../controller/user');
var middleTokenVerify = require('./../middleware/tokenChecker');
var router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/**
 * @author: Amit Saini 
 */

 router.post('/login',userValiationService.login, userAccountManager.login);
 router.get('/user_list', middleTokenVerify(1).verifyToken, userAccountManager.userList); 
 router.get('/user_details', middleTokenVerify(1).verifyToken, userAccountManager.userDetails); 

module.exports = router;