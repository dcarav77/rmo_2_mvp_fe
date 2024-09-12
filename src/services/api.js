export const fetchTechnicalObjects = async () => {
    const response = await fetch('http://127.0.0.1:5000/technical_objects');
    const data = await response.json();
    console.log('Fetched Data:', data); 
    return data;
  };
  
  export const fetchSubsystems = async () => {
    const response = await fetch('http://127.0.0.1:5000/subsystems');
    const data = await response.json();
    console.log('Fetched Subsystems:', data); 
    return data;
};