import React from 'react';
import './css/DisposingFacility.css'; // Import the CSS file for styling

// Define an interface for the request objects
interface Request {
  bagId: string;
  status: 'Verify' | 'Confirm'; // Status can be either 'Verify' or 'Confirm'
}

const DisposingFacility: React.FC = () => {
  const userName: string = "John Doe"; // Replace with dynamic user data as needed

  // Define the types of requests using the Request interface
  const requestsToBeVerified: Request[] = [
    { bagId: 'A001', status: 'Verify' },
    { bagId: 'A002', status: 'Verify' },
  ];

  const requestsToBeConfirmed: Request[] = [
    { bagId: 'B001', status: 'Confirm' },
    { bagId: 'B002', status: 'Confirm' },
  ];

  return (
    <div className="disposing-facility">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>My Website</h1>
        </div>
        <div className="navbar-right">
          <button className="nav-button">Verified Requests</button>
          <button className="nav-button">Confirmed Requests</button>
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
                  <th colSpan={2}>Requests to be Verified</th>
                </tr>
                <tr>
                  <th>Bag Identification Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requestsToBeVerified.map((request, index) => (
                  <tr key={index}>
                    <td>{request.bagId}</td>
                    <td>
                      <button className="verify-button">{request.status}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="requests-table">
              <thead>
                <tr>
                  <th colSpan={2}>Requests to be Confirmed</th>
                </tr>
                <tr>
                  <th>Bag Identification Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requestsToBeConfirmed.map((request, index) => (
                  <tr key={index}>
                    <td>{request.bagId}</td>
                    <td>
                      <button className="confirm-button">{request.status}</button>
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

export default DisposingFacility;
