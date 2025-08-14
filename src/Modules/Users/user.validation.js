import Joi from "joi";
import { userGender } from "../../DB/Models/user.model.js";

export const signupSchema = {
  body: Joi.object({
    name: Joi.string().alphanum().min(4).max(10).required(),
    email: Joi.string().email().required(),
    password:Joi.string().required(),
    cPassword:Joi.string().valid(Joi.ref('password')).required(),
    gender:Joi.string().valid(userGender.male ,userGender.female).required(),
    age: Joi.number().min(18).max(60).positive().required(),
    phone: Joi.string().required(),
    //// isValid: Joi.boolean().falsy("no").truthy("yes").sensitive().required()
    // birthDate:Joi.date().greater("now").required(),
  }).required(),

//   headers: Joi.object({
//     authorization: Joi.string().required()
// })
  
  // query: Joi.object({
  //   flag: Joi.number().required(),
  // }).required(),
};

//Start #7 Joy