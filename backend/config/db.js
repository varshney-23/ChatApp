const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold);

  } catch (error) {
    console.error(`Error: ${error}`.red.bold);
    process.exit(); // Exit with a non-zero status code to indicate an error
  }
};

module.exports = connectDB;

