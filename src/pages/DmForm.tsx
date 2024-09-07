import React, { useState } from "react";
import "./css/DmForm.css"; // Import the CSS file for styling
import axios from "axios";

// Define an interface for a table row
interface Row {
  slNo: number;
  bagId: string;
  material: string;
  category: string;
  buildingNo: number;
  qty: number;
}

const DmForm: React.FC = () => {
  // State for form fields
  const [facility, setFacility] = useState<string>("");
  const [buildingNo, setBuildingNo] = useState<number>();
  const [unit, setUnit] = useState<string>("");
  const [dispatchDate, setDispatchDate] = useState<string>("");
  const [motorDetails, setMotorDetails] = useState<string>("");
  const [generatedNo, setGeneratedNo] = useState<number>(
    Math.floor(Math.random() * 10000)
  );

  // State for rows in the table
  const [rows, setRows] = useState<Row[]>([
    { slNo: 1, bagId: "", material: "", category: "", buildingNo: 0, qty: 0 },
    { slNo: 2, bagId: "", material: "", category: "", buildingNo: 0, qty: 0 },
    { slNo: 3, bagId: "", material: "", category: "", buildingNo: 0, qty: 0 },
  ]);

  // State for form edit mode
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // Function to handle adding a new row to the table
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

  // Function to handle input changes in the table rows
  const handleInputChange = (
    index: number,
    field: keyof Row,
    value: string | number
  ) => {
    const newRows = [...rows];
    (newRows[index][field] as string | number) = value;
    setRows(newRows);
  };

  // Function to calculate the total quantity
  const calculateTotal = (): number => {
    return rows.reduce((total, row) => total + (row.qty || 0), 0);
  };

  // Function to submit the form data via a POST request
  const submitForm = async () => {
    for (const row of rows) {
      const formData = {
        facility_name: facility,
        bldg_no: buildingNo,
        unit: unit,
        segment_ref_no: motorDetails,
        dispatch_date: dispatchDate,
        bag_id_no: row.bagId,
        nature_material: row.material,
        waste_type: row.category,
        qty: row.qty,
      };

      console.log(formData);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/form_details/",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          console.log("Server Response:", response.data);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          alert(
            `An error occurred: ${
              error.response.data.message || "Please try again later."
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

    alert("Form submitted successfully!");
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
        <div className="w-50 d-flex justify-content-center align-items-center form-unit">
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
              <td>
                <input
                  type="text"
                  value={row.bagId}
                  onChange={(e) =>
                    handleInputChange(index, "bagId", e.target.value)
                  }
                  disabled={!isEditable}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.material}
                  onChange={(e) =>
                    handleInputChange(index, "material", e.target.value)
                  }
                  disabled={!isEditable}
                />
              </td>
              <td>
                <select
                  value={row.category}
                  onChange={(e) =>
                    handleInputChange(index, "category", e.target.value)
                  }
                  disabled={!isEditable}
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
                  disabled={!isEditable}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) =>
                    handleInputChange(index, "qty", parseFloat(e.target.value))
                  }
                  disabled={!isEditable}
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
      <button className="add-btn" onClick={addRow} disabled={!isEditable}>
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
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" />
        </div>

        <h3>Storage Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" />
        </div>

        <h3>Disposing Facility</h3>
        <div className="signature-row">
          <label className="mx-3 my-3">Engineer:</label>
          <input className="mx-5 my-3" type="text" placeholder="Engineer Name and Date" />
          <label className="mx-3 my-3">Manager:</label>
          <input className="mx-5 my-3" type="text" placeholder="Manager Name and Date" />
        </div>

        <div className="form-actions">
          <button className="submit-button" onClick={() => setIsEditable(true)}>
            Edit
          </button>
          <button className="submit-button ml-3" onClick={submitForm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DmForm;
