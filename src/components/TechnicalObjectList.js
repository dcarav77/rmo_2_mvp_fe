import React from 'react';

const TechnicalObjectList = ({ technicalObjects }) => {
    // Helper function to format date
    const formatDate = (dateStr) => {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    if (!Array.isArray(technicalObjects)) {
      return <p>No technical objects available</p>;
    }
  
    return (
        <ul>
          {technicalObjects.map((obj) => (
            <li key={obj.id}>
              <h2>Aircraft: {obj.aircraft_make}</h2>
              <p>Control Number: {obj.control_number || 'N/A'}</p>
              <p>Status: {obj.status}</p>
              <p>Difficulty Date: {formatDate(obj.difficulty_date)}</p>  {/* Formatted Date */}
              <p>Next Maintenance Due: {formatDate(obj.next_maintenance_due)}</p>  {/* Formatted Date */}
              <p>OEM Revision: {obj.current_oem_revision}</p>
              <p>Compliance Status: {obj.revision_compliance_status || 'N/A'}</p>
            </li>
          ))}
        </ul>
      );
};

  
  
export default TechnicalObjectList;
