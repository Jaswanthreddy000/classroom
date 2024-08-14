const express = require('express');
const User = require('../models/User');
const Classroom = require('../models/Classroom');

const router = express.Router();

// Get all teachers not yet assigned to a specific classroom
router.get('/available-teachers/:classroomId', async (req, res) => {
  try {
    const { classroomId } = req.params;
    
    // Find the selected classroom
    const classroom = await Classroom.findById(classroomId).populate('teacher').populate('students');
    
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    const teachers = await User.find({ role: 'Teacher' });
    const assignedTeacher = classroom.teacher ? classroom.teacher._id.toString() : null;
    const availableTeachers = teachers.filter(teacher => teacher._id.toString() !== assignedTeacher);

    res.status(200).json(availableTeachers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all students not yet assigned to a specific classroom
router.get('/available-students/:classroomId', async (req, res) => {
  try {
    const { classroomId } = req.params;

    // Find the selected classroom
    const classroom = await Classroom.findById(classroomId).populate('students');

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    const students = await User.find({ role: 'Student' });
    const assignedStudents = classroom.students.map(student => student._id.toString());
    const availableStudents = students.filter(student => !assignedStudents.includes(student._id.toString()));

    res.status(200).json(availableStudents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
