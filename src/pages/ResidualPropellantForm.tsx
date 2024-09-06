// import React, { useState } from 'react';
// import '../css/ResidualPropellantForm.css'; // Import the CSS file for styling

// // Define an interface for a table row
// interface Row {
//   slNo: number;
//   bagId: string;
//   material: string;
//   category: string;
//   buildingNo: string;
//   qty: number;
// }

// const ResidualPropellantForm: React.FC = () => {
//   // State for form fields
//   const [facility, setFacility] = useState<string>('');
//   const [buildingNo, setBuildingNo] = useState<string>('');
//   const [dispatchDate, setDispatchDate] = useState<string>('');
//   const [motorDetails, setMotorDetails] = useState<string>('');
//   const [rows, setRows] = useState<Row[]>([
//     { slNo: 1, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
//     { slNo: 2, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
//     { slNo: 3, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
//     { slNo: 4, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
//     { slNo: 5, bagId: '', material: '', category: '', buildingNo: '', qty: 0 },
//   ]);

//   // Function to handle adding a new row to the table
//   const addRow = () => {
//     const newRow: Row = { slNo: rows.length + 1, bagId: '', material: '', category: '', buildingNo: '', qty: 0 };
//     setRows([...rows, newRow]);
//   };

//   // Function to handle input changes in the table rows
//   const handleInputChange = (index: number, field: keyof Row, value: string | number) => {
//     const newRows = [...rows];
//     (newRows[index][field] as string | number) = value; // Use type assertion to allow assignment
//     setRows(newRows);
//   };

//   // Function to calculate the total quantity
//   const calculateTotal = (): number => {
//     return rows.reduce((total, row) => total + (row.qty || 0), 0);
//   };

//   // Function to download the form data
//   const downloadForm = () => {
//     const formData = {
//       facility,
//       buildingNo,
//       dispatchDate,
//       motorDetails,
//       rows,
//       totalQuantity: calculateTotal(),
//     };

//     const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'text/plain;charset=utf-8' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'ResidualPropellantForwardingNote.txt';
//     link.click();
//   };

//   return (
//     <div className="form-container">
//       <h1>Residual Propellant Forwarding Note</h1>
//       {/* Form entries */}
//       <div className="form-entry">
//         <label>From Facility:</label>
//         <select value={facility} onChange={(e) => setFacility(e.target.value)}>
//           <option value="">Select Facility</option>
//           <option value="Facility 1">Facility 1</option>
//           <option value="Facility 2">Facility 2</option>
//         </select>
//       </div>

//       <div className="form-entry">
//         <label>Building No.:</label>
//         <select value={buildingNo} onChange={(e) => setBuildingNo(e.target.value)}>
//           <option value="">Select Building No.</option>
//           <option value="B1">B1</option>
//           <option value="B2">B2</option>
//         </select>
//       </div>

//       <div className="form-entry">
//         <label>Date of Dispatch:</label>
//         <input type="date" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} />
//       </div>

//       <div className="form-entry">
//         <label>Segment/Motor Details:</label>
//         <input type="text" value={motorDetails} onChange={(e) => setMotorDetails(e.target.value)} />
//       </div>

//       {/* Table for Material Details */}
//       <h3>Details of Material being sent</h3>
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
//               <td>
//                 <input
//                   type="text"
//                   value={row.bagId}
//                   onChange={(e) => handleInputChange(index, 'bagId', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.material}
//                   onChange={(e) => handleInputChange(index, 'material', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <select value={row.category} onChange={(e) => handleInputChange(index, 'category', e.target.value)}>
//                   <option value="">Select Category</option>
//                   <option value="A">A</option>
//                   <option value="B">B</option>
//                   <option value="C">C</option>
//                   <option value="D">D</option>
//                   <option value="E">E</option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.buildingNo}
//                   onChange={(e) => handleInputChange(index, 'buildingNo', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={row.qty}
//                   onChange={(e) => handleInputChange(index, 'qty', parseFloat(e.target.value))}
//                 />
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan={5} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Quantity</td>
//             <td>{calculateTotal()}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Button to add a new row */}
//       <button className="add-row-button" onClick={addRow}>+</button>

