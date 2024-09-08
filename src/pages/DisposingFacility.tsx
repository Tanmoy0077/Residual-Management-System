import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "../css/DisposingFacility.css";

interface Bag {
  sl_no: string;
  facility_name: string;
  bldg_no: number;
  unit: string;
  segment_ref_no: string;
  dispatch_date: string;
  bag_id_no: string;
  nature_material: string;
  waste_type: string;
  qty: number;
  disposed: boolean;
}

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

const DisposingFacility: React.FC = () => {
  const userName: string = localStorage.getItem("name") || "User";
  const facility: string = localStorage.getItem("facility") || "Logged Out";

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestStatus | null>(null);
  const [requestDetails, setRequestDetails] = useState<Bag[]>([]);
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
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleViewClick = (request: RequestStatus) => {
    setSelectedRequest(request);
    setShowModal(true);

    axios
      .get<Bag[]>(`http://localhost:8000/api/request-details/${request.request_no}/`)
      .then((response) => {
        setRequestDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching request details:", error);
      });
  };

  const toggleDisposed = (bagIndex: number) => {
    const updatedDetails = [...requestDetails];
    updatedDetails[bagIndex].disposed = !updatedDetails[bagIndex].disposed;

    const totalBags = updatedDetails.length;
    const disposedBags = updatedDetails.filter((bag) => bag.disposed).length;
    const updatedRequest = selectedRequest
      ? { ...selectedRequest, disposedQty: `${disposedBags}/${totalBags}` }
      : null;

    setRequestDetails(updatedDetails);
    setSelectedRequest(updatedRequest);
  };

  const handleSaveChanges = () => {
    if (selectedRequest) {
      const updatePromises = requestDetails.map((bag) =>
        axios.put(`http://localhost:8000/api/form_details/${bag.sl_no}/`, {
          disposed: bag.disposed,
        })
      );

      Promise.all(updatePromises)
        .then(() => {
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error saving changes:", error);
        });
    }
  };

  return (
    <div className="full-screen-container">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Disposing Facility</h1>
        </div>
        <div className="navbar-right">
          <button className="nav-button">Confirmed Requests</button>
          <button className="nav-button">Logout</button>
        </div>
      </nav>

      <div className="welcome-message">
        <h2>Welcome Back, {userName}</h2>
      </div>

      <div className="pending-requests">
        <h3>Pending Requests</h3>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request Number</th>
              <th>Disposed Qty</th>
              <th>Stocks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requestStatus
              .filter(
                (element) =>
                  element.disposal_validated === "Yes" &&
                  element.disposal_confirmation === "No"
              )
              .map((request, requestIndex) => {
               
                const totalBags = requestDetails.length;
                const disposedBags = requestDetails.filter((bag) => bag.disposed).length;
                const disposedQty = `${disposedBags}/${totalBags}`;
                const allBagsChecked = disposedBags === totalBags;

                return (
                  <tr key={requestIndex}>
                    <td>{request.request_no}</td>
                    <td>{disposedQty}</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleViewClick(request)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className="confirm-button"
                        disabled={!allBagsChecked}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Bag Details for {selectedRequest?.request_no}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="bags-table">
            <thead>
              <tr>
                <th>Bag No.</th>
                <th>Disposed</th>
              </tr>
            </thead>
            <tbody>
              {requestDetails.map((bag, bagIndex) => (
                <tr key={bag.sl_no}>
                  <td>{bag.bag_id_no}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={bag.disposed}
                      onChange={() => toggleDisposed(bagIndex)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DisposingFacility;
