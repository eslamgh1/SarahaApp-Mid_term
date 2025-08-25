//^ Hash for password - //https://bcrypt-generator.com/

// import bcrypt from "bcrypt";
//npm i bcrypt
//const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
//In log in step:
//const match = bcrypt.compareSync(myPlaintextPassword, hash); // true or false

//^ Encrypt for phone -   npm i crypto-js
//import CryptoJS from "crypto-js";
//const phoneEncrypt = CryptoJS.AES.encrypt(phone, 'key_123').toString();
// Decrypt
// const phone  = CryptoJS.AES.decrypt(user.phone, 'key_123').toString(CryptoJS.enc.Utf8);

//^ Token in sign in:
//npm i jsonwebtoken
//import jwt from "jsonwebtoken";
// const accessToken = jwt.sign({ id: user._id, email  }, 'access_123', {expiresIn:"1y"});
//const decoded = jwt.verify(authorization, 'access_123');

//^ Nodmailer: sendEmail:
//import nodemailer from "nodemailer";

//^ Valiadation : npm install joi
//https://joi.dev/api/?v=17.13.3

//^dotenv:    npm install dotenv
// At top of index.js
// import dotenv from 'dotenv'
// dotenv.config()

//^ LoginWith Gmail:    https://developers.google.com/identity/gsi/web/guides/verify-google-id-token#node.js
//^ 



//! ===============  Code	Name	Meaning ==========================================
//~ 400	Bad Request	Invalid request syntax (client-side error).
//~ 401	Unauthorized	Missing or invalid authentication credentials.
//~ 403	Forbidden	Authenticated but lacking permissions.
//~ 404	Not Found	Resource doesn’t exist.
//~ 500	Internal Error	Server failed unexpectedly (backend bug, timeout, etc.).