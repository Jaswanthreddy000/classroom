import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherDashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassrooms = async () => {
      const email = localStorage.getItem('userEmail');
    
      if (!email) {
        setError('User email not found in local storage.');
        return;
      }
    
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/classroom/all`, {
          params: { email }
        });
        setClassrooms(response.data);
      } catch (error) {
        setError('Error fetching classrooms.');
        console.error('Error fetching classrooms:', error); // Detailed error log
      }
    };
    
    
    fetchClassrooms();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {classrooms.map((classroom) => (
          <div
            key={classroom._id}
            className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{classroom.name}</h3>
            <p className="mb-2"><strong>Start Time:</strong> {classroom.startTime}</p>
            <p className="mb-2"><strong>End Time:</strong> {classroom.endTime}</p>
            <p className="mb-2"><strong>Days:</strong> {classroom.days.join(', ')}</p>
            <h4 className="text-md font-semibold mb-2">Students:</h4>
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
  );
}

export default TeacherDashboard;
