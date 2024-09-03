import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64, getSockets } from "../lib/helper.js";

const cookieOptions = {

    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
}


// const cookieOptions = {
//   httpOnly: true,          // Cookie is accessible only by the web server
//   secure: process.env.NODE_ENV === "production",  // Use secure cookies in production
//   sameSite: "Lax",         // Control whether the cookie is sent with cross-site requests
//   path: "/",               //   Path where the cookie is accessible
//   maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
// };


// const connectDB = (uri) =>{
//    mongoose.connect(uri,{dbName:"chit-chat"}).then((data)=>{
//     console.log(`Database connected  `)
//   }).catch((err)=>{
//     console.log(`Error connecting to database: ${err.message}`) 
//   })
// }


const connectDB = async (uri) => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure code
  }
};
const sendToken = (res, user, code, message)=>{

  const token = jwt.sign({_id : user._id},process.env.JWT_SECRET);

  return res.status(code).cookie("Chit-Chat-Cookie", token, cookieOptions).json({
    success: true,
    user,
    message
  })
  
};


const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};

const deletFilesFromCloudinary = async (public_ids) => {
  // Delete files from cloudinary
};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deletFilesFromCloudinary,
  uploadFilesToCloudinary,
};