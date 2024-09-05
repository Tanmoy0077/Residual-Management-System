// TicketC.tsx
import React from 'react';
import '../css/TicketC.css'; // Import the CSS file for styling

const TicketC: React.FC = () => {
  return (
    <div className="ticket-container">
      <div className="ticket">
        <p>
          <strong><em>Category-C:</em></strong> EXPLOSIVE POWDERS (CONTAMINATED AP POWDER/ AP RESIDUE FROM EVAPORATION POND)
        </p>
        
        <div className="ticket-details">
          <p>Date of inspection:</p>
          <p>Segment reference no. :</p>
          <p>Nature of material:</p>
          <p>Facility bag id no.:</p>
          <p>Approx. Quantity (kg):</p>
        </div>
        
        <div className="ticket-footer">
          <p>Facility</p>
          <p>Safety</p>
        </div>
      </div>
    </div>
  );
}

export default TicketC;
