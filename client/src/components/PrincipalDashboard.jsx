import React, { useState } from 'react';
import axios from 'axios';

function PrincipalDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Teacher');
  const [message, setMessage] = useState('');

  const handleAddUser = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/add-user`, { email, password, role });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Principal Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Teacher or Student</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <label className="w-24 font-semibold" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="p-2 border w-60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-semibold" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="p-2 border w-60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-semibold" htmlFor="role">Role:</label>
            <select
              id="role"
              className="p-2 border w-60"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white p-2 rounded w-40 mt-4"
          >
            Create New User
          </button>
          {message && <p className="mt-4">{message}</p>}
        </div>
      </div>
      {/* Additional Principal Features Can Be Added Here */}
    </div>
  );
}

export default PrincipalDashboard;
