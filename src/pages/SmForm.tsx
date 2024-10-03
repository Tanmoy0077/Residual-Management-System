import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../css/SmForm.css";

interface Row {
  slNo: number;
  bagId: string;
  material: string;
  category: string;
  buildingNo: number;
  qty: number;
}

interface FormDetailsData {
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

interface RequestStatusData {
  request_no: string;
  facility_name: string;
  no_of_items: number;
  total_qty: number;
  sending_engineer: string;
  sender_approval: string;
  receiver_approval: string;
  disposal_validated: string;
  disposal_confirmation: string;
}

const SmForm: React.FC = () => {
  const name: string = localStorage.getItem("name") || "User";
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const full_date = ` ${day}-${month}-${year}`;
  const sign = name + full_date;
  const { request_no } = useParams<{ request_no: string }>();
  const [facility, setFacility] = useState<string>("");
  const [buildingNo, setBuildingNo] = useState<number>();
  const [unit, setUnit] = useState<string>("");
  const [dispatchDate, setDispatchDate] = useState<string>("");
  const [motorDetails, setMotorDetails] = useState<string>("");
  const [rows, setRows] = useState<Row[]>([]);
  const [editable, setEditable] = useState<boolean>(false);
  const [showRemarksModal, setShowRemarksModal] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<string>("");
  const navigate = useNavigate();
  const [sending_engineer, setSendingEngineer] = useState<string>("");
  const [isFirstEffectComplete, setIsFirstEffectComplete] = useState(false);

  useEffect(() => {
    if (!request_no) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/request-details/${request_no}/`
        );

        const data = response.data;

        if (Array.isArray(data)) {
          setFacility(data[0].facility_name || "");
          setBuildingNo(data[0].bldg_no || 0);
          setUnit(data[0].unit || "");
          setDispatchDate(data[0].dispatch_date || "");
          setMotorDetails(data[0].segment_ref_no || "");

          const formattedRows = data.map((item: any) => ({
            slNo: item.sl_no.split("-")[1],
            bagId: item.bag_id_no,
            material: item.nature_material,
            category: item.waste_type,
            buildingNo: item.bldg_no,
            qty: Number.parseFloat(item.qty),
            disposed: false
          }));
          setRows(formattedRows);
        }
        setIsFirstEffectComplete(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [request_no]);

  useEffect(() => {
    if (!isFirstEffectComplete) return;

    const setNames = async () => {
      try {
        const engineer_response = await axios.get(`http://localhost:8000/api/facility_status/${facility}/`);
        let se = "";
        for(let r of engineer_response.data){
          if(r.request_no == request_no){
            se = r.sending_engineer;
          }
        }
        setSendingEngineer(se);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setNames();
  }, [isFirstEffectComplete]);

  const handleInputChange = (
    index: number,
    field: keyof Row,
    value: string | number
  ) => {
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
      await axios.post("http://localhost:8000/api/remarks/", {
        request_no,
        remarks,
      });
      console.log("Remarks sent");
      const make_changes: string = "Yes";
      await axios.put(
        `http://localhost:8000/api/request_status/${request_no}/`,
        { make_changes }
      );
      console.log("Status sent");
      alert("Remarks submitted successfully!");
      navigate("/sending-manager");
    } catch (error) {
      console.error("Error submitting remarks:", error);
    } finally {
      setShowRemarksModal(false);
    }
  };

