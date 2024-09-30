import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Table } from "react-bootstrap";
import "../css/ReForm.css"; // Updated CSS file path
import { useNavigate, useParams } from "react-router-dom";

interface Row {
  slNo: number;
  bagId: string;
  material: string;
  category: string;
  buildingNo: number;
  qty: number;
}


const ReForm: React.FC = () => {
  const name: string = localStorage.getItem("name") || "User";
  const date = new Date();
  const day = date.getDay();
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
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sending_engineer, setSendingEngineer] = useState<string>("");
  const [sending_manager, setSendingManager] = useState<string>("");
  const [isFirstEffectComplete, setIsFirstEffectComplete] = useState(false);
  // const [bagNo, setBagNo] = useState<string>("");
  // const [existingBags, setExistingBags] = useState<string[]>([]);

  // Fetch data from the database on component mount
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
        let sm = "";
        console.log(engineer_response);
        for(let r of engineer_response.data){
          if(r.request_no == request_no){
            se = r.sending_engineer;
            sm = r.sending_manager;
            console.log(se);
          }
        }
        setSendingEngineer(se);
        setSendingManager(sm);
        console.log(sending_engineer);
        console.log(sending_manager);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setNames();
  }, [isFirstEffectComplete]);



  // Function to calculate the total quantity
  const calculateTotal = (): number => {
    return rows.reduce((total, row) => total + (row.qty || 0), 0);
  };

  // Handle modal show
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle form validation
  const validateApproval = async () => {
    try {
      const receiver_validated: string = "Yes";
      await axios.put(
        `http://localhost:8000/api/request_status/${request_no}/`,
        { receiver_validated }
      );

      await axios.put(`http://localhost:8000/api/request_status/${request_no}/`,
         { receiving_engineer: sign });
      alert("Form validated successfully!");
      navigate("/receiving-engineer");
    } catch (error) {
      console.error("Error authorizing form:", error);
    }
  };

  const [enteredBagNos, setEnteredBagNos] = useState<string[]>(
    Array(rows.length).fill("")
  );

  const handleInputChange = (index: number, value: string) => {
    const newEnteredBagNos = [...enteredBagNos];
    newEnteredBagNos[index] = value;
    setEnteredBagNos(newEnteredBagNos);
  };

  const handleBagNoSubmit = () => {
    let allMatch = true;

    for (let i = 0; i < rows.length; i++) {
      if (enteredBagNos[i] !== rows[i].bagId) {
        allMatch = false;
        break;
      }
    }

    if (allMatch) {
      alert("All Bag IDs match!");
      handleCloseModal();
      validateApproval();
    } else {
      alert("Bag IDs do not match!");
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

      <div className="info-section d-flex justify-content-between align-items-center">
        <p className="info-text">
          <em>
            To <br /> Engineer <br /> in charge of disposal, storage, and
            residual propellant handling unit...
          </em>
        </p>
        <div className="form-entry">
          <label>No.:</label>
          <input type="text" value={request_no} disabled />
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
              disabled
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
              disabled
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
              disabled
            />
          </div>

          <div className="form-entry">
            <label>Segment/Motor Details:</label>
            <input
              type="text"
              value={motorDetails}
              onChange={(e) => setMotorDetails(e.target.value)}
              className="wide-input"
              disabled
            />
          </div>
        </div>
        <div className="unit-select w-50 d-flex justify-content-center align-items-center">
          <label className="mx-5">Unit:</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className=""
            disabled
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
          <input
            className="mx-5 my-3"
            type="text"
            placeholder="Engineer Name and Date"
            value={sending_engineer}
            disabled
          />
          <label className="mx-3 my-3">Manager:</label>
          <input
            className="mx-5 my-3"
            type="text"
            placeholder="Manager Name and Date"
            value={sending_manager}
            disabled
          />
        </div>

        <h3>Storage Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input
            className="mx-5 my-3"
            type="text"
            placeholder="Engineer Name and Date"
            value={sign}
            disabled
          />
          <label className="mx-3 my-3">Manager:</label>
          <input
            className="mx-5 my-3"
            type="text"
            placeholder="Manager Name and Date"
            disabled
          />
        </div>

        <h3>Disposing Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input
            className="mx-5 my-3"
            type="text"
            placeholder="Engineer Name and Date"
            disabled
          />
          <label className="mx-3 my-3">Manager:</label>
          <input
            className="mx-5 my-3"
            type="text"
            placeholder="Manager Name and Date"
            disabled
          />
        </div>

        <div className="button-group mt-3">
          <Button variant="success" onClick={handleShowModal}>
            Validate
          </Button>
        </div>
      </div>

      {/* Updated Modal for entering Bag No. */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Bag No.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            {/* Existing Bag No. Column */}
            <div className="w-100 me-3">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Bag No.</th>
                    <th>Enter Bag No.</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((bag, index) => (
                    <tr key={index}>
                      <td>{bag.bagId}</td>
                      <td>
                        <input
                          type="text"
                          value={enteredBagNos[index]}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          placeholder="Enter Bag No."
                          className="form-control"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBagNoSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReForm;