//       {/* Submit and download button */}
//       <div className="form-actions">
//         <button className="submit-button" onClick={downloadForm}>Submit</button>
//       </div>
//     </div>
//   );
// };

// export default ResidualPropellantForm;

// import React, { useState } from 'react';
// import '../css/ResidualPropellantForm.css'; // Import the CSS file for styling
// import axios from 'axios';

// // Define an interface for a table row
// interface Row {
//   slNo: number;
//   bagId: string;
//   material: string;
//   category: string;
//   buildingNo: number;
//   qty: number;
// }

// const ResidualPropellantForm: React.FC = () => {
//   // State for form fields
//   const [facility, setFacility] = useState<string>('');
//   const [buildingNo, setBuildingNo] = useState<number>();
//   const [unit, setUnit] = useState<string>(''); // State for Unit
//   const [dispatchDate, setDispatchDate] = useState<string>('');
//   const [motorDetails, setMotorDetails] = useState<string>('');
//   const [rows, setRows] = useState<Row[]>([
//     { slNo: 1, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
//     { slNo: 2, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
//     { slNo: 3, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
//     { slNo: 4, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
//     { slNo: 5, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
//   ]);

//   // Function to handle adding a new row to the table
//   const addRow = () => {
//     const newRow: Row = { slNo: rows.length + 1, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 };
//     setRows([...rows, newRow]);
//   };

//   // Function to handle input changes in the table rows
//   const handleInputChange = (index: number, field: keyof Row, value: string | number) => {
//     const newRows = [...rows];
//     (newRows[index][field] as string | number) = value; // Use type assertion to allow assignment
//     setRows(newRows);
//   };

//   // Function to calculate the total quantity
//   const calculateTotal = (): number => {
//     return rows.reduce((total, row) => total + (row.qty || 0), 0);
//   };

//   // Function to submit the form data via a POST request
//   const submitForm = async () => {
//     // Loop through each row and send individual requests
//     for (const row of rows) {
//       const formData = {
//         facility_name: facility,         // Maps to facility_name in Django model
//         bldg_no: buildingNo,             // Maps to bldg_no in Django model (ForeignKey)
//         unit: unit,                      // Maps to unit in Django model (choices)
//         segment_ref_no: motorDetails,    // Maps to segment_ref_no in Django model
//         dispatch_date: dispatchDate,     // Maps to dispatch_date in Django model
//         bag_id_no: row.bagId,            // Maps to bag_id_no in Django model
//         nature_material: row.material,   // Maps to nature_material in Django model
//         waste_type: row.category,        // Maps to waste_type in Django model (choices)
//         qty: row.qty,                    // Maps to qty in Django model
//       };

//       console.log(formData);

//       try {
//         const response = await axios.post('http://localhost:8000/api/form_details/', formData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.status === 201) {  // Assuming the API returns 201 for successful creation
//           console.log('Server Response:', response.data);
//         } else {
//           console.error('Error:', response.statusText);
//         }
//       } catch (error: any) {
//         if (error.response) {
//           console.error('Server Error:', error.response.data);
//           alert(`An error occurred: ${error.response.data.message || 'Please try again later.'}`);
//         } else if (error.request) {
//           console.error('No response received:', error.request);
//           alert('No response received from the server. Please try again.');
//         } else {
//           console.error('Error setting up the request:', error.message);
//           alert(`Error: ${error.message}`);
//         }
//         return;  // Exit loop if any error occurs
//       }
//     }

//     alert('Form submitted successfully!');
//   };


//   return (
//     <div className="form-container">
//       <h1>Residual Propellant Forwarding Note</h1>
//       {/* Form entries */}
//       <div className="form-entry">
//         <label>From Facility:</label>
//         <select value={facility} onChange={(e) => setFacility(e.target.value)}>
//           <option value="">Select Facility</option>
//           <option value="Mixing Stations">Mixing Stations</option>
//           <option value="ISPF">ISPF</option>
//           <option value="CMTL">CMTL</option>
//         </select>
//       </div>

//       <div className="form-entry">
//         <label>Building No.:</label>
//         <select
//           value={buildingNo || ""}
//           onChange={(e) => setBuildingNo(e.target.value ? Number(e.target.value) : 0)}
//         >
//           <option value="">Select Building No.</option>
//           <option value={101}>101</option>
//           <option value={102}>102</option>
//         </select>
//       </div>


