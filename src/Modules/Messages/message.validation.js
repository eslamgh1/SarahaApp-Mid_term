import Joi from "joi";
import { userGender } from "../../DB/Models/user.model.js";

export const createMessageSchema = {
  body: Joi.object({
    content: Joi.string().min(1).required(),
    userId: Joi.string().required(),    
  }).required()


  }