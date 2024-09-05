import React from 'react';
import './css/ReceivingEngineer.css'; // Import the CSS file for styling

// Define an interface for request objects
interface Request {
  bagId: string;
  status: 'Validate' | 'Pending' | 'Make Changes';
}

const ReceivingEngineer: React.FC = () => {
  const userName: string = "John Doe"; // Replace with dynamic user data as needed

  // Define the types of requests using the Request interface
  const requestsToBeValidated: Request[] = [
    { bagId: '1234', status: 'Validate' },
    { bagId: '5678', status: 'Validate' },
  ];

  const requestsToBeApproved: Request[] = [
    { bagId: '9876', status: 'Pending' },
    { bagId: '5432', status: 'Make Changes' },
  ];

  return (
    <div className="receiving-engineer">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>My Website</h1>
        </div>
        <div className="navbar-right">
          <button className="nav-button">Validated Requests</button>
          <button className="nav-button">Approved Requests</button>
          <button className="nav-button">Logout</button>
        </div>
      </nav>
      <div className="main-content">
        <div className="welcome-message">
          <h2>Welcome Back, {userName}!</h2>
        </div>
        <div className="pending-requests">
          <h3>Pending Requests</h3>
          <div className="requests-section">
            <table className="requests-table">
              <thead>
                <tr>
                  <th colSpan={2}>Requests to be Validated</th>
                </tr>
                <tr>
                  <th>Bag Identification Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requestsToBeValidated.map((request, index) => (
                  <tr key={index}>
                    <td>{request.bagId}</td>
                    <td>
                      <button className="validate-button">{request.status}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="requests-table">
              <thead>
                <tr>
                  <th colSpan={2}>Requests to be Approved</th>
                </tr>
                <tr>
                  <th>Bag Identification Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requestsToBeApproved.map((request, index) => (
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
    </div>
  );
};

export default ReceivingEngineer;