//       {/* New Unit field beside Building No. */}
//       <div className="form-entry">
//         <label>Unit:</label>
//         <select value={unit} onChange={(e) => setUnit(e.target.value)}>
//           <option value="">Select Unit</option>
//           <option value="U1">U1</option>
//           <option value="U2">U2</option>
//         </select>
//       </div>

//       <div className="form-entry">
//         <label>Date of Dispatch:</label>
//         <input type="date" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} />
//       </div>

//       <div className="form-entry">
//         <label>Segment/Motor Details:</label>
//         <input type="text" value={motorDetails} onChange={(e) => setMotorDetails(e.target.value)} />
//       </div>

//       {/* Table for Material Details */}
//       <h3>Details of Material being sent</h3>
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
//               <td>
//                 <input
//                   type="text"
//                   value={row.bagId}
//                   onChange={(e) => handleInputChange(index, 'bagId', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.material}
//                   onChange={(e) => handleInputChange(index, 'material', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <select value={row.category} onChange={(e) => handleInputChange(index, 'category', e.target.value)}>
//                   <option value="">Select Category</option>
//                   <option value="A">A</option>
//                   <option value="B">B</option>
//                   <option value="C">C</option>
//                   <option value="D">D</option>
//                   <option value="E">E</option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.buildingNo}
//                   onChange={(e) => handleInputChange(index, 'buildingNo', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={row.qty}
//                   onChange={(e) => handleInputChange(index, 'qty', parseFloat(e.target.value))}
//                 />
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan={5} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Quantity</td>
//             <td>{calculateTotal()}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Button to add a new row */}
//       <button className="add-row-button" onClick={addRow}>+</button>

//       {/* Submit button */}
//       <div className="form-actions">
//         <button className="submit-button" onClick={submitForm}>Submit</button>
//       </div>
//     </div>
//   );
// };

// export default ResidualPropellantForm;

// import React, { useState } from 'react';
// import '../css/ResidualPropellantForm.css'; // Import the CSS file for styling
// import axios from 'axios';

// // Define an interface for a table row
// interface Row {
//   slNo: number;
//   bagId: string;
//   material: string;
//   category: string;
//   buildingNo: number;
//   qty: number;
// }

// const ResidualPropellantForm: React.FC = () => {
//   // State for form fields
//   const [facility, setFacility] = useState<string>('');
//   const [buildingNo, setBuildingNo] = useState<number>();
//   const [unit, setUnit] = useState<string>(''); // State for Unit
//   const [dispatchDate, setDispatchDate] = useState<string>('');
//   const [motorDetails, setMotorDetails] = useState<string>('');
//   const [generatedNo, setGeneratedNo] = useState<number>(Math.floor(Math.random() * 10000)); // Generates a random number for "No."

//   // State for rows in the table
//   const [rows, setRows] = useState<Row[]>([
//     { slNo: 1, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
//     { slNo: 2, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
//     { slNo: 3, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
//   ]);

//   // Function to handle adding a new row to the table
//   const addRow = () => {
//     const newRow: Row = { slNo: rows.length + 1, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 };
//     setRows([...rows, newRow]);
//   };

//   // Function to handle input changes in the table rows
//   const handleInputChange = (index: number, field: keyof Row, value: string | number) => {
//     const newRows = [...rows];
//     (newRows[index][field] as string | number) = value; // Use type assertion to allow assignment
//     setRows(newRows);
//   };

//   // Function to calculate the total quantity
//   const calculateTotal = (): number => {
//     return rows.reduce((total, row) => total + (row.qty || 0), 0);
//   };

//   // Function to submit the form data via a POST request
//   const submitForm = async () => {
//     // Loop through each row and send individual requests
//     for (const row of rows) {
//       const formData = {
//         facility_name: facility,         // Maps to facility_name in Django model
//         bldg_no: buildingNo,             // Maps to bldg_no in Django model (ForeignKey)
//         unit: unit,                      // Maps to unit in Django model (choices)
//         segment_ref_no: motorDetails,    // Maps to segment_ref_no in Django model
//         dispatch_date: dispatchDate,     // Maps to dispatch_date in Django model
//         bag_id_no: row.bagId,            // Maps to bag_id_no in Django model
//         nature_material: row.material,   // Maps to nature_material in Django model
//         waste_type: row.category,        // Maps to waste_type in Django model (choices)
//         qty: row.qty,                    // Maps to qty in Django model
//       };

