import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PrincipalAdd() {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [studentIds, setStudentIds] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(`https://classroom-znl6.onrender.com/api/classroom/all`);
        setClassrooms(response.data);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };

    fetchClassrooms();
  }, []);

  const handleSelectClassroom = async (classroom) => {
    setSelectedClassroom(classroom);

    try {
      const [teachersResponse, studentsResponse] = await Promise.all([
        axios.get(`https://classroom-znl6.onrender.com/api/users/available-teachers/${classroom._id}`),
        axios.get(`https://classroom-znl6.onrender.com/api/users/available-students/${classroom._id}`)
      ]);

      setAvailableTeachers(teachersResponse.data);
      setAvailableStudents(studentsResponse.data);
    } catch (error) {
      console.error('Error fetching available teachers or students:', error);
    }
  };

  const handleAddTeacher = async () => {
    try {
      const response = await axios.post(`https://classroom-znl6.onrender.com/api/classroom/assign-teacher/${selectedClassroom._id}`, { teacherId });
      setMessage(response.data.message);
      setError(''); // Clear previous errors
      setSelectedClassroom(null); // Reset selection after adding teacher
    } catch (error) {
      setMessage(''); // Clear previous messages
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleAddStudents = async () => {
    try {
      const response = await axios.post(`https://classroom-znl6.onrender.com/api/classroom/assign-students/${selectedClassroom._id}`, { studentIds });
      setMessage(response.data.message);
      setError(''); // Clear previous errors
      setSelectedClassroom(null); // Reset selection after adding students
    } catch (error) {
      setMessage(''); // Clear previous messages
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleSave = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Principal Dashboard</h1>
      <div className="mb-8">
        <div className='flex justify-between items-center mb-8'>
          <h2 className="text-xl font-semibold mb-2">Available Classrooms</h2>
          <Link to="/createclassroom">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Create Classroom
            </button>
          </Link>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {classrooms.map((classroom) => (
            <div key={classroom._id} className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleSelectClassroom(classroom)}>
              <h3 className="text-lg font-semibold">{classroom.name}</h3>
              <p>Teacher: {classroom.teacher ? classroom.teacher.email : 'None'}</p>
              <p>Students:</p>
              <ul className="list-disc pl-5">
                {classroom.students.length > 0 ? (
                  classroom.students.map((student) => (
                    <li key={student._id}>{student.email}</li>
                  ))
                ) : (
                  <p>No students assigned</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {selectedClassroom && (
        <div className="mb-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer m-5 p-5">
          <h2 className="text-xl font-semibold mb-2">Manage Classroom: {selectedClassroom.name}</h2>
          <div className="mb-4 flex flex-col">
            <h3 className="text-lg font-semibold">Add Teacher</h3>
            <select className="mb-4 p-2 border w-60" value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
              <option value="">Select a Teacher</option>
              {availableTeachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>{teacher.email}</option>
              ))}
            </select>
            <button onClick={handleAddTeacher} className="bg-blue-500 text-white p-2 rounded w-60">Add Teacher</button>
          </div>

          <div className="mb-4 flex flex-col">
            <h3 className="text-lg font-semibold">Add Students</h3>
            <select className="mb-4 p-2 border w-60" multiple value={studentIds} onChange={(e) => setStudentIds([...e.target.selectedOptions].map(o => o.value))}>
              {availableStudents.map((student) => (
                <option key={student._id} value={student._id}>{student.email}</option>
              ))}
            </select>
            <button onClick={handleAddStudents} className="bg-blue-500 text-white p-2 rounded w-60">Add Students</button>
          </div>
        </div>
      )}

      <div>
        <button onClick={handleSave} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
          Save
        </button>
      </div>

      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default PrincipalAdd;
