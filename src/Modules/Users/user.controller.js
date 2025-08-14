import { Router } from "express";
import * as userServices from "./user.service.js";
import { authentication } from "../../Middlewares/authentication.js";
import { validation } from "../../Middlewares/valiadation.js";
import * as userValidatiom from "./user.validation.js"

const userRouter = Router();

userRouter.post("/signup", validation(userValidatiom.signupSchema), userServices.signUp);
userRouter.post("/login", userServices.login);
userRouter.get("/getuser", authentication, userServices.getUser);
userRouter.get("/confirmemail/:token", userServices.confirmEmail);

export default userRouter;
