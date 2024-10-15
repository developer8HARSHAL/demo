import React, { useState } from 'react';
import { Phone, Mail, CirclePlus, Filter, FileText, Eye, Trash2, Upload, User } from 'lucide-react';

export default function Employee() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      staffId: 'EMP001',
      email: 'john@example.com',
      phone: '123-456-7890',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      company: 'ACME Inc.',
      department: 'IT',
      designation: 'Developer',
      officeShift: 'Morning',
      username: 'johndoe',
      role: 'Employee',
      attendanceType: 'In-office',
      dateOfJoining: '2022-01-01',
      image: null
    }
  ]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    staffId: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    company: '',
    department: '',
    designation: '',
    officeShift: '',
    username: '',
    role: '',
    password: '',
    confirmPassword: '',
    attendanceType: '',
    dateOfJoining: '',
    image: null
  });

  const [selectedEmployees, setSelectedEmployees] = useState({});

  function handleAddEmployee(event) {
    event.preventDefault();
    const updatedEmployees = [...employees, { ...newEmployee, id: employees.length + 1 }];
    setEmployees(updatedEmployees);
    setShowAddForm(false);
    setNewEmployee({
      firstName: '',
      lastName: '',
      staffId: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      company: '',
      department: '',
      designation: '',
      officeShift: '',
      username: '',
      role: '',
      password: '',
      confirmPassword: '',
      attendanceType: '',
      dateOfJoining: '',
      image: null
    });
  }

  function handleInputChange(event) {
    const { name, value, type, files } = event.target;
    setNewEmployee({
      ...newEmployee,
      [name]: type === 'file' ? files[0] : value
    });
  }

  function handleIconClick(action, id) {
    if (action === 'delete') {
      setEmployees(employees.filter(emp => emp.id !== id));
    } else {
      alert(`${action} action triggered for employee ${id}`);
    }
  }

  function handleCheckboxChange(event, id) {
    const isChecked = event.target.checked;
    setSelectedEmployees((prev) => ({
      ...prev,
      [id]: isChecked
    }));
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-white flex space-x-4">
        <button 
          className="h-20 w-60 bg-teal-400 text-2xl font-bold rounded-lg flex items-center justify-center"
          onClick={() => setShowAddForm(true)}
        >
          <CirclePlus size={35} className="mr-2" /> Add Employee
        </button>
        <button 
          className="h-20 w-60 bg-red-500 text-2xl font-bold rounded-lg flex items-center justify-center"
          onClick={() => {
            const selectedIds = Object.keys(selectedEmployees).filter(id => selectedEmployees[id]);
            setEmployees(employees.filter(emp => !selectedIds.includes(emp.id.toString())));
          }}
        >
          <Trash2 size={35} className="mr-2" /> Delete Employee
        </button>
        <button className="h-20 w-60 bg-blue-500 text-2xl font-bold rounded-lg flex items-center justify-center">
          <Filter size={35} className="mr-2" /> Filter
        </button>
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center">
          <select className="border rounded px-6 py-1 text-3xl">
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <span className="ml-2 text-2xl"> records per page</span>
        </div>

        <div className="flex-1 flex justify-center items-center space-x-4">
          <span className='text-3xl'>Search</span>
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
            <Eye onClick={() => handleIconClick('View')} className="text-blue-500 cursor-pointer" size={40} />
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-2xl opacity-0 group-hover:opacity-100 transition-opacity">View</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-10 text-left text-2xl">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-6 w-6"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const newSelected = {};
                    employees.forEach(emp => {
                      newSelected[emp.id] = isChecked;
                    });
                    setSelectedEmployees(newSelected);
                  }} 
                />
              </th>
              <th className="px-4 py-2 text-left text-2xl">Employee</th>
              <th className="px-4 py-2 text-left text-2xl">Contact</th>
              <th className="px-4 py-2 text-left text-2xl">Department</th>
              <th className="px-4 py-2 text-left text-2xl">Designation</th>
              <th className="px-4 py-2 text-left text-2xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedEmployees[employee.id] || false}
                    onChange={(event) => handleCheckboxChange(event, employee.id)}
                    className="form-checkbox h-6 w-6" 
                  />
                </td>
                <td className="border px-4 py-2 text-2xl">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                      {employee.image ? (
                        <img src={URL.createObjectURL(employee.image)} alt={employee.firstName} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User size={24} className="text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-blue-500">{employee.firstName} {employee.lastName}</div>
                      <div className="text-xl text-gray-600">ID: {employee.staffId}</div>
                    </div>
                  </div>
                </td>
                <td className="border px-4 py-2 text-2xl">
                  <div className="flex items-center">
                    <Phone className="mr-2 text-gray-600" size={24} />
                    {employee.phone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 text-gray-600" size={24} />
                    {employee.email}
                  </div>
                </td>
                <td className="border px-4 py-2 text-2xl text-gray-500 font-bold">{employee.department}</td>
                <td className="border px-4 py-2 text-2xl text-gray-500 font-bold">{employee.designation}</td>
                <td className="border px-4 py-2 text-2xl">
                  <button onClick={() => handleIconClick('view', employee.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                    <Eye size={35} />
                  </button>
                  <button onClick={() => handleIconClick('delete', employee.id)} className="text-red-500 hover:text-red-700">
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
          <div className="bg-white rounded-lg p-16 w-9/12 max-w-7xl max-h-screen overflow-y-auto">
            <form onSubmit={handleAddEmployee} className="grid grid-cols-2 gap-6">
              <h2 className="text-3xl font-bold mb-4 col-span-2">Add Employee</h2>

              <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-2 text-xl">First Name</label>
                <input type="text" name="firstName" id="firstName" value={newEmployee.firstName} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="mb-2 text-xl">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={newEmployee.lastName} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="staffId" className="mb-2 text-xl">Staff ID</label>
                <input type="text" name="staffId" id="staffId" value={newEmployee.staffId} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 text-xl">Email</label>
                <input type="email" name="email" id="email" value={newEmployee.email} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-2 text-xl">Phone</label>
                <input type="tel" name="phone" id="phone" value={newEmployee.phone} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dateOfBirth" className="mb-2 text-xl">Date of Birth</label>
                <input type="date" name="dateOfBirth" id="dateOfBirth" value={newEmployee.dateOfBirth} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender" className="mb-2 text-xl">Gender</label>
                <select name="gender" id="gender" value={newEmployee.gender} onChange={handleInputChange} className="border rounded px-4 py-2" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="company" className="mb-2 text-xl">Company</label>
                <input type="text" name="company" id="company" value={newEmployee.company} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="department" className="mb-2 text-xl">Department</label>
                <input type="text" name="department" id="department" value={newEmployee.department} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="designation" className="mb-2 text-xl">Designation</label>
                <input type="text" name="designation" id="designation" value={newEmployee.designation} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="officeShift" className="mb-2 text-xl">Office Shift</label>
                <input type="text" name="officeShift" id="officeShift" value={newEmployee.officeShift} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="username" className="mb-2 text-xl">Username</label>
                <input type="text" name="username" id="username" value={newEmployee.username} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="role" className="mb-2 text-xl">Role</label>
                <input type="text" name="role" id="role" value={newEmployee.role} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="attendanceType" className="mb-2 text-xl">Attendance Type</label>
                <input type="text" name="attendanceType" id="attendanceType" value={newEmployee.attendanceType} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dateOfJoining" className="mb-2 text-xl">Date of Joining</label>
                <input type="date" name="dateOfJoining" id="dateOfJoining" value={newEmployee.dateOfJoining} onChange={handleInputChange} className="border rounded px-4 py-2" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="image" className="mb-2 text-xl">Image</label>
                <input type="file" name="image" id="image" onChange={handleInputChange} className="border rounded px-4 py-2" />
              </div>

              <div className="flex justify-end col-span-2">
                <button type="submit" className="bg-blue-500 text-white rounded px-6 py-3">Add Employee</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-300 text-black rounded px-6 py-3 ml-4">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
