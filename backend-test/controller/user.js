const asynHandler = require('./../until/async_handler');
const crytojs = require('./../services/crypto');
const userDb= require('./../modal/user');
const jwtService = require('./../services/jwt');
const commanServices = require('./../services/comman');
var mongoose = require('mongoose');
var userManager = {}

// Login
userManager.login = asynHandler(async (req,res)=>{
    try {
        var {usertype,email,password} = req.body;
        let pass_exp= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/; 
        if (pass_exp.test(password)) { 
            password = crytojs.passencrypt(password);
            console.log(password)
        }else{
           throw({code:400,message:"Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"})
        }
        var query={
            usertype:{$eq:usertype},
            email:{$eq:email},
            password:{$eq:password}
        }
        await userDb.findOne(query,{password:0}).lean().exec(async (reErr,reRes)=>{ 
            if(reErr){
                return res.status(500).json({error_code:1,message:"Sorry, Something wrong, please try again"})
            }else{ 
                if(reRes!==null && Object.keys(reRes).length>0){
                   try {
                    var token = await jwtService.generateJwt(reRes);
                    res.status(200).json({
                        error_code:0,
                        status:1,
                        message: "Login Success",
                        userdetails: reRes, 
                        token:token
                    });
                   } catch (error) {
                       console.log(error)
                       return res.status(400).json({error_code:1,message:error.message})
                   }
                }else{
                    return res.status(400).json({error_code:1,message:"User does not exist"})
                }
            }
        });
    } catch (error) {
        var code = 500;
        if(typeof error.code !=="undefined")
            code = error.code;
        return res.status(code).json({error_code:1,message:error.message});
   }
})
//user List
userManager.userList = asynHandler(async (req,res)=>{
    try {
        var {usertype,_id} = req.payload;
        if(typeof usertype !=="undefined" && usertype!==""){
            let query = {
                _id:{$ne:mongoose.Types.ObjectId(_id)}
            }
            await userDb.find(query,{password:0}).sort({createtAt:-1}).exec(async (fnErr,fnRes)=>{
                if(fnErr){
                    return res.status(500).json({error_code:fnErr,message:"Sorry,Somethig wrong, please try again"});
                }else{
                    return res.status(200).json({error_code:0,message:"User list",data:fnRes});
                }
            });
        }else{
            throw({code:400,message:"Invalid token"});
        }
    } catch (error) {
        var code = 500;
        if(typeof error.code !=="undefined")
            code = error.code;
        return res.status(code).json({error_code:1,message:error.message});
   }
});
//userDetails
userManager.userDetails = asynHandler(async (req,res)=>{
    try {
        var {usertype,_id} = req.payload;
        var {user_id}= req.query;
        if(typeof usertype !=="undefined" && usertype!==""){
            if(typeof user_id !=="undefined" && user_id && user_id!==""){
                let query = {
                    _id:{$eq:mongoose.Types.ObjectId(user_id)}
                } 
                let userDetails = await commanServices.getUserDetails(query);
                return res.status(200).json({error_code:0,message:"User details",data:userDetails.data})
            }else{
                throw({code:400,message:"User is required"});
            }
        }else{
            throw({code:400,message:"Invalid token"});
        }
    } catch (error) {
        var code = 500;
        if(typeof error.code !=="undefined")
            code = error.code;
        return res.status(code).json({error_code:1,message:error.message});
   }
});
var self = module.exports = userManager;
