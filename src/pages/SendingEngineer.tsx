import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SendingEngineer.css";
import axios from "axios";
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
  disposal_confirmation: "Yes" | "No";
}

const SendingEngineer: React.FC = () => {
  const userName: string = localStorage.getItem("name") || "User";
  const facility: string = localStorage.getItem("facility") || "Logged Out";
  const [requestStatus, setRequestStatus] = useState<RequestStatus[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  }, [facility]);

  const navigate = useNavigate();

  const createRequest = () => {
    navigate(`/create-form`);
  };

  return (
    <div className="sending-engineer">
      <AppNavbar />
      <div className="main-content">
        <div className="header-section">
          <h2 className="welcome-message">Welcome Back, {userName}!</h2>
          <button className="create-button" onClick={createRequest}>
            Create new request
          </button>
        </div>

        <div className="pending-requests">
          <h3>Pending Requests</h3>
          {requestStatus.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Request Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requestStatus.map((request, index) => (
                  <tr key={index}>
                    <td>{request.request_no}</td>
                    <td>
                      {request.make_changes === "No" ? (
                        <button className="status-button pending-button">
                          Pending
                        </button>
                      ) : (
                        <button className="status-button changes-button">
                          Make changes
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendingEngineer;
