import React, { useState } from 'react';
import './css/ResidualPropellantForm.css'; // Import the CSS file for styling

// Define an interface for a table row
interface Row {
  slNo: number;
  bagId: string;
  material: string;
  category: string;
  buildingNo: string;
  qty: number;
}

const ResidualPropellantForm: React.FC = () => {
  // State for form fields
  const [facility, setFacility] = useState<string>('');
  const [buildingNo, setBuildingNo] = useState<string>('');
  const [dispatchDate, setDispatchDate] = useState<string>('');
  const [motorDetails, setMotorDetails] = useState<string>('');
  const [rows, setRows] = useState<Row[]>([
    { slNo: 1, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
    { slNo: 2, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
    { slNo: 3, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
    { slNo: 4, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
    { slNo: 5, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
  ]);

  // Function to handle adding a new row to the table
  const addRow = () => {
    const newRow: Row = { slNo: rows.length + 1, bagId: '', material: '', category: '', buildingNo: '', qty: 0 };
    setRows([...rows, newRow]);
  };

  // Function to handle input changes in the table rows
  const handleInputChange = (index: number, field: keyof Row, value: string | number) => {
    const newRows = [...rows];
    (newRows[index][field] as string | number) = value; // Use type assertion to allow assignment
    setRows(newRows);
  };

  // Function to calculate the total quantity
  const calculateTotal = (): number => {
    return rows.reduce((total, row) => total + (row.qty || 0), 0);
  };

  // Function to download the form data
  const downloadForm = () => {
    const formData = {
      facility,
      buildingNo,
      dispatchDate,
      motorDetails,
      rows,
      totalQuantity: calculateTotal(),
    };

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ResidualPropellantForwardingNote.txt';
    link.click();
  };

  return (
    <div className="form-container">
      <h1>Residual Propellant Forwarding Note</h1>
      {/* Form entries */}
      <div className="form-entry">
        <label>From Facility:</label>
        <select value={facility} onChange={(e) => setFacility(e.target.value)}>
          <option value="">Select Facility</option>
          <option value="Facility 1">Facility 1</option>
          <option value="Facility 2">Facility 2</option>
        </select>
      </div>

      <div className="form-entry">
        <label>Building No.:</label>
        <select value={buildingNo} onChange={(e) => setBuildingNo(e.target.value)}>
          <option value="">Select Building No.</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
        </select>
      </div>

      <div className="form-entry">
        <label>Date of Dispatch:</label>
        <input type="date" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} />
      </div>

      <div className="form-entry">
        <label>Segment/Motor Details:</label>
        <input type="text" value={motorDetails} onChange={(e) => setMotorDetails(e.target.value)} />
      </div>

      {/* Table for Material Details */}
      <h3>Details of Material being sent</h3>
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
                  onChange={(e) => handleInputChange(index, 'bagId', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.material}
                  onChange={(e) => handleInputChange(index, 'material', e.target.value)}
                />
              </td>
              <td>
                <select value={row.category} onChange={(e) => handleInputChange(index, 'category', e.target.value)}>
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
                  onChange={(e) => handleInputChange(index, 'buildingNo', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) => handleInputChange(index, 'qty', parseFloat(e.target.value))}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Quantity</td>
            <td>{calculateTotal()}</td>
          </tr>
        </tbody>
      </table>

      {/* Button to add a new row */}
      <button className="add-row-button" onClick={addRow}>+</button>

      {/* Submit and download button */}
      <div className="form-actions">
        <button className="submit-button" onClick={downloadForm}>Submit</button>
      </div>
    </div>
  );
};

export default ResidualPropellantForm;

