import React, { useState } from 'react';
import '../src/styles/App.css';
import TechnicalObjectList from './components/TechnicalObjectList';
import { fetchTechnicalObjects } from './services/api';

function App() {
  const [technicalObjects, setTechnicalObjects] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const handleFetchData = async () => {
    const data = await fetchTechnicalObjects();
    setTechnicalObjects(data);
    setDataFetched(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Technical Objects</h1>
        <button onClick={handleFetchData}>Fetch Technical Object Data</button>
        {dataFetched && <TechnicalObjectList technicalObjects={technicalObjects} />}
      </header>
    </div>
  );
}

export default App;
