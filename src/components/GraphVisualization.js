import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import '/Users/dustin_caravaglia/Documents/repo/rmo_2_mvp_fe/src/styles/GraphVisualization.css';

const GraphVisualization = ({ elements, showEdges }) => {
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
              display: showEdges ? 'visible' : 'none', // Control edge visibility
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

      cy.resize(); 
      cy.fit(); 

      return () => cy.destroy();
    }
  }, [elements, showEdges]); // Re-run when elements or showEdges changes

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

export default GraphVisualization;
