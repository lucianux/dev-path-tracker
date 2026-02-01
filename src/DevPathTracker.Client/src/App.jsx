import { useState, useEffect } from 'react'
import MilestoneForm from './components/MilestoneForm'
import './App.css'

function App() {
  const [milestones, setMilestones] = useState([]);

  // Cargar datos iniciales
  const fetchMilestones = () => {
    fetch('http://localhost:5092/api/milestones')
      .then(res => res.json())
      .then(data => setMilestones(data));
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  // Función que se ejecuta cuando el hijo agrega un hito
  const handleMilestoneAdded = (newMilestone) => {
    setMilestones([...milestones, newMilestone]);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            DevPath <span className="text-blue-600">Tracker</span>
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Your learning journey, documented.</p>
        </header>
        
        <MilestoneForm onMilestoneAdded={handleMilestoneAdded} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {m.category}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(m.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{m.title}</h3>
              <p className="text-sm text-slate-500 mt-1 italic">Status: {m.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App