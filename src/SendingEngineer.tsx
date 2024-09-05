import React from 'react';
import './css/SendingEngineer.css'; // Import the CSS file for styling

// Define the type for a pending request
interface PendingRequest {
  bagId: string;
  status: 'Pending' | 'Make changes'; // Restrict status to these two strings
}

const SendingEngineer: React.FC = () => {
  const userName: string = "John Doe"; // Replace this with dynamic user data

  const pendingRequests: PendingRequest[] = [
    { bagId: 'A001', status: 'Pending' },
    { bagId: 'A002', status: 'Make changes' },
    // Add more requests as needed
  ];

  return (
    <div className="sending-engineer">
      {/* Navigation bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1>My Website</h1>
        </div>
        <div className="navbar-right">
          <button className="nav-button">Approved Requests</button>
          <button className="nav-button">Logout</button>
        </div>
      </nav>

      {/* Welcome message and create new request button */}
      <div className="main-content">
        <div className="header-section">
          <h2 className="welcome-message">Welcome Back, {userName}!</h2>
          <button className="create-button">Create new request</button>
        </div>

        {/* Pending Requests table */}
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
                    {request.status === 'Pending' ? (
                      <button className="status-button pending-button">Pending</button>
                    ) : (
                      <button className="status-button changes-button">Make changes</button>
                    )}
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

export default SendingEngineer;
