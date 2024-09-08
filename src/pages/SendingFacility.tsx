import React, { useEffect, useState } from "react";
import "../css/SendingFacility.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  disposal_validated: "Yes" | "No";
  disposal_confirmation: "Yes" | "No";
}

const SendingFacility: React.FC = () => {
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

  const authorizeManager = (request_no: number) => {
    navigate(`/sm-form/${request_no}`);
  };

  if(error){
    console.log(error)
  }

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
                <th>Request Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requestStatus
                .filter((el) => el.make_changes === "No" && el.sender_approval === 'No')
                .map((request, index) => (
                  <tr key={index}>
                    <td>{request.request_no}</td>
                    <td>
                      <button
                        className="status-button"
                        onClick={() => authorizeManager(request.request_no)}
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

export default SendingFacility;
