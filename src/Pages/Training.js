import React, { useState } from 'react';
import { CirclePlus, CircleMinus, Edit, Trash2 } from "lucide-react";

export default function Training() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editTrainingId, setEditTrainingId] = useState(null);
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      company: 'Tech Corp',
      trainingType: 'Technical',
      trainer: 'Dummy',
      employee: 'Dummy2',
      startDate: '2024-10-01',
      endDate: '2024-10-05',
      trainingCost: '500',
      description: 'Advanced React Training',
    },
  ]);
  const [newTraining, setNewTraining] = useState({
    company: '',
    trainingType: '',
    trainer: '',
    employee: '',
    startDate: '',
    endDate: '',
    trainingCost: '',
    description: '',
  });

  function handleAddTraining(event) {
    event.preventDefault();
    const updatedTrainings = editTrainingId
      ? trainings.map(training =>
          training.id === editTrainingId ? { ...newTraining, id: editTrainingId } : training
        )
      : [...trainings, { ...newTraining, id: trainings.length + 1 }];
      
    setTrainings(updatedTrainings);
    resetForm();
  }

  function resetForm() {
    setShowAddForm(false);
    setEditTrainingId(null);
    setNewTraining({
      company: '',
      trainingType: '',
      trainer: '',
      employee: '',
      startDate: '',
      endDate: '',
      trainingCost: '',
      description: '',
    });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewTraining({
      ...newTraining,
      [name]: value,
    });
  }

  function handleEditTraining(id) {
    const trainingToEdit = trainings.find(training => training.id === id);
    setNewTraining(trainingToEdit);
    setEditTrainingId(id);
    setShowAddForm(true);
  }

  function handleDeleteTraining(id) {
    const updatedTrainings = trainings.filter(training => training.id !== id);
    setTrainings(updatedTrainings);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-white flex space-x-4">
        <button 
          className="h-20 w-60 bg-teal-400 text-2xl font-bold rounded-lg flex items-center justify-center"
          onClick={() => setShowAddForm(true)}
        >
          <CirclePlus size={35} className="mr-2" /> Add Training
        </button>
        <button className="h-20 w-60 bg-red-500 text-2xl font-bold rounded-lg flex items-center justify-center">
          <CircleMinus size={35} className="mr-2" /> Bulk Delete
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-2xl">
                <input type="checkbox" className="w-6 h-6" />
              </th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Training Type</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Employee</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Trainer</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Company</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Start Date</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">End Date</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((training) => (
              <tr key={training.id}>
                <td className="border px-4 py-2 text-xl">
                  <input type="checkbox" className="w-6 h-6" />
                </td>
                <td className="border px-4 py-2 text-2xl">{training.trainingType}</td>
                <td className="border px-4 py-2 text-2xl">{training.employee}</td>
                <td className="border px-4 py-2 text-2xl">{training.trainer}</td>
                <td className="border px-4 py-2 text-2xl">{training.company}</td>
                <td className="border px-4 py-2 text-2xl">{training.startDate}</td>
                <td className="border px-4 py-2 text-2xl">{training.endDate}</td>
                <td className="border px-4 py-2 text-2xl">
                  <button onClick={() => handleEditTraining(training.id)} className="text-violet-500 hover:text-violet-700 mr-2">
                    <Edit size={35} />
                  </button>
                  <button onClick={() => handleDeleteTraining(training.id)} className="text-red-500 hover:text-red-700">
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
            <h2 className="text-3xl font-bold mb-8">{editTrainingId ? 'Edit Training' : 'Add Training'}</h2>
            <form onSubmit={handleAddTraining} className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-2xl mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={newTraining.company}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Training Type *</label>
                <input
                  type="text"
                  name="trainingType"
                  placeholder="Training Type"
                  value={newTraining.trainingType}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Trainer *</label>
                <input
                  type="text"
                  name="trainer"
                  placeholder="Trainer Name"
                  value={newTraining.trainer}
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
                  value={newTraining.employee}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={newTraining.startDate}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={newTraining.endDate}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Training Cost *</label>
                <input
                  type="number"
                  name="trainingCost"
                  placeholder="Training Cost"
                  value={newTraining.trainingCost}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-2xl mb-2">Training Cost Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newTraining.description}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full text-2xl"
                  rows="3"
                />
              </div>
              <div className="col-span-2 flex justify-between mt-6">
                <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded text-2xl hover:bg-blue-700">
                  {editTrainingId ? 'Update Training' : 'Add Training'}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-6 py-3 rounded text-2xl hover:bg-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
