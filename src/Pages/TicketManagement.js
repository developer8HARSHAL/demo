import React, { useState } from 'react';
import { CirclePlus, CircleMinus, FileText, FileSpreadsheet, Printer, Eye, Edit, Trash2, Upload } from "lucide-react";

export default function TicketManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: 1,
      company: 'Acme Corp',
      department: 'IT',
      employee: 'Dummy',
      priority: 'High',
      subject: 'Server Down',
      dateCreated: '2024-10-15',
      status: 'Open'
    }
  ]);
  const [newTicket, setNewTicket] = useState({
    company: '',
    department: '',
    employee: '',
    priority: 'Low',
    subject: '',
    ticketNote: '',
    attachments: null,
    description: '',
  });

  function handleAddTicket(event) {
    event.preventDefault();
    const updatedTickets = [...tickets, { ...newTicket, id: tickets.length + 1, dateCreated: new Date().toISOString().split('T')[0], status: 'Open' }];
    setTickets(updatedTickets);
    setShowAddForm(false);
    setNewTicket({
      company: '',
      department: '',
      employee: '',
      priority: 'Low',
      subject: '',
      ticketNote: '',
      attachments: null,
      description: '',
    });
  }

  function handleInputChange(event) {
    const { name, value, type, files } = event.target;
    setNewTicket({
      ...newTicket,
      [name]: type === 'file' ? files[0] : value
    });
  }

  function handleIconClick(action) {
    alert(`${action} action triggered`);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-white flex space-x-4">
        <button 
          className="h-20 w-60 bg-teal-400 text-2xl font-bold rounded-lg flex items-center justify-center"
          onClick={() => setShowAddForm(true)}
        >
          <CirclePlus size={35} className="mr-2" /> Add Ticket
        </button>
        <button className="h-20 w-60 bg-red-500 text-2xl font-bold rounded-lg flex items-center justify-center">
          <CircleMinus size={35} className="mr-2" /> Delete Ticket
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
                <input type="checkbox" className="w-6 h-6" />
              </th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Company</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Department</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Employee</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Priority</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Subject</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Date Created</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="border px-4 py-2 text-xl">
                  <input type="checkbox" className="w-6 h-6" />
                </td>
                <td className="border px-4 py-2 text-2xl">{ticket.company}</td>
                <td className="border px-4 py-2 text-2xl">{ticket.department}</td>
                <td className="border px-4 py-2 text-2xl">{ticket.employee}</td>
                <td className="border px-4 py-2 text-2xl">{ticket.priority}</td>
                <td className="border px-4 py-2 text-2xl">{ticket.subject}</td>
                <td className="border px-4 py-2 text-2xl">{ticket.dateCreated}</td>
                <td className="border px-4 py-2 text-2xl">
                  <span className={`px-2 py-1 rounded ${ticket.status === 'Open' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="border px-4 py-2 text-2xl">
                  <button className="text-violet-500 hover:text-violet-700 mr-2">
                    <Edit size={35} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
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
            <h2 className="text-3xl font-bold mb-8">Add Ticket</h2>
            <form onSubmit={handleAddTicket} className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-2xl mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={newTicket.company}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Department *</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={newTicket.department}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Employee *</label>
                <input
                  type="text"
                  name="employee"
                  placeholder="Employee Name"
                  value={newTicket.employee}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Priority *</label>
                <select
                  name="priority"
                  value={newTicket.priority}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-2xl mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Ticket Subject"
                  value={newTicket.subject}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-2xl mb-2">Ticket Note</label>
                <input
                  type="text"
                  name="ticketNote"
                  placeholder="Additional Notes"
                  value={newTicket.ticketNote}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-2xl mb-2">Ticket Attachments</label>
                <div className="flex items-center">
                  <input
                    type="file"
                    name="attachments"
                    onChange={handleInputChange}
                    className="hidden"
                    id="attachment-upload"
                  />
                  <label htmlFor="attachment-upload" className="cursor-pointer flex items-center">
                    <Upload size={24} className="mr-2" />
                    <span className="text-2xl">{newTicket.attachments ? newTicket.attachments.name : 'No file chosen'}</span>
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-2xl mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Detailed description of the issue or request"
                  value={newTicket.description}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl h-32"
                />
              </div>
              <div className="col-span-2 flex justify-between">
                <button type="submit" className="bg-violet-500 text-white px-6 py-3 rounded text-2xl hover:bg-violet-600">Submit</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-300 text-black px-6 py-3 rounded text-2xl hover:bg-gray-400">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}