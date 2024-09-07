import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./css/SmForm.css"; // Import the CSS file for styling

// Define an interface for a table row
interface Row {
  slNo: number;
  bagId: string;
  material: string;
  category: string;
  buildingNo: number;
  qty: number;
}

const SmForm: React.FC = () => {
  // State for form fields
  const [facility, setFacility] = useState<string>("");
  const [buildingNo, setBuildingNo] = useState<number>();
  const [unit, setUnit] = useState<string>("");
  const [dispatchDate, setDispatchDate] = useState<string>("");
  const [motorDetails, setMotorDetails] = useState<string>("");
  const [generatedNo, setGeneratedNo] = useState<number>(Math.floor(Math.random() * 10000));

  // State for rows in the table
  const [rows, setRows] = useState<Row[]>([]);
  const [editable, setEditable] = useState<boolean>(false);
  const [showRemarksModal, setShowRemarksModal] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<string>("");

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/form_details/1/");
        const data = response.data;

        // Initialize form data
        setFacility(data.facility_name);
        setBuildingNo(data.bldg_no);
        setUnit(data.unit);
        setDispatchDate(data.dispatch_date);
        setMotorDetails(data.segment_ref_no);
        setGeneratedNo(data.generated_no);
        setRows(data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index: number, field: keyof Row, value: string | number) => {
    if (editable) {
      const newRows = [...rows];
      (newRows[index][field] as string | number) = value;
      setRows(newRows);
    }
  };

  const calculateTotal = (): number => {
    return rows.reduce((total, row) => total + (row.qty || 0), 0);
  };

  const addRow = () => {
    const newRow: Row = {
      slNo: rows.length + 1,
      bagId: "",
      material: "",
      category: "",
      buildingNo: 0,
      qty: 0,
    };
    setRows([...rows, newRow]);
  };

  const submitRemarks = async () => {
    try {
      await axios.post("http://localhost:8000/api/submit_remarks/", { remarks });
      alert("Remarks submitted successfully!");
    } catch (error) {
      console.error("Error submitting remarks:", error);
    } finally {
      setShowRemarksModal(false);
    }
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSendBack = () => {
    setShowRemarksModal(true);
  };

  const handleAuthorize = async () => {
    try {
      await axios.post("http://localhost:8000/api/authorize_form/");
      alert("Form authorized successfully!");
    } catch (error) {
      console.error("Error authorizing form:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Solid Motor Propellant Complex</h1>
        <h4>Residual Propellant Management System</h4>
        <h4>
          <u>Residual Propellant Forwarding Note</u>
        </h4>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <p>
          <em>
            To <br /> Engineer <br /> in charge of disposal, storage, and
            residual propellant handling unit...
          </em>
        </p>
        <div className="w-1">
          <label>No.:</label>
          <input type="text" value={generatedNo} disabled />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-50">
          <div className="form-entry">
            <label>From Facility:</label>
            <select
              value={facility}
              onChange={(e) => editable && setFacility(e.target.value)}
              className="wide-input"
              disabled={!editable}
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
              onChange={(e) => editable && setBuildingNo(e.target.value ? Number(e.target.value) : 0)}
              className="half-width-input"
              disabled={!editable}
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
              onChange={(e) => editable && setDispatchDate(e.target.value)}
              className="wide-input"
              disabled={!editable}
            />
          </div>

          <div className="form-entry">
            <label>Segment/Motor Details:</label>
            <input
              type="text"
              value={motorDetails}
              onChange={(e) => editable && setMotorDetails(e.target.value)}
              className="wide-input"
              disabled={!editable}
            />
          </div>
        </div>
        <div className="w-50 d-flex justify-content-center align-items-center form-unit">
          <label className="mx-5">Unit:</label>
          <select
            value={unit}
            onChange={(e) => editable && setUnit(e.target.value)}
            className=""
            disabled={!editable}
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
              <td>
                <input
                  type="text"
                  value={row.bagId}
                  onChange={(e) => handleInputChange(index, "bagId", e.target.value)}
                  disabled={!editable}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.material}
                  onChange={(e) => handleInputChange(index, "material", e.target.value)}
                  disabled={!editable}
                />
              </td>
              <td>
                <select
                  value={row.category}
                  onChange={(e) => handleInputChange(index, "category", e.target.value)}
                  disabled={!editable}
                >
                  <option value="">Select Category</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={row.buildingNo}
                  onChange={(e) => handleInputChange(index, "buildingNo", e.target.value)}
                  disabled={!editable}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) => handleInputChange(index, "qty", parseFloat(e.target.value))}
                  disabled={!editable}
                />
              </td>
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
      <button className="btn btn-success add-btn" onClick={addRow} disabled={!editable}>
        +
      </button>

      <div className="form-note">
        <p>
          <strong>Note:</strong>
        </p>
        <ul>
          <li>Ensure material type is accurate.</li>
          <li>Follow proper storage protocol.</li>
        </ul>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center my-4">
        <Button variant="primary" onClick={handleEdit} className="mx-2">Edit</Button>
        <Button variant="warning" onClick={handleSendBack} className="mx-2">Send Back</Button>
        <Button variant="success" onClick={handleAuthorize} className="mx-2">Authorize</Button>
      </div>

      <Modal show={showRemarksModal} onHide={() => setShowRemarksModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Remarks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Remarks:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemarksModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={submitRemarks}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SmForm;
