import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import User from './Pages/User';
import Employee from './Pages/Employee';
import Training from './Pages/Training';
import GoalTypeManagement from './Pages/GoalTypeManagement';
import TicketManagement from './Pages/TicketManagement';


export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} />
          
          <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64 lg:ml-72' : 'ml-0'}`}>
            <main className="p-6">
              <Routes>
                <Route path="/" element={<div>Dashboard</div>} />
                <Route path="/users" element={<User />} />
                <Route path="/Employee" element={<Employee />} />
                <Route path="/Training" element={<Training />} />
                <Route path="/GoalTypeManagement" element={<GoalTypeManagement />} />
                <Route path="/TicketManagement" element={<TicketManagement />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}