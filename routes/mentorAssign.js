const router = require("express").Router();
const objId = require("mongoose").Types.ObjectId;

const { student, mentor } = require("../connection");

// To Assign a students to Mentor
router.post("/newMentor", async (req, res) => {
  try {
    const mentorData = await mentor.findById(req.body.mentorId);
    mentorData.studentsAssigned = [
      ...mentorData.studentsAssigned,
      ...req.body.studentsArray,
    ];
    mentorData.save();
    req.body.studentsArray.forEach(async (stud) => {
      const temp = await student.findById(stud);
      temp.mentorAssigned = req.body.mentorId;
      temp.save();
    });

    res.send("Students Assigned to selected Mentor");
  } catch (e) {
    console.log(e, "error");
  }
});

// To Change Mentor
router.post("/modifyMentor", async (req, res) => {
  try {
    let stud = await student.findById(req.body.studentId);
    let oldmentid = stud.mentorAssigned;

    stud.mentorAssigned = req.body.newMentorId;
    stud.save();
  
    let oldment = await mentor.findById(oldmentid);


  
      let newAssigned = oldment.studentsAssigned;
      const indexpos = newAssigned.indexOf(objId(req.body.studentId));
      newAssigned.pop(indexpos);
      oldment.studentsAssigned = newAssigned;

    oldment.save();   

    let newment = await mentor.findById(req.body.newMentorId);

    newment.studentsAssigned = [
      ...newment.studentsAssigned,
      req.body.studentId,
    ];

    newment.save();

    res.send("Assigned a student to a new mentor");
  } catch (e) {
    console.log(e, "error");
  }
});

module.exports = router;
