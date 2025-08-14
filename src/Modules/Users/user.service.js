import userModel, { userRole } from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../Utils/sendEmail.utils.js";
import Joi from "joi";
import { generateToken } from "../../Utils/Token/GenerateToken.utils.js";
import { verifyToken } from "../../Utils/Token/VerifyToken.utils.js";
import { Hash } from "../../Utils/Hash/hash.utils.js";
import { Comare } from "../../Utils/Hash/compare.utils.js";
import { Encrypt } from "../../Utils/Encrypt/encrypt.utils.js";
import { Decrypt } from "../../Utils/Encrypt/decrypt.utils.js";

//^ ============== signUp ====================================
export const signUp = async (req, res, next) => {
  const { name, email, password, cPassword, phone, gender, age, role } =
    req.body;
  //check password&cPassword or Joy
  // if (password !== cPassword) {
  //   return res
  //     .status(400)
  //     .json({ message: "Password doesn't match cPassword" });
  // }

  //check email
  const emailUser = await userModel.findOne({ email });
  // console.log(emailUser)
  if (emailUser) {
    {
      // return res.status(409).json({ message: "Email already exists" });
      throw new Error("user already exit", { cause: 409 });
    }
  }
  //hash Password
const hash = await Hash({palinText:password , SALT_ROUNDS:+process.env.SALT_ROUNDS })
  // const hash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

  //Encrypt Phone
const phoneEncrypt = await Encrypt({plainText:phone , SECRET_KEY:process.env.ENCRYPTION_KEY})
  // const phoneEncrypt = CryptoJS.AES.encrypt(phone, process.env.ENCRYPTION_KEY).toString();

  // Send email
  const token = await generateToken( {payload:{ email }, SIGNATURE:process.env.JWT_SIGNATURE_EMAIL, options: { expiresIn: "1h" }})
  const link = `http://localhost:3000/users/confirmEmail/${token}`;

  const isSend = await sendEmail({
    to: email,
    subject: "Hello ✔",
    html: `<a href="${link}">Confirm Email</a>`,
  });

  if (!isSend) {
    throw new Error("Fail to send email", { cause: 404 });
  }

  //Create User
  const user = await userModel.create({
    name,
    email,
    password: hash,
    phone: phoneEncrypt,
    gender,
    age,
    role,
  });

  return res
    .status(201)
    .json({ message: "User is created successfully", user });
};
//^ ============== logIn ====================================
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  //check email And condition
  const user = await userModel.findOne({ email, confirmed: true });
  if (!user) {
    {
      throw new Error("Email does not exist or not confirmed", { cause: 404 });
    }
  }

  const matchPassword =await Comare({palinText: password , cipherText:user.password })
  // const matchPassword = bcrypt.compareSync(password, user.password); // true or false

  if (!matchPassword) {
    throw new Error("Invalid password !!! ", { cause: 400 });
  }


    const accessToken = await generateToken({
      payload:{ id: user._id, email },
      SIGNATURE:user.role == userRole.user ? process.env.JWT_ACCESS_SECRET_USER : process.env.JWT_ACCESS_SECRET_ADMIN, // dynamic signature
      options:{ expiresIn: "1y" }
    })
    console.log(accessToken)

  const refreshToken = jwt.sign(
    { id: user._id, email },
    user.role == userRole.user ? "refresh_user" : "refresh_admin",
    {
      expiresIn: "2y",
    }
  );



  return res.status(201).json({
    message: "User is logged successfully",
    accessToken,
    refreshToken,
  });
};
//^ ============== Get profile ====================================
export const getUser = async (req, res, next) => {
  const phone = await Decrypt({cipherText:req.userAuth.phone , SECRET_KEY: "key_123" })

  // const phone = CryptoJS.AES.decrypt(req.userAuth.phone, "key_123").toString(
  //   CryptoJS.enc.Utf8
  // );
  
  req.userAuth.phone = phone;

  return res.status(201).json({ message: "Done", user: req.userAuth });
};

//^ ============== confirmEmail profile ====================================
export const confirmEmail = async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    throw new Error("Provide us with token", { cause: 404 });
  }
  const decoded = await verifyToken({payload:token, SIGNATURE:process.env.JWT_SIGNATURE_EMAIL});

  //check email AND condidition
  const user = await userModel.findOne({
    email: decoded.email,
    confirmed: false,
  });
  if (!user) {
    throw new Error("User not exists or already confirmed", { cause: 404 });
  }
  // convert confirmed to true then save
  user.confirmed = true;
  await user.save();

  return res.status(201).json({ message: "Email is confirmed" });
};
