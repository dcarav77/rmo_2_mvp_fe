export const transformGraphData = (
  maintenanceEvents = [],
  technicians = [],
  schedules = [],
  aircraft = [],
  relationships = [],
  relationshipType = ''
) => {
  // Generalized Node Creation Function
  const createNodes = (items, type) => items.map(item => ({
    data: {
      id: `${type}/${item._key}`,  // Use the collection name and key as unique ID
      label: 
        type === 'Aircraft' ? `Aircraft ${item.registration_number}` :
        type === 'Technician' ? `Technician: ${item.name}` :
        type === 'MaintenanceEvent' ? `Maintenance: ${item.description}` :
        `Schedule on ${item.date}`,  // Default label for 'Schedule'
      type  // Store the type for potential styling
    }
  }));

  // Create Nodes for Each Collection Type
  const maintenanceNodes = createNodes(maintenanceEvents, 'MaintenanceEvent');
  const technicianNodes = createNodes(technicians, 'Technician');
  const scheduleNodes = createNodes(schedules, 'Schedule');
  const aircraftNodes = createNodes(aircraft, 'Aircraft');

  // Create a set of all node IDs for reference
  const nodeIDSet = new Set([
    ...maintenanceNodes.map(n => n.data.id),
    ...technicianNodes.map(n => n.data.id),
    ...scheduleNodes.map(n => n.data.id),
    ...aircraftNodes.map(n => n.data.id),
  ]);

  console.log("Node IDs:", [...nodeIDSet]);

  // Helper function to get the correct node ID format based on prefix
  const getFormattedNodeID = (rawID) => {
    if (rawID.startsWith('aircraft_')) return `Aircraft/${rawID}`;
    if (rawID.startsWith('maintenance_')) return `MaintenanceEvent/${rawID}`;
    if (rawID.startsWith('schedule_')) return `Schedule/${rawID}`;
    if (rawID.startsWith('technician_')) return `Technician/${rawID}`;
    return rawID;  // Default to returning the same ID if no match is found
  };

  // Filter edges based on relationshipType (all relationships if empty)
  const filteredEdges = relationships.filter(edge => 
    relationshipType === '' || edge.relationship === relationshipType
  );

  // Create Edges based on Valid Nodes
  const edges = filteredEdges.map(edge => {
    const source = getFormattedNodeID(edge.source);  // Format source ID correctly
    const target = getFormattedNodeID(edge.target);  // Format target ID correctly

    // Debug: Check source and target node existence
    console.log(`Processing Edge: ${edge.id}, Source: ${source}, Target: ${target}`);
    console.log(`Source Exists: ${nodeIDSet.has(source)}, Target Exists: ${nodeIDSet.has(target)}`);

    // Check if source and target nodes exist in nodeIDSet
    const isValidEdge = nodeIDSet.has(source) && nodeIDSet.has(target);

    if (!isValidEdge) {
      console.warn(`Invalid Edge: ${edge.id}, Source Exists: ${nodeIDSet.has(source)}, Target Exists: ${nodeIDSet.has(target)}`);
    }

    return isValidEdge
      ? {
          data: {
            id: edge.id,
            source,
            target,
            label: edge.relationship || '', // Ensure label is set or an empty string
          }
        }
      : null;
  }).filter(edge => edge !== null);  // Filter out any invalid edges

  console.log("Valid Edges After Filtering:", edges);

  // Combine Nodes and Valid Edges for Cytoscape
  return [...maintenanceNodes, ...technicianNodes, ...scheduleNodes, ...aircraftNodes, ...edges];
};
