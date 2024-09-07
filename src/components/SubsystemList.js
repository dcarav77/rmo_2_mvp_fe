import React from 'react';

const SubsystemList = ({ subsystems }) => {
  return (
    <ul>
      {subsystems.map(subsystem => (
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
  );
};

export default SubsystemList;
