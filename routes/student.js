const express = require("express");
const router = express.Router();

const { student } = require("../connection");

// To Get All students
router.get("/", async (req, res) => {
  try {
    const data = await student.find();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

// To create a student
router.post("/", async (req, res) => {
  try {
    const data = await student.create({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
      mentorAssigned: req.body.mentorAssigned,
    });
    res.send(data);
  } catch (e) {
    console.log(e.message, "error");
  }
});

module.exports = router;
