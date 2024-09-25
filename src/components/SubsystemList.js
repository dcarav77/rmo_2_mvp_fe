import React from 'react';

const SubsystemList = ({ subsystems }) => {
  return (
    <ul>
      {subsystems.map(subsystem => (
        <li key={subsystem.id}>
          <p>Part Name: {subsystem.part_name || 'Unknown Part'}</p>
          <p>Part Condition: {subsystem.part_condition || 'Unknown'}</p>
          <p>Part Number: {subsystem.part_number || 'N/A'}</p>
          <p>Part Location: {subsystem.part_location || 'Unknown Location'}</p>
          <p>Repair Classification: {subsystem.repair_classification || 'N/A'}</p>
          {subsystem.repair_vendor ? <p>Repair Vendor: {subsystem.repair_vendor}</p> : null}
        </li>
      ))}
    </ul>
  );
};

export default SubsystemList;
