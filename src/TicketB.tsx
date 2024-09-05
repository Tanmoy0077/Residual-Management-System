// TicketB.tsx
import React from 'react';
import './css/TicketB.css'; // Import the CSS file for styling

const TicketB: React.FC = () => {
  return (
    <div className="ticket-container">
      <div className="ticket">
        <p>
          <strong><em>Category-B:</em></strong> SHROUD DUST / CONTAMINATED Al POWDER / UNCURED PROPELLANT
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

export default TicketB;
