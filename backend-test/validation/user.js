const commonService = require("./../services/comman");
const validator = require("node-input-validator"); 
validatorService = {}; 
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
validatorService.login = async (req,res, next)=>{ 
        try {
            var bodyData = req.body; 
            let valid = new validator.Validator(bodyData, {
                usertype:"required", 
                email: "required|email",
                password:"required|minLength:8|maxLength:50", 
            }); if (await valid.check().then(async function (matched) { 
                if (!matched) {
                    if (valid.errors !== null && Object.keys(valid.errors).length) {
                        if (typeof valid.errors.usertype !== "undefined")
                             await commonService.managedResponse(400, 1, valid.errors.usertype.message); 
                        else if (typeof valid.errors.email !== "undefined")
                            await commonService.managedResponse(400, 1, valid.errors.email.message); 
                        else if (typeof valid.errors.password !== "undefined")
                            await commonService.managedResponse(400, 1, valid.errors.password.message);   
                    }
                } else { 
                    next();
                }
            }));
        } catch (error) { 
            if (typeof error.status !== "undefined")
                return res.status(error.code).json({ error_code: error.status, message: error.errorMessage });
            else
                await commonService.managedResponse(400, 1, error.message);
        } 
}  
var self = module.exports = validatorService;