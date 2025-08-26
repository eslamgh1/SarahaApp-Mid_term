import { Router } from "express";
import { validation } from "../../Middlewares/valiadation.js";
import * as messageValidation from "./message.validation.js";
import * as messageServices from "./message.service.js";
import { authentication } from "../../Middlewares/authentication.js";

const messageRouter = Router();
messageRouter.post("/send",validation(messageValidation.createMessageSchema), messageServices.createMessage);
messageRouter.get("/list",authentication, messageServices.listMessages);
messageRouter.get("/:id",authentication, messageServices.getOneMessage);

export default messageRouter;
