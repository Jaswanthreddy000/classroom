import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateClassroom = () => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    if (e.target.checked) {
      setDays([...days, selectedDay]);
    } else {
      setDays(days.filter((day) => day !== selectedDay));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classroomData = { name, startTime, endTime, days };
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/classroom/create`, classroomData);
      alert('Classroom created successfully');
      navigate('/principaladd'); // Redirect to /principaladd
    } catch (error) {
      console.error('Error creating classroom:', error);
      alert('Failed to create classroom');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Create Classroom</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Classroom Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Days of the Week</label>
          <div className="grid grid-cols-2 gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={day}
                    onChange={handleDayChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{day}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Create Classroom
        </button>
      </form>
    </div>
  );
};

export default CreateClassroom;
