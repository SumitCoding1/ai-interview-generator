const mongoose = require("mongoose");

async function connectToDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to Database ✅");
  } catch (err) {
    console.log("DB Error:", err.message);
    process.exit(1);
  }
}

module.exports = connectToDB;