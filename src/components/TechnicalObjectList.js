import React from 'react';

const TechnicalObjectList = ({ technicalObjects }) => {
  return (
    <ul>
      {technicalObjects.map(obj => (
        <li key={obj.id}>
          <h2>{obj.name} (Serial: {obj.serial_number})</h2>
          <p>Status: {obj.status}</p>
          <p>Last Maintenance Date: {obj.last_maintenance_date}</p>
          <p>Next Maintenance Due: {obj.next_maintenance_due}</p>
          <p>OEM Revision: {obj.current_oem_revision}</p>
          <p>Compliance Status: {obj.revision_compliance_status}</p>
        </li>
      ))}
    </ul>
  );
};

export default TechnicalObjectList;
