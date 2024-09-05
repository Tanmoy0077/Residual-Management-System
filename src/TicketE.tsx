// TicketE.tsx
import React from 'react';
import './css/TicketE.css'; // Import the CSS file for styling

const TicketE: React.FC = () => {
  return (
    <div className="ticket-container">
      <div className="ticket">
        <p>
          <strong><em>Category-E:</em></strong> POWDER CONTAMINATED WASTE (POLYTHENE/VELOSTAT/CLOTH/GLOVES)
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

export default TicketE;
