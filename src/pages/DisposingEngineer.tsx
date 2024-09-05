import React, { useState } from 'react';
import '../css/DisposingEngineer.css'; // Import the CSS file for styling

// Interface for pending request row
interface PendingRequest {
  bagId: string;
  status: string;
}

const DisposingEngineer: React.FC = () => {
  const userName = 'John Doe'; // Replace with dynamic user name if needed

  // Sample pending requests data
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([
    { bagId: 'A001', status: 'Verify' },
    { bagId: 'A002', status: 'Verify' },
    { bagId: 'A003', status: 'Verify' },
  ]);

  // Handle the "Verify" button click for each row
  const handleVerify = (index: number) => {
    const newRequests = [...pendingRequests];
    newRequests[index].status = 'Verified';
    setPendingRequests(newRequests);
  };

  return (
    <div className="disposing-engineer">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1>My Website</h1>
        </div>
        <div className="navbar-right">
          <button className="nav-button">Verified Requests</button>
          <button className="nav-button">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="welcome-message">
          <h2>Welcome Back, {userName}</h2>
        </div>

        {/* Pending Requests Table */}
        <div className="pending-requests">
          <h3>Pending Requests</h3>
          <table className="requests-table">
            <thead>
              <tr>
                <th>Bag Identification Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.bagId}</td>
                  <td>
                    <button
                      className="verify-button"
                      onClick={() => handleVerify(index)}
                    >
                      {request.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisposingEngineer;