//       console.log(formData);

//       try {
//         const response = await axios.post('http://localhost:8000/api/form_details/', formData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.status === 201) {
//           console.log('Server Response:', response.data);
//         } else {
//           console.error('Error:', response.statusText);
//         }
//       } catch (error: any) {
//         if (error.response) {
//           console.error('Server Error:', error.response.data);
//           alert(`An error occurred: ${error.response.data.message || 'Please try again later.'}`);
//         } else if (error.request) {
//           console.error('No response received:', error.request);
//           alert('No response received from the server. Please try again.');
//         } else {
//           console.error('Error setting up the request:', error.message);
//           alert(`Error: ${error.message}`);
//         }
//         return;  // Exit loop if any error occurs
//       }
//     }

//     alert('Form submitted successfully!');
//   };

//   return (
//     <div className="form-container">
//       {/* Main heading */}
//       <h1 className="center-text">Solid Motor Propellant Complex</h1>
//       <h2 className="center-text">Residual Propellant Management System</h2>
//       <h3 className="center-text smaller-font">Residual Propellant Forwarding Note</h3>

//       {/* "No." field in the right corner */}
//       <div className="form-no right-align">
//         <label>No.:</label>
//         <input type="text" value={generatedNo} disabled />
//       </div>

//       {/* Note to Engineer in italics */}
//       <p className="italic-text">To Engineer in charge of disposal, storage, and residual propellant handling unit...</p>

//       {/* Form entries */}
//       <div className="form-entry">
//         <label>From Facility:</label>
//         <select value={facility} onChange={(e) => setFacility(e.target.value)} className="wide-input">
//           <option value="">Select Facility</option>
//           <option value="Mixing Stations">Mixing Stations</option>
//           <option value="ISPF">ISPF</option>
//           <option value="CMTL">CMTL</option>
//         </select>
//       </div>

//       {/* Building No. and Unit on the same level */}
//       <div className="form-entry">
//         <label>Building No.:</label>
//         <select
//           value={buildingNo || ""}
//           onChange={(e) => setBuildingNo(e.target.value ? Number(e.target.value) : 0)}
//           className="half-width-input"
//         >
//           <option value="">Select Building No.</option>
//           <option value={101}>101</option>
//           <option value={102}>102</option>
//         </select>

//         {/* Unit field on the same row */}
//         <label>Unit:</label>
//         <select value={unit} onChange={(e) => setUnit(e.target.value)} className="half-width-input">
//           <option value="">Select Unit</option>
//           <option value="U1">U1</option>
//           <option value="U2">U2</option>
//         </select>
//       </div>

//       <div className="form-entry">
//         <label>Date of Dispatch:</label>
//         <input type="date" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} className="wide-input" />
//       </div>

//       <div className="form-entry">
//         <label>Segment/Motor Details:</label>
//         <input type="text" value={motorDetails} onChange={(e) => setMotorDetails(e.target.value)} className="wide-input" />
//       </div>

//       {/* Table for Material Details */}
//       <h3>Details of Material being sent</h3>
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
//               <td>
//                 <input
//                   type="text"
//                   value={row.bagId}
//                   onChange={(e) => handleInputChange(index, 'bagId', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.material}
//                   onChange={(e) => handleInputChange(index, 'material', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <select value={row.category} onChange={(e) => handleInputChange(index, 'category', e.target.value)}>
//                   <option value="">Select Category</option>
//                   <option value="A">A</option>
//                   <option value="B">B</option>
//                   <option value="C">C</option>
//                   <option value="D">D</option>
//                   <option value="E">E</option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.buildingNo}
//                   onChange={(e) => handleInputChange(index, 'buildingNo', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={row.qty}
//                   onChange={(e) => handleInputChange(index, 'qty', parseFloat(e.target.value))}
//                 />
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan={5} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Quantity</td>
//             <td>{calculateTotal()}</td>
//           </tr>
//         </tbody>
//       </table>
//       {/* Plus sign to add more rows */}
//       <button className="add-row-button" onClick={addRow}>+</button>

