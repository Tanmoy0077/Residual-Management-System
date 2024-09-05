import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../css/DisposingFacility.css';

interface Bag {
  bagNo: string;
  disposed: boolean;
}

interface Request {
  requestNo: string;
  disposedQty: string;  // Format: 'X/Y' (e.g., '7/10')
  bags: Bag[];
}

const DisposingFacility: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([
    {
      requestNo: 'Request 1',
      disposedQty: '7/10',
      bags: [
        { bagNo: 'Bag 1', disposed: true },
        { bagNo: 'Bag 2', disposed: true },
        { bagNo: 'Bag 3', disposed: false },
        { bagNo: 'Bag 4', disposed: false },
        { bagNo: 'Bag 5', disposed: true },
        { bagNo: 'Bag 6', disposed: true },
        { bagNo: 'Bag 7', disposed: false },
        { bagNo: 'Bag 8', disposed: false },
        { bagNo: 'Bag 9', disposed: false },
        { bagNo: 'Bag 10', disposed: false },
      ],
    },
    {
      requestNo: 'Request 2',
      disposedQty: '4/8',
      bags: [
        { bagNo: 'Bag 1', disposed: true },
        { bagNo: 'Bag 2', disposed: false },
        { bagNo: 'Bag 3', disposed: true },
        { bagNo: 'Bag 4', disposed: false },
        { bagNo: 'Bag 5', disposed: false },
        { bagNo: 'Bag 6', disposed: false },
        { bagNo: 'Bag 7', disposed: false },
        { bagNo: 'Bag 8', disposed: false },
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleViewClick = (request: Request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const toggleDisposed = (requestIndex: number, bagIndex: number) => {
    const updatedRequests = [...requests];
    updatedRequests[requestIndex].bags[bagIndex].disposed = !updatedRequests[requestIndex].bags[bagIndex].disposed;

    // Update the disposed quantity (X/Y) for the request
    const totalBags = updatedRequests[requestIndex].bags.length;
    const disposedBags = updatedRequests[requestIndex].bags.filter(bag => bag.disposed).length;
    updatedRequests[requestIndex].disposedQty = `${disposedBags}/${totalBags}`;

    setRequests(updatedRequests);
  };

  return (
    <div className="full-screen-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Disposing Facility</h1>
        </div>
        <div className="navbar-right">
          <button className="nav-button">Confirmed Requests</button>
          <button className="nav-button">Logout</button>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="welcome-message">
        <h2>Welcome Back, John Doe</h2>
      </div>

      {/* Pending Requests Table */}
      <div className="pending-requests">
        <h3>Pending Requests</h3>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request Number</th>
              <th>Disposed Qty (kg)</th>
              <th>Stocks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, requestIndex) => (
              <tr key={requestIndex}>
                <td>{request.requestNo}</td>
                <td>{request.disposedQty}</td>
                <td>
                  <button className="view-button" onClick={() => handleViewClick(request)}>
                    View
                  </button>
                </td>
                <td>
                  <button
                    className="confirm-button"
                    disabled={request.disposedQty !== `${request.bags.length}/${request.bags.length}`}
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Bag Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bag Details for {selectedRequest?.requestNo}</Modal.Title>
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
              {selectedRequest?.bags.map((bag, bagIndex) => (
                <tr key={bagIndex}>
                  <td>{bag.bagNo}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={bag.disposed}
                      onChange={() =>
                        toggleDisposed(
                          requests.findIndex(req => req.requestNo === selectedRequest.requestNo),
                          bagIndex
                        )
                      }
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
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DisposingFacility;