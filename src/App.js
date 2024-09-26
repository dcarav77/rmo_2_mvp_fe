import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { fetchAircraft, fetchMaintenanceEvents, fetchTechnicians, fetchSchedules } from './services/api';
import GraphVisualization from './components/GraphVisualization';
import { transformGraphData } from './services/transformGraphData';

function App() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const maintenanceEvents = await fetchMaintenanceEvents();
      const technicians = await fetchTechnicians();
      const schedules = await fetchSchedules(); 
      const aircrafts = await fetchAircraft(); // Fetch aircrafts

      console.log('Fetched Maintenance Events: ', maintenanceEvents);
      console.log('Fetched Technicians: ', technicians);

      // Transform data into Cytoscape elements
      const transformedElements = await transformGraphData(maintenanceEvents, technicians, schedules, aircrafts);

      // Set elements for Cytoscape visualization
      setElements(transformedElements);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Maintenance and Technician Graph</h1>
        <GraphVisualization elements={elements} />
      </header>
    </div>
  );
}

export default App;
