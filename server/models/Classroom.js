const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  days: { type: [String], required: true },  // Days of the week (e.g., ["Monday", "Tuesday", ...])
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
