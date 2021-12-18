const UserDb = require('./../modal/user');
var commanOther = {};
// Get user by id
commanOther.getUserIndentified = async (userid) => { 
    return new Promise(function (resolve, reject) {
        if (typeof userid !== "undefined" && userid && userid !== "") {
            UserDb.findById(userid, { password: 0 }, (fnErr, rnRes) => { 
                if (fnErr) {
                    return reject({ status: 0, errorMessage: "Sorry, Something wrong, Please try again", code: 500 });
                } else {
                    if (rnRes == null || Object.keys(rnRes).length == 0)
                        return reject({ status: 0, message: "Invalid user",errorMessage: "Invalid user", code: 400 }) 
                    else
                        return resolve({ status: 1, data: rnRes });
                }
            });
        } else {
            return reject({ status: 0, errorMessage: "Unauthorized request", code: 401 })
        }
    });
}  
// Get user by Query
commanOther.getUserDetails = async (query) => { 
    return new Promise(function (resolve, reject) {
        if (typeof query !== "undefined" && query!==null && Object.keys(query).length>0) {
            UserDb.findOne(query, { password: 0 }, (fnErr, rnRes) => {
                if (fnErr) {
                    return reject({ status: 0, message: "Sorry, Something wrong, Please try again", code: 500 });
                } else {
                    return resolve({ status: 1,message:"Done", data: rnRes });
                }
            });
        } else {
            return reject({ status: 0, message: "Query is required", code: 400})
        }
    });
} 
/**
 * Author: Amit Saini
 * Manage Status response
 */
commanOther.managedResponse = async (code, status, msg) => {
    return new Promise(function (resolve, reject) {
        if (status) {
            return reject({ status: status, errorMessage: msg, code: code })
        }
    })
}
 

// get fcm token by user id
commanOther.getFcmToken = async (id)=>{
    return new Promise(async (resolve,reject)=>{
        if(mongoose.Types.ObjectId.isValid(id)){
            await fcmTokenDB.findOne({userid:mongoose.Types.ObjectId(id)},async (fnErr,fnRes)=>{
                if(fnErr){
                    reject({code:400,message:"Sorry, Something is wrong, please try again"});
                }else{
                    resolve({code:200,message:"Done",data:fnRes});
                }
            }).clone().catch(async(err)=>{ 
                reject({code:400,message:err.message});
            });
        }else{
            reject({code:400,message:"User id is not valid"});
        }
    });
}  
var self = module.exports = commanOther;