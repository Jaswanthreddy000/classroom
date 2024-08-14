const express = require('express');
const Classroom = require('../models/Classroom');
const User = require('../models/User');

const router = express.Router();

// Create a classroom
router.post('/create', async (req, res) => {
  try {
    const { name, startTime, endTime, days } = req.body;
    const classroom = new Classroom({ name, startTime, endTime, days });
    await classroom.save();
    res.status(201).json({ message: 'Classroom created successfully' });
  } catch (error) {
    console.error('Error creating classroom:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Fetch all classrooms
router.get('/all', async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('teacher').populate('students');
    res.status(200).json(classrooms);
  } catch (error) {
    // console.error('Error fetching classrooms:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Assign a teacher to a classroom
router.post('/assign-teacher/:classroomId', async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { teacherId } = req.body;

    const classroom = await Classroom.findById(classroomId);
    const teacher = await User.findById(teacherId);

    if (!classroom) {
      return res.status(400).json({ message: 'Classroom not found' });
    }

    if (!teacher || teacher.role !== 'Teacher') {
      return res.status(400).json({ message: 'Invalid teacher' });
    }

    if (classroom.teacher) {
      return res.status(400).json({ message: 'Classroom already has a teacher assigned' });
    }

    classroom.teacher = teacherId;
    await classroom.save();

    res.status(200).json({ message: 'Teacher assigned to classroom' });
  } catch (error) {
    console.error('Error assigning teacher:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Assign students to a classroom
router.post('/assign-students/:classroomId', async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { studentIds } = req.body;

    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      return res.status(400).json({ message: 'Classroom not found' });
    }

    const invalidStudents = [];
    for (const studentId of studentIds) {
      const student = await User.findById(studentId);
      if (!student || student.role !== 'Student') {
        invalidStudents.push(studentId);
      } else {
        classroom.students.push(studentId);
      }
    }

    if (invalidStudents.length > 0) {
      return res.status(400).json({ message: `Invalid students: ${invalidStudents.join(', ')}` });
    }

    await classroom.save();
    res.status(200).json({ message: 'Students assigned to classroom' });
  } catch (error) {
    console.error('Error assigning students:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id).populate('teacher').populate('students');
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// router.get('/teacher-classrooms', async (req, res) => {
//   const { email } = req.query;
//   if (!email) return res.status(400).json({ message: 'Email is required' });

//   try {
//     console.log('Fetching classrooms for email:', email); // Debugging line

//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found');
//       return res.status(404).json({ message: 'Teacher not found' });
//     }

//     if (user.role !== 'Teacher') {
//       console.log('User is not a teacher');
//       return res.status(404).json({ message: 'Teacher not found' });
//     }

//     const classrooms = await Classroom.find({ teacher: user._id }).populate('students', 'email');
//     console.log('Classrooms found:', classrooms); // Debugging line

//     res.json(classrooms);
//   } catch (error) {
//     console.error('Error fetching classrooms:', error); // Log error
//     res.status(500).json({ message: 'Server error' });
//   }
// });

module.exports = router;
