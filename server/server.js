const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");
const authRoutes = require("./routes/authRoutes");
const visitorRoutes = require("./routes/visitorRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes);

app.get("/", (req, res) => {
  res.send("Visitor Management System Backend Running");
});

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      username: process.env.ADMIN_USERNAME
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      await Admin.create({
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword
      });

      console.log("Default admin created");
    } else {
      console.log("Default admin already exists");
    }
  } catch (error) {
    console.error("Admin creation error:", error.message);
  }
};

createDefaultAdmin();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});