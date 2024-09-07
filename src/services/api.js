export const fetchTechnicalObjects = async () => {
    const response = await fetch('http://127.0.0.1:5000/technical_objects');
    const data = await response.json();
    return data;
  };
  