//       {/* Notes section */}
//       <div className="form-note">
//         <p><strong>Note:</strong></p>
//         <ul>
//           <li>Ensure material type is accurate.</li>
//           <li>Follow proper storage protocol.</li>
//         </ul>
//       </div>

//       {/* Requesting Facility section */}
//       <h3>Requesting Facility</h3>
//       <div className="signature-row">
//         <label>Engineer:</label>
//         <input type="text" placeholder="Engineer Name and Date" />
//         <label>Manager:</label>
//         <input type="text" placeholder="Manager Name and Date" />
//       </div>

//       {/* Storage Facility section */}
//       <h3>Storage Facility</h3>
//       <div className="signature-row">
//         <label>Engineer:</label>
//         <input type="text" placeholder="Engineer Name and Date" />
//         <label>Manager:</label>
//         <input type="text" placeholder="Manager Name and Date" />
//       </div>

//       {/* Disposing Facility section */}
//       <h3>Disposing Facility</h3>
//       <div className="signature-row">
//         <label>Engineer:</label>
//         <input type="text" placeholder="Engineer Name and Date" />
//         <label>Manager:</label>
//         <input type="text" placeholder="Manager Name and Date" />
//       </div>

//       {/* Submit button */}
//       <button className="submit-button" onClick={submitForm}>Submit</button>
//     </div>
//   );
// };

// export default ResidualPropellantForm;

// import React, { useState } from 'react';
// import '../css/ResidualPropellantForm.css';

// const ResidualPropellantForm: React.FC = () => {
//   const [facility, setFacility] = useState<string>('');
//   const [buildingNo, setBuildingNo] = useState<number>();
//   const [unit, setUnit] = useState<string>('');
//   const [dispatchDate, setDispatchDate] = useState<string>('');
//   const [motorDetails, setMotorDetails] = useState<string>('');
//   const [generatedNo, setGeneratedNo] = useState<number>(Math.floor(Math.random() * 10000));

//   return (
//     <div className="form-container">
//       {/* Centered Main Heading */}
//       <h1 className="center-text">Solid Motor Propellant Complex</h1>
//       <h2 className="center-text">Residual Propellant Management System</h2>
//       <h3 className="center-text smaller-font">Residual Propellant Forwarding Note</h3>

//       {/* "No." field aligned to right */}
//       <div className="form-no right-align">
//         <label>No.:</label>
//         <input type="text" value={generatedNo} disabled />
//       </div>

//       {/* Italics for the "To Engineer" part */}
//       <p className="italic-text">To Engineer in charge of disposal, storage, and residual propellant handling unit...</p>

//       {/* Form fields - All aligned */}
//       <div className="form-entry">
//         <label>From Facility:</label>
//         <select value={facility} onChange={(e) => setFacility(e.target.value)} className="wide-input">
//           <option value="">Select Facility</option>
//           <option value="Mixing Stations">Mixing Stations</option>
//           <option value="ISPF">ISPF</option>
//           <option value="CMTL">CMTL</option>
//         </select>
//       </div>

//       {/* Building No. and Unit aligned side by side */}
//       <div className="form-entry row">
//         <label className="half-width-label">Building No.:</label>
//         <select
//           value={buildingNo || ""}
//           onChange={(e) => setBuildingNo(e.target.value ? Number(e.target.value) : 0)}
//           className="half-width-input"
//         >
//           <option value="">Select Building No.</option>
//           <option value={101}>101</option>
//           <option value={102}>102</option>
//         </select>

//         {/* Unit on the same row but right aligned */}
//         <label className="unit-label">Unit:</label>
//         <select value={unit} onChange={(e) => setUnit(e.target.value)} className="unit-input">
//           <option value="">Select Unit</option>
//           <option value="U1">U1</option>
//           <option value="U2">U2</option>
//         </select>
//       </div>

//       <div className="form-entry">
//         <label>Date of Dispatch:</label>
//         <input type="date" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} className="wide-input" />
//       </div>

