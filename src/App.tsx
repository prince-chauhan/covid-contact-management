import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    // defining routes for main App
    <Routes>
      {/* initializing path for dashboard it'll redirect all undefined paths to dashboard */}
    <Route path="/*" element={<Dashboard />} />
  </Routes>
  );
}

export default App;
