import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import "./css/RmForm.css"; // Updated CSS file path

// Define an interface for a table row
interface Row {
  slNo: number;
  bagId: string;
  material: string;
  category: string;
  buildingNo: number;
  qty: number;
}

const RmForm: React.FC = () => {
  // State for form fields
  const [facility, setFacility] = useState<string>("");
  const [buildingNo, setBuildingNo] = useState<number>();
  const [unit, setUnit] = useState<string>(""); // State for Unit
  const [dispatchDate, setDispatchDate] = useState<string>("");
  const [motorDetails, setMotorDetails] = useState<string>("");
  const [generatedNo, setGeneratedNo] = useState<number>(
    Math.floor(Math.random() * 10000)
  ); // Generates a random number for "No."

  // State for rows in the table
  const [rows, setRows] = useState<Row[]>([]);
  const [showSendBackModal, setShowSendBackModal] = useState<boolean>(false);
  const [showAuthorizeModal, setShowAuthorizeModal] = useState<boolean>(false);
  const [remark, setRemark] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false); // State to manage edit mode

  // Fetch data from the database on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/api/form_details/')
      .then(response => {
        const data = response.data;
        setRows(data);
        // Set other states if needed
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to calculate the total quantity
  const calculateTotal = (): number => {
    return rows.reduce((total, row) => total + (row.qty || 0), 0);
  };

  // Handle modal show
  const handleShowSendBackModal = () => setShowSendBackModal(true);
  const handleCloseSendBackModal = () => setShowSendBackModal(false);

  const handleShowAuthorizeModal = () => setShowAuthorizeModal(true);
  const handleCloseAuthorizeModal = () => setShowAuthorizeModal(false);

  // Handle send back remark submission
  const handleSendBack = async () => {
    console.log("Send Back Remark:", remark);
    handleCloseSendBackModal();
    try {
      await axios.post('http://localhost:8000/api/send_back/', { remark });
      alert("Sent back successfully!");
    } catch (error) {
      console.error("Error sending back:", error);
    }
  };

  // Handle authorize remark submission
  const handleAuthorize = async () => {
    console.log("Authorize Remark:", remark);
    handleCloseAuthorizeModal();
    try {
      await axios.post('http://localhost:8000/api/authorize/', { remark });
      alert("Authorized successfully!");
    } catch (error) {
      console.error("Error authorizing:", error);
    }
  };

  // Handle form edit
  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="form-container">
      <div className="header-section text-center">
        <h1>Solid Motor Propellant Complex</h1>
        <h4>Residual Propellant Management System</h4>
        <h4>
          <u>Residual Propellant Forwarding Note</u>
        </h4>
      </div>

      <div className="info-section d-flex justify-content-between align-items-center">
        <p className="info-text">
          <em>
            To <br /> Engineer <br /> in charge of disposal, storage, and
            residual propellant handling unit...
          </em>
        </p>
        <div className="form-entry">
          <label>No.:</label>
          <input type="text" value={generatedNo} disabled />
        </div>
      </div>
      
      <div className="form-content d-flex justify-content-between align-items-center">
        <div className="form-fields w-50">
          <div className="form-entry">
            <label>From Facility:</label>
            <select
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              className="wide-input"
              disabled={!isEditable}
            >
              <option value="">Select Facility</option>
              <option value="Mixing Stations">Mixing Stations</option>
              <option value="ISPF">ISPF</option>
              <option value="CMTL">CMTL</option>
            </select>
          </div>

          <div className="form-entry">
            <label>Building No.:</label>
            <select
              value={buildingNo || ""}
              onChange={(e) =>
                setBuildingNo(e.target.value ? Number(e.target.value) : 0)
              }
              className="half-width-input"
              disabled={!isEditable}
            >
              <option value="">Select Building No.</option>
              <option value={101}>101</option>
              <option value={102}>102</option>
            </select>
          </div>

          <div className="form-entry">
            <label>Date of Dispatch:</label>
            <input
              type="date"
              value={dispatchDate}
              onChange={(e) => setDispatchDate(e.target.value)}
              className="wide-input"
              disabled={!isEditable}
            />
          </div>

          <div className="form-entry">
            <label>Segment/Motor Details:</label>
            <input
              type="text"
              value={motorDetails}
              onChange={(e) => setMotorDetails(e.target.value)}
              className="wide-input"
              disabled={!isEditable}
            />
          </div>
        </div>
        <div className="unit-select w-50 d-flex justify-content-center align-items-center">
          <label className="mx-5">Unit:</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className=""
            disabled={!isEditable}
          >
            <option value="">Select Unit</option>
            <option value="U1">U1</option>
            <option value="U2">U2</option>
          </select>
        </div>
      </div>

      <h5 className="my-3">Details of Material being sent</h5>
      <table className="material-table">
        <thead>
          <tr>
            <th>SL. NO.</th>
            <th>Bag Identification Number</th>
            <th>Nature of Material</th>
            <th>Category</th>
            <th>Building No.</th>
            <th>Qty. (kg)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.slNo}</td>
              <td>{row.bagId}</td>
              <td>{row.material}</td>
              <td>{row.category}</td>
              <td>{row.buildingNo}</td>
              <td>{row.qty}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} style={{ textAlign: "right", fontWeight: "bold" }}>
              Total Quantity
            </td>
            <td>{calculateTotal()}</td>
          </tr>
        </tbody>
      </table>

      <div className="form-note">
        <p>
          <strong>Note:</strong>
        </p>
        <ul>
          <li>Ensure material type is accurate.</li>
          <li>Follow proper storage protocol.</li>
        </ul>
      </div>

      <div className="signature-section d-flex flex-column justify-content-center align-items-center">
        <h3>Requesting Facility</h3>
        <div>
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" disabled={!isEditable} />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" disabled={!isEditable} />
        </div>

        <h3>Storage Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" disabled={!isEditable} />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" disabled={!isEditable} />
        </div>

        <h3>Disposing Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" disabled={!isEditable} />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" disabled={!isEditable} />
        </div>

        <div className="button-group">
          <Button className="btn btn-secondary mx-2" onClick={handleShowSendBackModal}>
            Send Back
          </Button>
          <Button className="btn btn-primary mx-2" onClick={handleShowAuthorizeModal}>
            Authorize
          </Button>
          <Button className="btn btn-warning mx-2" onClick={handleEdit}>
            {isEditable ? "Save" : "Edit"}
          </Button>
        </div>
      </div>

      {/* Send Back Remark Modal */}
      <Modal show={showSendBackModal} onHide={handleCloseSendBackModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Back Remark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter your remarks here..."
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSendBackModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendBack}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Authorize Remark Modal */}
      <Modal show={showAuthorizeModal} onHide={handleCloseAuthorizeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Authorize Remark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter your remarks here..."
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAuthorizeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAuthorize}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RmForm;