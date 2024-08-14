import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentDashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassrooms = async () => {
      const email = localStorage.getItem('userEmail'); // Assuming you store the user email in local storage

      if (!email) {
        setError('User email not found in local storage.');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/classroom/all`);
        const filteredClassrooms = response.data.filter(classroom => 
          classroom.students.some(student => student.email === email)
        );
        setClassrooms(filteredClassrooms);
      } catch (error) {
        setError('Error fetching classrooms.');
        console.error('Error fetching classrooms:', error.response ? error.response.data : error.message);
      }
    };

    fetchClassrooms();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {classrooms.length > 0 ? (
        classrooms.map((classroom) => (
          <div key={classroom._id} className="mb-8 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{classroom.name}</h2>
            <p className="mb-2"><strong>Teacher:</strong> {classroom.teacher.email}</p>

            <h3 className="text-lg font-semibold mb-2">Your Classmates:</h3>
            <ul className="list-disc pl-5">
              {classroom.students
                .filter(student => student.email !== localStorage.getItem('userEmail'))
                .map(student => (
                  <li key={student._id}>{student.email}</li>
                ))
              }
            </ul>

            <h3 className="text-lg font-semibold mb-2">Classroom Timetable:</h3>
            <p><strong>Start Time:</strong> {classroom.startTime}</p>
            <p><strong>End Time:</strong> {classroom.endTime}</p>
            <p><strong>Days:</strong> {classroom.days.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No classrooms found</p>
      )}
    </div>
  );
}

export default StudentDashboard;
