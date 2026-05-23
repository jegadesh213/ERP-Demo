import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import './App.css'

function App() {
    return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Dashboard />} />

          <Route path="employees" element={<Employees />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;