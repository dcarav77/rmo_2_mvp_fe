import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import '/Users/dustin_caravaglia/Documents/repo/rmo_2_mvp_fe/src/styles/GraphVisualization.css';

const GraphVisualization = ({ elements }) => {
  const cyRef = useRef(null);

  useEffect(() => {
    if (cyRef.current) {
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
  }, [elements]);

  return (
    <div
      id="cy"
      ref={cyRef}
      style={{
        width: '100%', // Ensure full width
        height: '600px', // Set height of the graph
        border: '1px solid #ccc', // Add a border for visibility
        margin: '0 auto', // Center the graph container
      }}
    ></div>
  );
};

export default GraphVisualization;
