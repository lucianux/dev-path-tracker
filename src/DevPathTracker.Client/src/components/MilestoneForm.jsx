import { useState } from 'react';

function MilestoneForm({ onMilestoneAdded }) {
  // 1. Estado para los campos del formulario
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newMilestone = { title, category, status };
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      // 2. Enviar datos al Backend (.NET 8)
      const response = await fetch(`${baseUrl}/milestones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMilestone),
      });

      if (response.ok) {
        const addedMilestone = await response.json();
        onMilestoneAdded(addedMilestone); // Avisar al padre para actualizar la lista
        setTitle(''); // Limpiar el input
      }
    } catch (error) {
      console.error("Error saving milestone:", error);
    }
  };

  return (
  <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8 max-w-md mx-auto"
  >
      <h3 className="text-xl font-bold text-slate-800 mb-4">New Milestone</h3>
      <div className="flex flex-col gap-4">
      <input 
          type="text" 
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="What did you learn?" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
      />
      <select 
          className="px-4 py-2 border rounded-lg bg-white"
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
      >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
      </select>
      <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-md"
      >
          Add Milestone
      </button>
      </div>
  </form>
  );
}

export default MilestoneForm;