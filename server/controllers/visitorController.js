const Visitor = require("../models/Visitor");
const Counter = require("../models/Counter");

const getNextVisitorNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "visitorNumber" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
};

const addVisitor = async (req, res) => {
  try {
    const {
      name,
      phone,
      purpose,
      personToMeet,
      department,
      photo,
      signature
    } = req.body;

    if (
      !name ||
      !phone ||
      !purpose ||
      !personToMeet ||
      !department ||
      !photo ||
      !signature
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const visitorNumber = await getNextVisitorNumber();
    const visitorIdLabel = `${visitorNumber} - ${name}`;

    const visitor = await Visitor.create({
      visitorNumber,
      visitorIdLabel,
      name,
      phone,
      purpose,
      personToMeet,
      department,
      photo,
      signature,
      checkInTime: new Date(),
      status: "IN"
    });

    res.status(201).json({
      message: "Visitor added successfully",
      visitor
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkOutVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    const visitor = await Visitor.findById(id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    if (visitor.status === "OUT") {
      return res.status(400).json({ message: "Visitor already checked out" });
    }

    visitor.checkOutTime = new Date();
    visitor.status = "OUT";

    await visitor.save();

    res.status(200).json({
      message: "Visitor checked out successfully",
      visitor
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    const checkedIn = await Visitor.countDocuments({ status: "IN" });
    const checkedOut = await Visitor.countDocuments({ status: "OUT" });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayVisitors = await Visitor.countDocuments({
      createdAt: { $gte: todayStart }
    });

    const allVisitors = await Visitor.find();

    const purposeMap = {};
    const departmentMap = {};
    const statusMap = { IN: 0, OUT: 0 };
    const dailyMap = {};
    const hourlyMap = {};

    allVisitors.forEach((visitor) => {
      purposeMap[visitor.purpose] = (purposeMap[visitor.purpose] || 0) + 1;
      departmentMap[visitor.department] =
        (departmentMap[visitor.department] || 0) + 1;
      statusMap[visitor.status] = (statusMap[visitor.status] || 0) + 1;

      const day = new Date(visitor.createdAt).toLocaleDateString("en-IN");
      dailyMap[day] = (dailyMap[day] || 0) + 1;

      const hour = new Date(visitor.checkInTime).getHours();
      const hourLabel = `${hour}:00`;
      hourlyMap[hourLabel] = (hourlyMap[hourLabel] || 0) + 1;
    });

    res.status(200).json({
      cards: {
        totalVisitors,
        checkedIn,
        checkedOut,
        todayVisitors
      },
      charts: {
        purposeChart: Object.entries(purposeMap).map(([name, value]) => ({
          name,
          value
        })),
        departmentChart: Object.entries(departmentMap).map(([name, value]) => ({
          name,
          value
        })),
        statusChart: Object.entries(statusMap).map(([name, value]) => ({
          name,
          value
        })),
        dailyChart: Object.entries(dailyMap).map(([date, count]) => ({
          date,
          count
        })),
        hourlyChart: Object.entries(hourlyMap).map(([hour, count]) => ({
          hour,
          count
        }))
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addVisitor,
  getVisitors,
  checkOutVisitor,
  getDashboardStats
};