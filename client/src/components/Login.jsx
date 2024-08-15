import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classroomimage from "../assets/classroom.png";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Properly set the apiUrl with a fallback
  const apiUrl =   'https://classroom-znl6.onrender.com';
  console.log(apiUrl); // This will correctly log the API URL or the fallback

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use the apiUrl variable that now has either the env URL or the fallback
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      const { id, role, token } = response.data;

      // Store user details and token in local storage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userId', id);
      localStorage.setItem('userRole', role);
      localStorage.setItem('token', token);

      // Navigate based on role
      if (role === 'Principal') {
        navigate('/principal');
      } else if (role === 'Teacher') {
        navigate('/teacher');
      } else if (role === 'Student') {
        navigate('/student');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${classroomimage})` }}
    >
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-2 border w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 border w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
