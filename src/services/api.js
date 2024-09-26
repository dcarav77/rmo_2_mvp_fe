
// Fetch all parts from Flask API
export const fetchParts = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/parts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch parts');
    const data = await response.json();
    console.log('Fetched Parts:', data);
    return data;
  } catch (error) {
    console.error('Error fetching parts:', error);
    return [];
  }
};

// Fetch all aircraft from Flask API
export const fetchAircraft = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/aircraft', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch aircraft');
    const data = await response.json();
    console.log('Fetched Aircraft:', data);
    return data;
  } catch (error) {
    console.error('Error fetching aircraft:', error);
    return [];
  }
};

// Fetch all technicians from Flask API
export const fetchTechnicians = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/technician', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch technicians');
    const data = await response.json();
    console.log('Fetched Technicians:', data);
    return data;
  } catch (error) {
    console.error('Error fetching technicians:', error);
    return [];
  }
};

// Fetch all maintenance events from Flask API
export const fetchMaintenanceEvents = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/maintenance_event', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch maintenance events');
    const data = await response.json();
    console.log('Fetched Maintenance Events:', data);
    return data;
  } catch (error) {
    console.error('Error fetching maintenance events:', error);
    return [];
  }
};

// Fetch all schedules from Flask API
export const fetchSchedules = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/schedule', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch schedules');
    const data = await response.json();
    console.log('Fetched Schedules:', data);
    return data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return [];
  }
};

// Trigger maintenance check for aircraft from Flask API
export const triggerMaintenanceCheck = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/trigger_maintenance', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to trigger maintenance check');
    const data = await response.json();
    console.log('Triggered Maintenance Check:', data);
    return data;
  } catch (error) {
    console.error('Error triggering maintenance check:', error);
    return {};
  }
};
