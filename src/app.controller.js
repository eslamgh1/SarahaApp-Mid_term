import connectDB from "./DB/connection.js";
import { globalErrorHandling } from "./Middlewares/globalErrorHandling.js";
import userRouter from "./Modules/Users/user.controller.js";

const bootstrap=(app,express)=>{
connectDB();
app.use(express.json());

app.use("/users",userRouter)


app.all("/*demo",(req,res,next)=>{
        throw new Error("Page is not found" , {cause:404})

})


//Error-handling middleware
app.use(globalErrorHandling)

}

export default bootstrap;