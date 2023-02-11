import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Manage from './pages/Manage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
