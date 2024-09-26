import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import './GraphVisualization.css'; 
import { transformGraphData } from '../services/transformGraphData'; 

const CytoscapeGraph = ({ maintenanceEvents, technicians }) => {
  const cyRef = useRef(null);

  useEffect(() => {
    if (cyRef.current) {
      // Transform data to Cytoscape format
      const elements = transformGraphData(maintenanceEvents, technicians);
      console.log('Cytoscape Elements:', elements); // Log elements for debugging

      // Initialize Cytoscape with the transformed elements
      const cy = cytoscape({
        container: cyRef.current,
        elements, 
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#0074D9',
              label: 'data(label)',
              'text-valign': 'center',
              'text-halign': 'center',
              'font-size': '12px',
              'text-wrap': 'wrap',
              'width': '100px',
              'height': '100px',
              'border-width': 2,
              'border-color': '#555',
              color: '#fff',
            },
          },
          {
            selector: 'edge',
            style: {
              width: 3,
              'line-color': '#ddd',
              'target-arrow-color': '#ddd',
              'target-arrow-shape': 'triangle',
            },
          },
        ],
        layout: {
          name: 'grid',
          rows: 2,
          padding: 50,
          avoidOverlap: true,
        },
      });

      cy.resize(); // Ensure the graph resizes to fit the container
      cy.fit(); // Adjust the zoom level to fit the graph inside the container

      return () => cy.destroy(); // Cleanup on component unmount
    }
  }, [maintenanceEvents, technicians]); // Watch for changes in the props

  return (
    <div
      id="cy"
      ref={cyRef}
      style={{
        width: '100%',
        height: '600px',
        border: '1px solid #ccc',
        margin: '0 auto',
      }}
    ></div>
  );
};

export default CytoscapeGraph;
