// TicketD.tsx
import React from 'react';
import '../css/TicketD.css'; // Import the CSS file for styling

const TicketD: React.FC = () => {
  return (
    <div className="ticket-container">
      <div className="ticket">
        <p>
          <strong><em>Category-D:</em></strong> PROPELLANT CONTAMINATED WASTE (POLYTHENE/VELOSTAT/CLOTH/GLOVES)
        </p>
        
        <div className="ticket-details">
          <p>Date inspection:</p>
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

export default TicketD;
