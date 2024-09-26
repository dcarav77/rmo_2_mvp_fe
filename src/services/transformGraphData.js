export const transformGraphData = (maintenanceEvents, technicians, schedules, aircraft) => {
    // Create maintenance nodes
    const maintenanceNodes = maintenanceEvents.map(event => ({
      data: {
        id: `maintenance_${event._key}`,
        label: event.description || 'Maintenance Event',
      }
    }));
  
    // Create technician nodes
    const technicianNodes = technicians.map(tech => ({
      data: {
        id: `technician_${tech._key}`,
        label: tech.name || 'Technician',
      }
    }));
  
    // Create schedule nodes
    const scheduleNodes = schedules.map(schedule => ({
      data: {
        id: `schedule_${schedule._key}`,
        label: `Schedule on ${schedule.date}`,
      }
    }));
  
    // Create aircraft nodes
    const aircraftNodes = aircraft.map(aircraftItem => ({
      data: {
        id: `aircraft_${aircraftItem._key}`,
        label: `Aircraft ${aircraftItem.registration_number}`,
      }
    }));
  
    // Create edges from ArangoDB data (as you described)
    const edges = [
      // Edge between maintenance and schedule
      {
        data: {
          id: 'maintenance_1-schedule_1',
          source: 'maintenance_maintenance_1',
          target: 'schedule_schedule_1',
          label: 'tracks'
        }
      },
      // Edge between aircraft and maintenance
      {
        data: {
          id: 'aircraft_1-maintenance_1',
          source: 'aircraft_aircraft_1',
          target: 'maintenance_maintenance_1',
          label: 'requires_maintenance'
        }
      },
      // Edge between maintenance and technician
      {
        data: {
          id: 'maintenance_1-technician_1',
          source: 'maintenance_maintenance_1',
          target: 'technician_technician_1',
          label: 'assigned_to'
        }
      }
    ];
  
    // Combine nodes and edges into a single array for Cytoscape
    return [...maintenanceNodes, ...technicianNodes, ...scheduleNodes, ...aircraftNodes, ...edges];
  };
  