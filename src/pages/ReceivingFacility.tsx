import React, { useEffect, useState } from "react";
import "../css/ReceivingFacility.css"; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";

interface RequestStatus {
  request_no: number;
  no_of_items: number;
  total_qty: string;
  sending_engineer?: string;
  sending_manager?: string;
  receiving_engineer?: string;
  receiving_manager?: string;
  disposing_engineer?: string;
  disposing_manager?: string;
  sender_approval: "Yes" | "No";
  make_changes: "Yes" | "No";
  receiver_approval: "Yes" | "No";
  receiver_validated: "Yes" | "No";
  disposal_validated: "Yes" | "No";
  disposal_confirmation: "Yes" | "No";
}

const ReceivingFacility: React.FC = () => {
  const userName: string = localStorage.getItem("name") || "User";
  const facility: string = localStorage.getItem("facility") || "Logged Out";
  const [requestStatus, setRequestStatus] = useState<RequestStatus[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const fetchRequestStatus = async () => {
    try {
      const response = await axios.get<RequestStatus[]>(
        `http://localhost:8000/api/facility_status/${facility}/`
      );
      setRequestStatus(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  useEffect(() => {
    fetchRequestStatus();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  const validateManager = (request_no: number) => {
    navigate(`/rm-form/${request_no}`);
  };

  return (
    <div className="receiving-facility">
      {/* <nav className="navbar">
        <div className="navbar-left">
          <h1>Storage Facility</h1>
        </div>
        <div className="navbar-right">
          <button className="nav-button">Authorized Requests</button>
          <button className="nav-button">Logout</button>
        </div>
      </nav> */}
      <AppNavbar />
      <div className="main-content">
        <div className="welcome-message">
          <h1>Storage Facility</h1>
          <h2>Welcome Back, {userName}!</h2>
        </div>
        <div className="pending-requests">
          <h3>Pending Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Request Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requestStatus
                .filter(
                  (element) =>
                    element.receiver_approval === "No" &&
                    element.receiver_validated === "Yes"
                )
                .map((request, index) => (
                  <tr key={index}>
                    <td>{request.request_no}</td>
                    <td>
                      <button
                        className="status-button"
                        onClick={() => {
                          validateManager(request.request_no);
                        }}
                      >
                        Authorize
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

export default ReceivingFacility;
