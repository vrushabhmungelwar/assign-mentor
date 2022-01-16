const express = require("express");
const cors = require("cors");
var mongo = require("./connection");

const studentRoute = require("./routes/student");
const mentorRoute = require("./routes/mentor");
const mentorAssign = require("./routes/mentorAssign");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
mongo.connect();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/student", studentRoute);
app.use("/mentor", mentorRoute);
app.use("/assignmentor", mentorAssign);

app.listen(PORT, () => console.log("App started at", PORT));
