const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");

async function resetAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const hashed = await bcrypt.hash("Admin1234", 10);

  // Find by email and force role to admin + reset password
  const result = await User.findOneAndUpdate(
    { email: "admin@ott.com" },
    { password: hashed, role: "admin" },
    { new: true }
  );

  if (!result) {
    console.log("No user with admin@ott.com found.");
    // List all users so we can see what exists
    const users = await User.find().select("name email role");
    console.log("All users in DB:", JSON.stringify(users, null, 2));
  } else {
    console.log(`✅ Done — email: ${result.email}, role: ${result.role}, password: Admin1234`);
  }

  process.exit(0);
}

resetAdmin().catch((err) => { console.error(err.message); process.exit(1); });
