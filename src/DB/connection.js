import mongoose from 'mongoose';

const connectDB = async()=>{
  await mongoose.connect(process.env.DB_URL_LOCAL)
  .then(()=>{
console.log("DB is connected successfully")
  })
  .catch((error=>{
console.log("Faild to connect DB")
  }))
}


export default connectDB;