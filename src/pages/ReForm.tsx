// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button } from 'react-bootstrap';
// import "./css/ReForm.css"; // Updated CSS file path

// // Define an interface for a table row
// interface Row {
//   slNo: number;
//   bagId: string;
//   material: string;
//   category: string;
//   buildingNo: number;
//   qty: number;
// }

// const ReForm: React.FC = () => {
//   // State for form fields
//   const [facility, setFacility] = useState<string>("");
//   const [buildingNo, setBuildingNo] = useState<number>();
//   const [unit, setUnit] = useState<string>(""); // State for Unit
//   const [dispatchDate, setDispatchDate] = useState<string>("");
//   const [motorDetails, setMotorDetails] = useState<string>("");
//   const [generatedNo, setGeneratedNo] = useState<number>(
//     Math.floor(Math.random() * 10000)
//   ); // Generates a random number for "No."

//   // State for rows in the table
//   const [rows, setRows] = useState<Row[]>([]);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [bagNo, setBagNo] = useState<string>("");

//   // Fetch data from the database on component mount
//   useEffect(() => {
//     axios.get('http://localhost:8000/api/form_details/')
//       .then(response => {
//         const data = response.data;
//         setRows(data);
//         // Set other states if needed
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   // Function to calculate the total quantity
//   const calculateTotal = (): number => {
//     return rows.reduce((total, row) => total + (row.qty || 0), 0);
//   };

//   // Handle modal show
//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   // Handle bag number submission
//   const handleBagNoSubmit = () => {
//     console.log("Bag No Submitted:", bagNo);
//     handleCloseModal();
//   };

//   // Handle form validation
//   const handleValidate = () => {
//     console.log("Form Validated");
//   };

//   return (
//     <div className="form-container">
//       <div className="header-section text-center">
//         <h1>Solid Motor Propellant Complex</h1>
//         <h4>Residual Propellant Management System</h4>
//         <h4>
//           <u>Residual Propellant Forwarding Note</u>
//         </h4>
//       </div>

//       <div className="info-section d-flex justify-content-between align-items-center">
//         <p className="info-text">
//           <em>
//             To <br /> Engineer <br /> in charge of disposal, storage, and
//             residual propellant handling unit...
//           </em>
//         </p>
//         <div className="form-entry">
//           <label>No.:</label>
//           <input type="text" value={generatedNo} disabled />
//         </div>
//       </div>
      
//       <div className="form-content d-flex justify-content-between align-items-center">
//         <div className="form-fields w-50">
//           <div className="form-entry">
//             <label>From Facility:</label>
//             <select
//               value={facility}
//               onChange={(e) => setFacility(e.target.value)}
//               className="wide-input"
//               disabled
//             >
//               <option value="">Select Facility</option>
//               <option value="Mixing Stations">Mixing Stations</option>
//               <option value="ISPF">ISPF</option>
//               <option value="CMTL">CMTL</option>
//             </select>
//           </div>

//           <div className="form-entry">
//             <label>Building No.:</label>
//             <select
//               value={buildingNo || ""}
//               onChange={(e) =>
//                 setBuildingNo(e.target.value ? Number(e.target.value) : 0)
//               }
//               className="half-width-input"
//               disabled
//             >
//               <option value="">Select Building No.</option>
//               <option value={101}>101</option>
//               <option value={102}>102</option>
//             </select>
//           </div>

//           <div className="form-entry">
//             <label>Date of Dispatch:</label>
//             <input
//               type="date"
//               value={dispatchDate}
//               onChange={(e) => setDispatchDate(e.target.value)}
//               className="wide-input"
//               disabled
//             />
//           </div>

//           <div className="form-entry">
//             <label>Segment/Motor Details:</label>
//             <input
//               type="text"
//               value={motorDetails}
//               onChange={(e) => setMotorDetails(e.target.value)}
//               className="wide-input"
//               disabled
//             />
//           </div>
//         </div>
//         <div className="unit-select w-50 d-flex justify-content-center align-items-center">
//           <label className="mx-5">Unit:</label>
//           <select
//             value={unit}
//             onChange={(e) => setUnit(e.target.value)}
//             className=""
//             disabled
//           >
//             <option value="">Select Unit</option>
//             <option value="U1">U1</option>
//             <option value="U2">U2</option>
//           </select>
//         </div>
//       </div>

