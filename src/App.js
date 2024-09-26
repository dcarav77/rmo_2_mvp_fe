import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { fetchMaintenanceEvents, fetchTechnicians, fetchSchedules, fetchAircraft } from './services/api';
import GraphVisualization from './components/GraphVisualization';
import { transformGraphData } from './services/transformGraphData'; // Ensure this service transforms data properly

function App() {
  const [elements, setElements] = useState([]);
  const [relationshipType, setRelationshipType] = useState(''); // To track current relationship
  const [showEdges, setShowEdges] = useState(false); // To toggle edge display

  const fetchData = async () => {
    const maintenanceEvents = await fetchMaintenanceEvents();
    const technicians = await fetchTechnicians();
    const schedules = await fetchSchedules();
    const aircraft = await fetchAircraft();

    console.log('Fetched Maintenance Events: ', maintenanceEvents);
    console.log('Fetched Technicians: ', technicians);
    console.log('Fetched Schedules: ', schedules);
    console.log('Fetched Aircraft: ', aircraft);

    // Create the graph nodes without relationships first
    const nodes = transformGraphData(maintenanceEvents, technicians, schedules, aircraft);
    setElements(nodes);
  };

  // Function to handle displaying relationships/edges
  const handleShowEdges = () => {
    setShowEdges(true);
    // Optionally you can add logic to fetch relationships and merge into existing elements
    // Update the elements to include edges based on current `relationshipType`
  };

  // Function to scroll through different relationships
  const handleRelationshipChange = (newRelationshipType) => {
    setRelationshipType(newRelationshipType);
    setShowEdges(true);
    // Update the elements based on the chosen relationshipType, for example, 'assigned_to', 'tracks', etc.
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Maintenance and Technician Graph</h1>
        <GraphVisualization elements={elements} showEdges={showEdges} />
        <button onClick={() => handleRelationshipChange('assigned_to')}>Show Assigned To</button>
        <button onClick={() => handleRelationshipChange('tracks')}>Show Tracks</button>
        <button onClick={() => handleRelationshipChange('requires_maintenance')}>Show Requires Maintenance</button>
        <button onClick={handleShowEdges}>Fetch Relationships</button>
      </header>
    </div>
  );
}

export default App;