//       <div className="form-entry">
//         <label>Segment/Motor Details:</label>
//         <input type="text" value={motorDetails} onChange={(e) => setMotorDetails(e.target.value)} className="wide-input" />
//       </div>

//       {/* Table Section */}
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
//           {/* Add rows dynamically based on user input */}
//           <tr>
//             <td>1</td>
//             <td><input type="text" /></td>
//             <td><input type="text" /></td>
//             <td>
//               <select>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
//                 <option value="D">D</option>
//                 <option value="E">E</option>
//               </select>
//             </td>
//             <td><input type="text" /></td>
//             <td><input type="number" /></td>
//           </tr>
//           {/* Add more rows as needed */}
//         </tbody>
//       </table>
//       {/* Add row button */}
//       <button className="add-row-btn">+</button>

//       {/* Note section */}
//       <div className="note-section">
//         <p>Note:</p>
//         <ul>
//           <li>Any additional rows can be added by the user.</li>
//           <li>The total quantity will be calculated after inputting all rows.</li>
//         </ul>
//       </div>

//       {/* Requesting Facility section */}
//       <h3 className="center-text">Requesting Facility</h3>
//       <div className="signature-row">
//         <label className="corner-label">Engineer:</label>
//         <input type="text" placeholder="Engineer Name and Date" className="corner-input" />
//         <label className="corner-label">Manager:</label>
//         <input type="text" placeholder="Manager Name and Date" className="corner-input" />
//       </div>

//       {/* Storage Facility section */}
//       <h3 className="center-text">Storage Facility</h3>
//       <div className="signature-row">
//         <label className="corner-label">Engineer:</label>
//         <input type="text" placeholder="Engineer Name and Date" className="corner-input" />
//         <label className="corner-label">Manager:</label>
//         <input type="text" placeholder="Manager Name and Date" className="corner-input" />
//       </div>

//       {/* Disposing Facility section */}
//       <h3 className="center-text">Disposing Facility</h3>
//       <div className="signature-row">
//         <label className="corner-label">Engineer:</label>
//         <input type="text" placeholder="Engineer Name and Date" className="corner-input" />
//         <label className="corner-label">Manager:</label>
//         <input type="text" placeholder="Manager Name and Date" className="corner-input" />
//       </div>

//       {/* Submit button */}
//       <button className="submit-button">Submit</button>
//     </div>
//   );
// };

// export default ResidualPropellantForm;



// import React, { useState } from 'react';
// import '../css/ResidualPropellantForm.css'; // Make sure the CSS is applied

// const ResidualPropellantForm: React.FC = () => {
//   const [rows, setRows] = useState<number[]>([1, 2, 3, 4, 5]);
//   const [totalQuantity, setTotalQuantity] = useState<number>(0);

//   const addRow = () => {
//     setRows([...rows, rows.length + 1]);
//   };

//   const calculateTotalQuantity = () => {
//     const quantities = Array.from(document.querySelectorAll('.quantity-input')).map(input =>
//       parseFloat((input as HTMLInputElement).value) || 0
//     );
//     setTotalQuantity(quantities.reduce((sum, quantity) => sum + quantity, 0));
//   };

//   return (
//     <div className="form-container">
//       {/* Headings */}
//       <h1 className="center-text">SOLID MOTOR PROPELLANT COMPLEX</h1>
//       <h2 className="center-text">Residual Propellant Management System</h2>
//       <h3 className="center-text smaller-font">Residual Propellant Forwarding Note</h3>

//       {/* Form fields */}
//       <div className="form-entry">
//         <label>Facility Name:</label>
//         <input type="text" className="wide-input" />
//       </div>

//       <div className="row">
//         <label className="half-width-label">Building No.:</label>
//         <input type="text" className="half-width-input" />

//         <label className="unit-label">Unit:</label>
//         <input type="text" className="unit-input" />
//       </div>

//       <div className="form-entry">
//         <label>Date of Dispatch:</label>
//         <input type="date" className="wide-input" />
//       </div>

//       <div className="form-entry">
//         <label>Segment/Motor Details:</label>
//         <input type="text" className="wide-input" />
//       </div>

