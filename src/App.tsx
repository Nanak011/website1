import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import GuestLab from './pages/GuestLab';
import ExperimentsPage from './pages/experiments/ExperimentsPage';
import ChemistryLab from './pages/experiments/ChemistryLab';
import PhysicsLab from './pages/experiments/PhysicsLab';
import BiologyLab from './pages/experiments/BiologyLab';
import MathLab from './pages/experiments/MathLab';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/guest" element={<GuestLab />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
          <Route path="/experiments/chemistry" element={<ChemistryLab />} />
          <Route path="/experiments/physics" element={<PhysicsLab />} />
          <Route path="/experiments/biology" element={<BiologyLab />} />
          <Route path="/experiments/mathematics" element={<MathLab />} />
          <Route path="/guest/chemistry" element={<ChemistryLab />} />
          <Route path="/guest/physics" element={<PhysicsLab />} />
          <Route path="/guest/biology" element={<BiologyLab />} />
          <Route path="/guest/mathematics" element={<MathLab />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;