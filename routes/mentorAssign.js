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
    var new_list = oldment.studentsAssigned;
    new_list = new_list.filter((e) => e !== req.body.studentId);

    oldment.studentsAssigned = new_list;
    // if (oldment.studentsAssigned.length < 0) {
    //   // console.log("oldment");
    //   return;
    // } else {
    //   let newAssigned = oldment.studentsAssigned;
    //   const indexpos = newAssigned.indexOf(objId(req.body.studentId));
    //   // console.log(indexpos, "index");
    //   newAssigned.pop(indexpos);
    //   // console.log(newAssigned);
    //   oldment.studentsAssigned = newAssigned;
    // }

    oldment.save();

    let newment = await mentor.findById(req.body.newMentorId);
    // var new_list1 = newment.studentsAssigned;
    // new_list1 = new_list1.push(req.body.studentId);
    // newment.studentsAssigned = new_list1;


    newment.studentsAssigned = [
      ...newment.studentsAssigned,
      ...req.body.studentsArray,
    ];
    // if (newment.studentsAssigned.length < 0) {
    //   return;
    // } else {
    //   if (!newment.studentsAssigned.includes(req.body.studentId)) {
    //     newment.studentsAssigned = [
    //       ...newment.studentsAssigned,
    //       req.body.studentId,
    //     ];
    //   }
    // }
    newment.save();

    res.send("Assigned a student to a new mentor");
  } catch (e) {
    console.log(e, "error");
  }
});

module.exports = router;
