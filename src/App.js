import React, { useState } from 'react';
import '../src/styles/App.css';
import TechnicalObjectList from './components/TechnicalObjectList';
import SubsystemList from './components/SubsystemList';
import { fetchTechnicalObjects, fetchSubsystems  } from './services/api';

function App() {
  const [technicalObjects, setTechnicalObjects] = useState([]);
  const [subsystems, setSubsystems] = useState([]); 
  const [dataFetched, setDataFetched] = useState(false);

  const handleFetchData = async () => {
    const data = await fetchTechnicalObjects();
    const subsystemsData = await fetchSubsystems();
    
    console.log('Technical Objects:', data);
    setTechnicalObjects(data);
    setSubsystems(subsystemsData);
    setDataFetched(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Technical Objects and Subsystems</h1>
        <button onClick={handleFetchData}>Fetch Data</button>
        {dataFetched && (
          <>
            <TechnicalObjectList technicalObjects={technicalObjects} />
            <SubsystemList subsystems={subsystems} /> {/* Render SubsystemList */}
          </>
        )}
      </header>
    </div>
  );
}

export default App;