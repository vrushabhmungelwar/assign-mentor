///////   To Create a Mentor   ///////

https://assign-mentor-by-vrushabh.herokuapp.com/mentor
method: POST
data format :- 
{
  "name": "ajay",
  "email": "ajay@gmail.com",
  "expertise": "science"
}

///////   To Create a Student  ///////

https://assign-mentor-by-vrushabh.herokuapp.com/student
method: POST
data format :-
{
  "name": "shubham",
  "email": "shubham@gmail.com",
  "course": "phycics"
}

///////   To Assign students to Mentor  ///////

https://assign-mentor-by-vrushabh.herokuapp.com/assignmentor/newmentor
method: POST
Data Format :-
{
  "mentorId": "61e3c4468ca11cd55b75dbfd",
  "studentsArray": [
    "61e3c7b98ca11cd55b75dc0b"
  ]
}


