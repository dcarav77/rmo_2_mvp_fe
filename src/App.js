import React, { useState } from 'react';
import './App.css'; // Optional: for adding styles


function App() {
    const [technicalObjects, setTechnicalObjects] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);  // To control if the data is fetched
  
    // Function to fetch the technical objects data
    const fetchTechnicalObjects = () => {
      fetch('http://127.0.0.1:5000/technical_objects')
        .then(response => response.json())
        .then(data => {
          console.log("Fetched data:", data);
          setTechnicalObjects(data);  // Set the fetched data
          setDataFetched(true);  // Update state to show that data has been fetched
        })
        .catch(error => console.error("Error fetching data:", error));
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Technical Objects</h1>
  
          {/* Button to fetch data */}
          <button onClick={fetchTechnicalObjects}>Fetch Technical Object Data</button>
  
          {/* Conditionally display data if fetched */}
          {dataFetched && technicalObjects.length > 0 && (
            <ul>
              {technicalObjects.map(obj => (
                <li key={obj.id}>
                  <h2>{obj.name} (Serial: {obj.serial_number})</h2>
                  <p>Status: {obj.status}</p>
                  <p>Last Maintenance Date: {obj.last_maintenance_date}</p>
                  <p>Next Maintenance Due: {obj.next_maintenance_due}</p>
                  <p>OEM Revision: {obj.current_oem_revision}</p>
                  <p>Compliance Status: {obj.revision_compliance_status}</p>
  
                  {/* Display subsystems if available */}
                  {obj.subsystems.length > 0 && (
                    <div>
                      <h3>Subsystems:</h3>
                      <ul>
                        {obj.subsystems.map(subsystem => (
                          <li key={subsystem.id}>
                            <p>Name: {subsystem.name}</p>
                            <p>Status: {subsystem.status}</p>
                            <p>Part Number: {subsystem.part_number}</p>
                            <p>Location: {subsystem.location}</p>
                            <p>Repair Classification: {subsystem.repair_classification}</p>
                            {subsystem.repair_vendor && <p>Repair Vendor: {subsystem.repair_vendor}</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </header>
      </div>
    );
  }
  
  export default App;
