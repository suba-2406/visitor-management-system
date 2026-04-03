const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addVisitor,
  getVisitors,
  checkOutVisitor,
  getDashboardStats
} = require("../controllers/visitorController");

const router = express.Router();

router.post("/", authMiddleware, addVisitor);
router.get("/", authMiddleware, getVisitors);
router.put("/checkout/:id", authMiddleware, checkOutVisitor);
router.get("/dashboard/stats", authMiddleware, getDashboardStats);

module.exports = router;