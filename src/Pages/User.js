import React, { useState } from 'react';
import { Phone, CirclePlus, CircleMinus, FileText, FileSpreadsheet, Printer, Eye, Edit, Trash2, Upload } from "lucide-react";

export default function User() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'harshal',
      lastName: 'pinge',
      username: 'harshal08',
      email: 'harshal@example.com',
      phone: '123-456-7890',
      status: 'Active'
    }
  ]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    image: null,
    status: 'Active'
  });
  const [selectedUsers, setSelectedUsers] = useState({});

  function handleAddUser(event) {
    event.preventDefault();
    const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
    setUsers(updatedUsers);
    setShowAddForm(false);
    setNewUser({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      image: null,
      status: 'Active'
    });
  }

  function handleInputChange(event) {
    const { name, value, type, checked, files } = event.target;
    setNewUser({
      ...newUser,
      [name]: type === 'checkbox' ? (checked ? 'Active' : 'Inactive') :
        type === 'file' ? files[0] : value
    });
  }

  function handleIconClick(action) {
    alert(`${action} action triggered`);
  }

  function handleCheckboxChange(id) {
    setSelectedUsers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  function handleBulkDelete() {
    const updatedUsers = users.filter(user => !selectedUsers[user.id]);
    setUsers(updatedUsers);
    setSelectedUsers({});
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-white flex space-x-4">
        <button
          className="h-20 w-60 bg-teal-400 text-2xl font-bold rounded-lg flex items-center justify-center"
          onClick={() => setShowAddForm(true)}
        >
          <CirclePlus size={35} className="mr-2" /> Add User
        </button>
        <button
          className="h-20 w-60 bg-red-500 text-2xl font-bold rounded-lg flex items-center justify-center"
          onClick={handleBulkDelete}
        >
          <CircleMinus size={35} className="mr-2" /> Delete Selected
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <select className="border rounded px-6 py-1 text-3xl">
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <span className="ml-2 text-2xl"> records per page</span>
        </div>

        <div className="flex-1 flex justify-center items-center space-x-4">
          <span className='text-3xl'>search</span>
          <input
            type="text"
            className="border rounded px-8 py-4 w-1/3 text-2xl"
          />
        </div>

        <div className="flex space-x-8">
          <div className="group relative">
            <FileText onClick={() => handleIconClick('Export PDF')} className="text-red-500 cursor-pointer" size={40} />
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-1 rounded text-2xl opacity-0 group-hover:opacity-100 transition-opacity">Export PDF</span>
          </div>
          <div className="group relative">
            <FileSpreadsheet onClick={() => handleIconClick('Export CSV')} className="text-yellow-500 cursor-pointer" size={40} />
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-1 rounded text-2xl opacity-0 group-hover:opacity-100 transition-opacity">Export CSV</span>
          </div>
          <div className="group relative">
            <Printer onClick={() => handleIconClick('Print')} className="text-pink-500 cursor-pointer" size={40} />
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-2xl opacity-0 group-hover:opacity-100 transition-opacity">Print</span>
          </div>
          <div className="group relative">
            <Eye onClick={() => handleIconClick('View')} className="text-blue-500 cursor-pointer" size={40} />
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-2xl opacity-0 group-hover:opacity-100 transition-opacity">View</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-2xl">
                <input type="checkbox" onChange={() => {
                  const allSelected = Object.keys(selectedUsers).length === users.length && Object.values(selectedUsers).every(Boolean);
                  const newSelection = {};
                  users.forEach(user => {
                    newSelection[user.id] = !allSelected;
                  });
                  setSelectedUsers(newSelection);
                }} 
                 className="w-6 h-6"
                 />
              </th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">User</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Contact</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2 text-xl">
                  <input type="checkbox" checked={!!selectedUsers[user.id]} onChange={() => handleCheckboxChange(user.id)} className="w-6 h-6" />
                </td>
                <td className="border px-4 py-2 text-2xl">
                  <div className="font-bold">{user.firstName} {user.lastName}</div>
                  <div>Username: {user.username}</div>
                </td>
                <td className="border px-4 py-2 text-2xl">
                  <div>{user.email}</div>
                  <div>{user.phone}</div>
                </td>
                <td className="border px-4 py-2 text-2xl">
                  <span className={`px-2 py-1 rounded ${user.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="border px-4 py-2 text-2xl">
                  <button className="text-violet-500 hover:text-violet-700 mr-2" onClick={() => handleIconClick('Edit')}>
                    <Edit size={35} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleIconClick('Delete')}>
                    <Trash2 size={35} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-16 w-9/12 max-w-7xl">
            <h2 className="text-3xl font-bold mb-8">Add User</h2>
            <form onSubmit={handleAddUser} className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-2xl mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Username *</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={newUser.confirmPassword}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Profile Picture</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Status</label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" className="mt-4 bg-teal-400 text-white font-bold py-2 px-4 rounded-lg">
                Add User
              </button>
            </form>
            <button className="mt-4 text-red-500" onClick={() => setShowAddForm(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