//       <h5 className="my-3">Details of Material being sent</h5>
//       <table className="material-table">
//         <thead>
//           <tr>
//             <th>SL. NO.</th>
//             <th>Bag Identification Number</th>
//             <th>Nature of Material</th>
//             <th>Category</th>
//             <th>Building No.</th>
//             <th>Qty. (kg)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               <td>{row.slNo}</td>
//               <td>{row.bagId}</td>
//               <td>{row.material}</td>
//               <td>{row.category}</td>
//               <td>{row.buildingNo}</td>
//               <td>{row.qty}</td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan={5} style={{ textAlign: "right", fontWeight: "bold" }}>
//               Total Quantity
//             </td>
//             <td>{calculateTotal()}</td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="form-note">
//         <p>
//           <strong>Note:</strong>
//         </p>
//         <ul>
//           <li>Ensure material type is accurate.</li>
//           <li>Follow proper storage protocol.</li>
//         </ul>
//       </div>

//       <div className="signature-section d-flex flex-column justify-content-center align-items-center">
//         <h3>Requesting Facility</h3>
//         <div>
//           <label className="mx-3 my-3">Engineer:</label>
//           <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" disabled />
//           <label className="mx-3 my-3">Manager:</label>
//           <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" disabled />
//         </div>

//         <h3>Storage Facility</h3>
//         <div className="signature-row">
//           <label className="mx-3 my-3">Engineer:</label>
//           <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" disabled />
//           <label className="mx-3 my-3">Manager:</label>
//           <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" disabled />
//         </div>

//         <h3>Disposing Facility</h3>
//         <div className="signature-row">
//           <label className="mx-3 my-3">Engineer:</label>
//           <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" disabled />
//           <label className="mx-3 my-3">Manager:</label>
//           <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" disabled />
//         </div>

//         <div className="button-group mt-3">
//           <Button variant="primary" onClick={handleShowModal}>
//             Enter Bag No.
//           </Button>
//           <Button variant="success" onClick={handleValidate}>
//             Validate
//           </Button>
//         </div>
//       </div>

//       {/* Modal for entering Bag No. */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Enter Bag No.</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input
//             type="text"
//             value={bagNo}
//             onChange={(e) => setBagNo(e.target.value)}
//             placeholder="Enter Bag No."
//             className="form-control"
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleBagNoSubmit}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ReForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table } from 'react-bootstrap';
import "../css/ReForm.css"; // Updated CSS file path

// Define an interface for a table row
interface Row {
  slNo: number;
  bagId: string;
  material: string;
  category: string;
  buildingNo: number;
  qty: number;
}

const ReForm: React.FC = () => {
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bagNo, setBagNo] = useState<string>("");
  const [existingBags, setExistingBags] = useState<string[]>([]);

  // Fetch data from the database on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/api/form_details/')
      .then(response => {
        const data = response.data;
        setRows(data);
        // Extract existing bag numbers from the response if applicable
        const bagNumbers = data.map((row: Row) => row.bagId);
        setExistingBags(bagNumbers);
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
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle bag number submission
  const handleBagNoSubmit = () => {
    console.log("Bag No Submitted:", bagNo);
    handleCloseModal();
  };

  // Handle form validation
  const handleValidate = () => {
    console.log("Form Validated");
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
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" disabled />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" disabled />
        </div>

        <h3>Storage Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" disabled />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" disabled />
        </div>

        <h3>Disposing Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" disabled />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" disabled />
        </div>

        <div className="button-group mt-3">
          <Button variant="primary" onClick={handleShowModal}>
            Enter Bag No.
          </Button>
          <Button variant="success" onClick={handleValidate}>
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
            <div className="w-50 me-3">
              <h5>Existing Bag No.</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Bag No.</th>
                  </tr>
                </thead>
                <tbody>
                  {existingBags.map((bag, index) => (
                    <tr key={index}>
                      <td>{bag}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Type Bag No. Column */}
            <div className="w-50 ms-3">
              <h5>Type Bag No.</h5>
              <input
                type="text"
                value={bagNo}
                onChange={(e) => setBagNo(e.target.value)}
                placeholder="Enter Bag No."
                className="form-control"
              />
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