  const makePostRequest = async () => {
    const requestData: RequestStatusData = {
      request_no: request_no || "",
      facility_name: facility,
      no_of_items: rows.length,
      total_qty: calculateTotal(),
      sending_engineer: localStorage.getItem("name") || "User",
      sender_approval: "No",
      receiver_approval: "No",
      disposal_validated: "No",
      disposal_confirmation: "No",
    };
    console.log(requestData);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/request_status/${request_no}/`,
        requestData
      );

      if (response.status === 200) {
        console.log("Post Request Success:", response.data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert(
          `An error occurred: ${error.response.data.message || "Please try again later."
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response received from the server. Please try again.");
      } else {
        console.error("Error setting up the request:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleSave = async () => {
    await makePostRequest();
    console.log("Updated status");
    const requestNo = request_no;
    for (const row of rows) {
      const slNo = `${requestNo}-${row.slNo}`;

      const formData: FormDetailsData = {
        sl_no: slNo,
        facility_name: facility,
        bldg_no: buildingNo || 0,
        unit: unit,
        segment_ref_no: motorDetails,
        dispatch_date: dispatchDate,
        bag_id_no: row.bagId,
        nature_material: row.material,
        waste_type: row.category,
        qty: row.qty,
        disposed: false
      };
      console.log(formData);

      try {
        const response = await axios.put(
          `http://localhost:8000/api/form_details/${slNo}/`,
          formData
        );

        if (response.status === 200) {
          console.log("Server Response:", response.data);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          alert(
            `An error occurred: ${error.response.data.message || "Please try again later."
            }`
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("No response received from the server. Please try again.");
        } else {
          console.error("Error setting up the request:", error.message);
          alert(`Error: ${error.message}`);
        }
        return;
      }
    }
    alert("Form updated successfully!");
    navigate("/sending-manager");
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSendBack = () => {
    setShowRemarksModal(true);
  };

  const handleAuthorize = async () => {
    try {
      const sender_approval: string = "Yes";
      await axios.put(
        `http://localhost:8000/api/request_status/${request_no}/`,
        { sender_approval }
      );
      await axios.put(`http://localhost:8000/api/request_status/${request_no}/`, {sending_manager: sign});
      alert("Form authorized successfully!");
      navigate("/sending-manager");
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
          <input type="text" value={request_no} disabled />
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
              value={buildingNo ?? ""}
              onChange={(e) =>
                editable &&
                setBuildingNo(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="half-width-input"
              disabled={!editable}
            >
              <option value="">Select Building No.</option>
              {/* Optionally populate these options dynamically if needed */}
              <option value={101}>101</option>
              <option value={102}>102</option>
              {/* Add more options if needed */}
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
                  onChange={(e) =>
                    handleInputChange(index, "bagId", e.target.value)
                  }
                  disabled={!editable}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.material}
                  onChange={(e) =>
                    handleInputChange(index, "material", e.target.value)
                  }
                  disabled={!editable}
                />
              </td>
              <td>
                <select
                  value={row.category}
                  onChange={(e) =>
                    handleInputChange(index, "category", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleInputChange(index, "buildingNo", e.target.value)
                  }
                  disabled={!editable}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) =>
                    handleInputChange(index, "qty", parseFloat(e.target.value))
                  }
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
      <button
        className="btn btn-success add-btn"
        onClick={addRow}
        disabled={!editable}
      >
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

      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3>Requesting Facility</h3>
        <div>
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" value={sending_engineer} readOnly />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" value={sign} readOnly/>
        </div>

        <h3>Storage Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" />
        </div>

        {/* Disposing Facility section */}
        <h3>Disposing Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" />
        </div>
      </div>

      <div className="d-flex flex-row justify-content-center align-items-center my-4">
        {editable ? (
          <>
            <Button
              variant="primary"
              onClick={handleSave}
              className="mx-2"
              style={{ width: "120px" }}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => setEditable(false)}
              className="mx-2"
              style={{ width: "120px" }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              onClick={handleEdit}
              className="mx-2"
              style={{ width: "120px" }}
            >
              Edit
            </Button>
            <Button
              variant="warning"
              onClick={handleSendBack}
              className="mx-2"
              style={{ width: "120px" }}
            >
              Send Back
            </Button>
            <Button
              variant="success"
              onClick={handleAuthorize}
              className="mx-2"
              style={{ width: "120px" }}
            >
              Authorize
            </Button>
          </>
        )}
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
          <Button
            variant="secondary"
            onClick={() => setShowRemarksModal(false)}
          >
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
