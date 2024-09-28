import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import '/Users/dustin_caravaglia/Documents/repo/rmo_2_mvp_fe/src/styles/GraphVisualization.css';


const GraphVisualization = ({ elements, showEdges }) => {
  const cyRef = useRef(null);

  useEffect(() => {
    if (cyRef.current) {
      // Create a map of all node IDs for validating edges
      const nodeIds = new Set(elements.filter(el => el.group === 'nodes').map(el => el.data.id));
      console.log("Node IDs:", Array.from(nodeIds));  // Debug log for node IDs

      // Filter valid elements (nodes and edges) based on node existence
      const validElements = elements.filter(el => 
        el.group !== 'edges' || (nodeIds.has(el.data.source) && nodeIds.has(el.data.target))
      );

      console.log("Filtered Elements for Cytoscape:", validElements);

      // Initialize Cytoscape with the valid elements
      const cy = cytoscape({
        container: cyRef.current,
        elements: validElements,
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
            selector: 'edge[label]',
            style: {
              width: 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              label: 'data(label)',
              'font-size': '10px',
              'text-margin-y': -10,
            },
          },
          {
            selector: 'edge[label="assigned_to"]',
            style: {
              'line-color': '#FF5733',
              'target-arrow-color': '#FF5733',
            },
          },
          {
            selector: 'edge[label="tracks"]',
            style: {
              'line-color': '#33FF57',
              'target-arrow-color': '#33FF57',
            },
          },
          {
            selector: 'edge[label="requires_maintenance"]',
            style: {
              'line-color': '#3357FF',
              'target-arrow-color': '#3357FF',
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

      return () => cy.destroy();  // Cleanup on unmount
    }
  }, [elements]);

  return <div id="cy" ref={cyRef} style={{ width: '100%', height: '600px', border: '1px solid #ccc', margin: '0 auto' }}></div>;
};

export default GraphVisualization;
