import React, { useState } from 'react';
import { CirclePlus, CircleMinus, Edit, Trash2 } from "lucide-react";

export default function GoalTypeManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoalType, setNewGoalType] = useState('');
  const [goalTypes, setGoalTypes] = useState([
    { id: 1, type: 'Employee' },
    { id: 2, type: 'Company' },
    { id: 3, type: 'Department' },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleAddGoalType = (event) => {
    event.preventDefault();
    if (newGoalType.trim() !== '') {
      if (editingId !== null) {
        setGoalTypes(goalTypes.map(type => 
          type.id === editingId ? { ...type, type: newGoalType } : type
        ));
        setEditingId(null);
      } else {
        setGoalTypes([...goalTypes, { id: Date.now(), type: newGoalType }]);
      }
      setNewGoalType('');
      setShowAddForm(false);
    }
  };

  const handleBulkDelete = () => {
    const updatedGoalTypes = goalTypes.filter(type => !selectedItems.includes(type.id));
    setGoalTypes(updatedGoalTypes);
    setSelectedItems([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleEdit = (id) => {
    const typeToEdit = goalTypes.find(type => type.id === id);
    if (typeToEdit) {
      setNewGoalType(typeToEdit.type);
      setEditingId(id);
      setShowAddForm(true);
    }
  };

  const handleDelete = (id) => {
    setGoalTypes(goalTypes.filter(type => type.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-white flex space-x-4">
        <button 
          className="h-20 w-60 bg-teal-400 text-2xl font-bold rounded-lg flex items-center justify-center"
          onClick={() => {
            setNewGoalType('');
            setEditingId(null);
            setShowAddForm(true);
          }}
        >
          <CirclePlus size={35} className="mr-2" /> Add New Type
        </button>
        <button 
          className="h-20 w-60 bg-red-500 text-2xl font-bold rounded-lg flex items-center justify-center"
          onClick={handleBulkDelete}
          disabled={selectedItems.length === 0}
        >
          <CircleMinus size={35} className="mr-2" /> Bulk Delete
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-2xl">
                <input 
                  type="checkbox" 
                  className="w-6 h-6"
                  onChange={() => 
                    setSelectedItems(selectedItems.length === goalTypes.length ? [] : goalTypes.map(type => type.id))
                  }
                  checked={selectedItems.length === goalTypes.length && goalTypes.length > 0}
                />
              </th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Type</th>
              <th className="px-4 py-2 text-left text-2xl text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {goalTypes.map((type) => (
              <tr key={type.id}>
                <td className="border px-4 py-2 text-xl">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6"
                    checked={selectedItems.includes(type.id)}
                    onChange={() => handleCheckboxChange(type.id)}
                  />
                </td>
                <td className="border px-4 py-2 text-2xl">{type.type}</td>
                <td className="border px-4 py-2 text-2xl">
                  <button className="text-violet-500 hover:text-violet-700 mr-2" onClick={() => handleEdit(type.id)}>
                    <Edit size={35} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(type.id)}>
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
            <h2 className="text-3xl font-bold mb-8">Add New Type</h2>
            <form onSubmit={handleAddGoalType} className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-2xl mb-2">Goal Type *</label>
                <input 
                  type="text" 
                  name="goalType" 
                  placeholder="Goal Type" 
                  value={newGoalType} 
                  onChange={(e) => setNewGoalType(e.target.value)} 
                  className="border rounded px-4 py-2 w-full text-2xl" 
                  required
                />
              </div>
              <div className="flex justify-between">
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