//       {/* Table */}
//       <h3 className="center-text">Details of Material being sent</h3>
//       <table className="material-table">
//         <thead>
//           <tr>
//             <th>Sl. No.</th>
//             <th>Bag Identification No.</th>
//             <th>Nature of Material</th>
//             <th>Category (A/B/C/D/E)</th>
//             <th>Building No.</th>
//             <th>Qty. (kg)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td><input type="text" /></td>
//               <td><input type="text" /></td>
//               <td>
//                 <select>
//                   <option value="A">A</option>
//                   <option value="B">B</option>
//                   <option value="C">C</option>
//                   <option value="D">D</option>
//                   <option value="E">E</option>
//                 </select>
//               </td>
//               <td><input type="text" /></td>
//               <td><input type="number" className="quantity-input" /></td>
//             </tr>
//           ))}
//           <tr className="total-row">
//             <td colSpan={5}>Total Quantity</td>
//             <td>{totalQuantity} kg</td>
//           </tr>
//         </tbody>
//       </table>
//       <button className="add-row-btn" onClick={addRow}>+</button>

//       <div className="form-entry">
//         <button onClick={calculateTotalQuantity} className="submit-button">Calculate Total</button>
//       </div>

//       {/* Signatures */}
//       <h3 className="center-text">Requesting Facility</h3>
//       <div className="signature-row">
//         <label className="corner-label">Engineer:</label>
//         <input type="text" className="corner-input" placeholder="Engineer Name and Date" />
//         <label className="corner-label">Manager:</label>
//         <input type="text" className="corner-input" placeholder="Manager Name and Date" />
//       </div>

//       <h3 className="center-text">Storage Facility</h3>
//       <div className="signature-row">
//         <label className="corner-label">Engineer:</label>
//         <input type="text" className="corner-input" placeholder="Engineer Name and Date" />
//         <label className="corner-label">Manager:</label>
//         <input type="text" className="corner-input" placeholder="Manager Name and Date" />
//       </div>

//       <h3 className="center-text">Disposing Facility</h3>
//       <div className="signature-row">
//         <label className="corner-label">Engineer:</label>
//         <input type="text" className="corner-input" placeholder="Engineer Name and Date" />
//         <label className="corner-label">Manager:</label>
//         <input type="text" className="corner-input" placeholder="Manager Name and Date" />
//       </div>

//       {/* Submit button */}
//       <button className="submit-button">Submit</button>
//     </div>
//   );
// };

// export default ResidualPropellantForm;


import React, { useState } from 'react';
import '../css/ResidualPropellantForm.css'; // Import the CSS file for styling
import axios from 'axios';

// Define an interface for a table row
interface Row {
  slNo: number;
  bagId: string;
  material: string;
  category: string;
  buildingNo: number;
  qty: number;
}

