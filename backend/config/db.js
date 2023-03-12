const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    const connect = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${connect.connection.host}`.cyan.underline);
  } catch (error) {
    console.log("mongoDB connection error: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
