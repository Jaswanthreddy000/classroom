import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import PrincipalDashboard from './components/PrincipalDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import CreateClassroom from './components/createclassroom';
import Principaladd from './components/principaladd';
import Editclassroom from './components/editclassroom';
import PrincipalLayout from './pages/PrincipalLayout';
import TeacherLayout from './pages/TeacherLayout';
import StudentLayout from './pages/StudentLayout';

// A component to conditionally render Layout
const PrivateRoute = ({ element, layout: LayoutComponent }) => {
  return (
    <LayoutComponent>
      {element}
    </LayoutComponent>
  );
};

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PrivateRoute element={<Login />} layout={TeacherLayout} />} />
        
        <Route path="/principal" element={<PrivateRoute element={<PrincipalDashboard />} layout={PrincipalLayout} />} />
        <Route path="/teacher" element={<PrivateRoute element={<TeacherDashboard />} layout={TeacherLayout} />} />
        <Route path="/student" element={<PrivateRoute element={<StudentDashboard />} layout={StudentLayout} />} />
        <Route path="/createclassroom" element={<PrivateRoute element={<CreateClassroom />} layout={PrincipalLayout} />} />
        <Route path="/principaladd" element={<PrivateRoute element={<Principaladd />} layout={PrincipalLayout} />} />
        <Route path="/edit-classroom/:classroomId" element={<PrivateRoute element={<Editclassroom />} layout={PrincipalLayout} />} />
      </Routes>
    </Router>
  );
}

export default App;
