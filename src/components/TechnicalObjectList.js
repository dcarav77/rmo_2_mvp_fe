import React from 'react';

const TechnicalObjectList = ({ technicalObjects }) => {
  // Helper function to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  if (!Array.isArray(technicalObjects) || technicalObjects.length === 0) {
    return <p>No technical objects available</p>;
  }

  return (
    <ul>
      {technicalObjects.map((obj) => (
        <li key={obj.id}>
          <h2>Aircraft: {obj.aircraft_make || 'Unknown Make'}</h2>
          <p>Model: {obj.aircraft_model || 'Unknown Model'}</p> {/* Added line to show aircraft model */}
          <p>Control Number: {obj.control_number}</p>
          <p>
            Difficulty Date:{' '}
            {obj.difficulty_date
              ? new Date(obj.difficulty_date).toLocaleDateString()
              : 'N/A'}
          </p>
          <p>
            Next Maintenance Due:{' '}
            {obj.next_maintenance_due
              ? formatDate(obj.next_maintenance_due)
              : 'N/A'}
          </p>
          <p>
            Compliance Status: {obj.revision_compliance_status || 'N/A'}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TechnicalObjectList;
