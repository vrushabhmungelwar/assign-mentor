const express = require("express");
const router = express.Router();

const { mentor } = require("../connection");


// To get all mentors list
router.get("/", async (req, res) => {
  try {
    const data = await mentor.find();
    res.send(data);
  } catch (e) {
    console.log(e, "error");
  }
});

// To Create new mentor 
router.post("/", async (req, res) => {
  try {
    const data = await mentor.create({
      name: req.body.name,
      email: req.body.email,
      expertise: req.body.expertise,
      studentsAssigned: req.body.studentsAssigned,
    });
    res.send(data);
  } catch (e) {
    console.log(e, "error");
  }
});

// To show students for a mentor
router.get("/:id", async (req, res) => {
  try {
    const ment = await mentor
      .findById(req.params.id)
      .populate("studentsAssigned", "name");
    res.send(ment);
  } catch (e) {
    console.log(e, "error");
  }
});
module.exports = router;