const ResidualPropellantForm: React.FC = () => {
  // State for form fields
  const [facility, setFacility] = useState<string>('');
  const [buildingNo, setBuildingNo] = useState<number>();
  const [unit, setUnit] = useState<string>(''); // State for Unit
  const [dispatchDate, setDispatchDate] = useState<string>('');
  const [motorDetails, setMotorDetails] = useState<string>('');
  const [generatedNo, setGeneratedNo] = useState<number>(Math.floor(Math.random() * 10000)); // Generates a random number for "No."

  // State for rows in the table
  const [rows, setRows] = useState<Row[]>([
    { slNo: 1, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
    { slNo: 2, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
    { slNo: 3, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 },
  ]);

  // Function to handle adding a new row to the table
  const addRow = () => {
    const newRow: Row = { slNo: rows.length + 1, bagId: '', material: '', category: '', buildingNo: 0, qty: 0 };
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

  // Function to submit the form data via a POST request
  const submitForm = async () => {
    // Loop through each row and send individual requests
    for (const row of rows) {
      const formData = {
        facility_name: facility,         // Maps to facility_name in Django model
        bldg_no: buildingNo,             // Maps to bldg_no in Django model (ForeignKey)
        unit: unit,                      // Maps to unit in Django model (choices)
        segment_ref_no: motorDetails,    // Maps to segment_ref_no in Django model
        dispatch_date: dispatchDate,     // Maps to dispatch_date in Django model
        bag_id_no: row.bagId,            // Maps to bag_id_no in Django model
        nature_material: row.material,   // Maps to nature_material in Django model
        waste_type: row.category,        // Maps to waste_type in Django model (choices)
        qty: row.qty,                    // Maps to qty in Django model
      };

      console.log(formData);

      try {
        const response = await axios.post('http://localhost:8000/api/form_details/', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          console.log('Server Response:', response.data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error: any) {
        if (error.response) {
          console.error('Server Error:', error.response.data);
          alert(`An error occurred: ${error.response.data.message || 'Please try again later.'}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('No response received from the server. Please try again.');
        } else {
          console.error('Error setting up the request:', error.message);
          alert(`Error: ${error.message}`);
        }
        return;  // Exit loop if any error occurs
      }
    }

    alert('Form submitted successfully!');
  };

  return (
    <div className="form-container">
      {/* Main heading */}
      <h1 className="center-text">Solid Motor Propellant Complex</h1>
      <h2 className="center-text">Residual Propellant Management System</h2>
      <h3 className="center-text smaller-font">Residual Propellant Forwarding Note</h3>

      {/* "No." field in the right corner */}
      <div className="form-no right-align">
        <label>No.:</label>
        <input type="text" value={generatedNo} disabled />
      </div>

      {/* Note to Engineer in italics */}
      <p className="italic-text">To Engineer in charge of disposal, storage, and residual propellant handling unit...</p>

      {/* Form entries */}
      <div className="form-entry">
        <label>From Facility:</label>
        <select value={facility} onChange={(e) => setFacility(e.target.value)} className="wide-input">
          <option value="">Select Facility</option>
          <option value="Mixing Stations">Mixing Stations</option>
          <option value="ISPF">ISPF</option>
          <option value="CMTL">CMTL</option>
        </select>
      </div>

      {/* Building No. and Unit on the same level */}
      <div className="form-entry">
        <label>Building No.:</label>
        <select
          value={buildingNo || ""}
          onChange={(e) => setBuildingNo(e.target.value ? Number(e.target.value) : 0)}
          className="half-width-input"
        >
          <option value="">Select Building No.</option>
          <option value={101}>101</option>
          <option value={102}>102</option>
        </select>

        {/* Unit field on the same row */}
        <label>Unit:</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)} className="half-width-input">
          <option value="">Select Unit</option>
          <option value="U1">U1</option>
          <option value="U2">U2</option>
        </select>
      </div>

      <div className="form-entry">
        <label>Date of Dispatch:</label>
        <input type="date" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} className="wide-input" />
      </div>

      <div className="form-entry">
        <label>Segment/Motor Details:</label>
        <input type="text" value={motorDetails} onChange={(e) => setMotorDetails(e.target.value)} className="wide-input" />
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
      {/* Plus sign to add more rows */}
      <button className="add-row-button" onClick={addRow}>+</button>

      {/* Notes section */}
      <div className="form-note">
        <p><strong>Note:</strong></p>
        <ul>
          <li>Ensure material type is accurate.</li>
          <li>Follow proper storage protocol.</li>
        </ul>
      </div>

      {/* Requesting Facility section */}
      <h3>Requesting Facility</h3>
      <div className="signature-row">
        <label>Engineer:</label>
        <input type="text" placeholder="Engineer Name and Date" />
        <label>Manager:</label>
        <input type="text" placeholder="Manager Name and Date" />
      </div>

      {/* Storage Facility section */}
      <h3>Storage Facility</h3>
      <div className="signature-row">
        <label>Engineer:</label>
        <input type="text" placeholder="Engineer Name and Date" />
        <label>Manager:</label>
        <input type="text" placeholder="Manager Name and Date" />
      </div>

      {/* Disposing Facility section */}
      <h3>Disposing Facility</h3>
      <div className="signature-row">
        <label>Engineer:</label>
        <input type="text" placeholder="Engineer Name and Date" />
        <label>Manager:</label>
        <input type="text" placeholder="Manager Name and Date" />
      </div>

      {/* Submit button */}
      <button className="submit-button" onClick={submitForm}>Submit</button>
    </div>
  );
};

export default ResidualPropellantForm;

//main-code please make the required changes

