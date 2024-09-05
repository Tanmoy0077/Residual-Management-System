// TicketA.tsx
import React from 'react';
import './css/TicketA.css';  // Import the CSS file for styling

const TicketA: React.FC = () => {
  return (
    <div className="ticket-container">
      <div className="ticket">
        <p>
          <strong><em>Category-A:</em></strong> PROPELLANT (CURED/WATER WETTED/SPILL TRAY(FM)/AGNI CUT PIECES/ROCASIN/NEOPRENE/TEFLON WITH PROPELLANT)
        </p>
        
        <div className="ticket-details">
          <p>Date of inspection:</p>
          <p>Segment reference no.:</p>
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

export default TicketA;
