import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { 
  fetchMaintenanceEvents, 
  fetchTechnicians, 
  fetchSchedules, 
  fetchAircraft, 
  fetchRelationships 
} from './services/api';
import GraphVisualization from './components/GraphVisualization';
import { transformGraphData } from './services/transformGraphData';

function App() {
  const [elements, setElements] = useState([]); // State to track graph elements (nodes + edges)
  const [relationshipType, setRelationshipType] = useState(''); // Current relationship type for filtering edges
  const [showEdges, setShowEdges] = useState(false); // Toggle for showing edges
  const [allRelationships, setAllRelationships] = useState([]); // Store all relationships data for easier filtering

  // Enhanced fetchData function that handles initial data fetching and relationship type changes
  const fetchData = async (relationshipType = '') => {
    try {
      // Fetch each dataset (Aircraft, Maintenance Events, Technicians, Schedules, and Relationships)
      const maintenanceEvents = await fetchMaintenanceEvents() || [];
      const technicians = await fetchTechnicians() || [];
      const schedules = await fetchSchedules() || [];
      const aircraft = await fetchAircraft() || [];
      let relationships = await fetchRelationships() || [];

      // Ensure each relationship has a `relationship` field
      relationships = relationships.map(rel => {
        // Assign default relationship types based on source and target ID structure
        if (rel.source.startsWith('aircraft') && rel.target.startsWith('maintenance')) {
          return { ...rel, relationship: 'requires_maintenance' };
        } else if (rel.source.startsWith('maintenance') && rel.target.startsWith('technician')) {
          return { ...rel, relationship: 'assigned_to' };
        } else if (rel.source.startsWith('maintenance') && rel.target.startsWith('schedule')) {
          return { ...rel, relationship: 'tracks' };
        } else {
          return { ...rel, relationship: rel.relationship || 'unknown' };
        }
      });

      // Cache all relationships if fetching for the first time
      if (relationshipType === '') {
        setAllRelationships(relationships);
      } else {
        // Use the cached relationships data for filtering if relationshipType changes
        relationships = allRelationships.filter(edge => edge.relationship === relationshipType);
      }

      // Debug: Confirm structure of relationships
      console.log(`Filtered Relationships for "${relationshipType}":`, relationships);

      // Transform the node data using the `transformGraphData` function
      const nodesAndEdges = transformGraphData(
        maintenanceEvents,
        technicians,
        schedules,
        aircraft,
        relationships,
        relationshipType
      );

      // Update the elements state with transformed nodes and edges
      setElements(nodesAndEdges);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle toggling of all relationships
  const handleShowEdges = () => {
    setShowEdges(true);
    setRelationshipType(''); // Reset the relationship type to show all
    fetchData(''); // Fetch all relationships without filtering
  };

  // Handle relationship type changes based on button clicks
  const handleRelationshipChange = (newRelationshipType) => {
    setRelationshipType(newRelationshipType);  // Set the current relationship type in the state
    setShowEdges(true);  // Show edges when a relationship type is selected
    fetchData(newRelationshipType);  // Fetch data with the selected relationship type
  };

  // Fetch all data when the component mounts
  useEffect(() => {
    fetchData('');  // Initial fetch with no relationship type (fetch all relationships)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Maintenance and Technician Graph</h1>
        {/* Pass elements and showEdges props to GraphVisualization */}
        <GraphVisualization elements={elements} showEdges={showEdges} />
        
        {/* Relationship Type Buttons */}
        <button 
          className={relationshipType === 'assigned_to' ? 'active' : ''} 
          onClick={() => handleRelationshipChange('assigned_to')}
        >
          Show Assigned To
        </button>
        
        <button 
          className={relationshipType === 'tracks' ? 'active' : ''} 
          onClick={() => handleRelationshipChange('tracks')}
        >
          Show Tracks
        </button>
        
        <button 
          className={relationshipType === 'requires_maintenance' ? 'active' : ''} 
          onClick={() => handleRelationshipChange('requires_maintenance')}
        >
          Show Requires Maintenance
        </button>
        
        <button 
          className={relationshipType === '' ? 'active' : ''} 
          onClick={handleShowEdges}
        >
          Fetch All Relationships
        </button>
      </header>
    </div>
  );
}

export default App;
