import React from 'react';
import '../css/ReceivingFacility.css'; // Import the CSS file for styling

// Define an interface for the request object
interface Request {
  bagId: string;
  status: 'Authorize';
}

const ReceivingFacility: React.FC = () => {
  const userName: string = "John Doe"; // This is a placeholder; replace with dynamic data as needed
  
  // Define the type of pending requests using the Request interface
  const pendingRequests: Request[] = [
    { bagId: '1234', status: 'Authorize' },
    { bagId: '5678', status: 'Authorize' },
  ];

  return (
    <div className="receiving-facility">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Storage Facility</h1>
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

export default ReceivingFacility;
