import React from 'react';
import '../css/SendingFacility.css'; // Import the CSS file for styling

// Define a type for a pending request
interface PendingRequest {
  bagId: string;
  status: 'Authorize'; // Restrict status to the string 'Authorize'
}

const SendingFacility: React.FC = () => {
  const userName: string = "John Doe"; // Replace with dynamic user data as needed
  
  // Define the type of `pendingRequests` array using the `PendingRequest` interface
  const pendingRequests: PendingRequest[] = [
    { bagId: '1234', status: 'Authorize' },
    { bagId: '5678', status: 'Authorize' },
  ];

  return (
    <div className="sending-facility">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Requesting Facility</h1>
        </div>
        <div className="navbar-right">
          <button className="nav-button">Authorized Requests</button>
          <button className="nav-button">Logout</button>
        </div>
      </nav>
      <div className="main-content">
        <div className="welcome-message">
          <h2>Welcome Back, {userName}!</h2>
        </div>
        <div className="pending-requests">
          <h3>Pending Requests</h3>
          <table>
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
                    <button className="status-button">{request.status}</button>
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

export default SendingFacility;
