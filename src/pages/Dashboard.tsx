// import React, { useEffect, useState } from 'react';
// import '../css/Dashboard.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// interface PropellantStock {
//   unit: string;
//   a: number;
//   b: number;
//   c: number;
//   d: number;
//   e: number;
// }

// const Dashboard: React.FC = () => {
//   const [availableStock, setAvailableStock] = useState<PropellantStock[]>([]);
//   const [disposedStock, setDisposedStock] = useState<PropellantStock[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const availableResponse = await axios.get<PropellantStock[]>('/api/available_stock');
//         const disposedResponse = await axios.get<PropellantStock[]>('/api/disposed_stock');
//         setAvailableStock(availableResponse.data);
//         setDisposedStock(disposedResponse.data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleLogout = () => {
//     // Clear any session data or tokens here if necessary
//     navigate('/login'); // Redirect to login page
//   };

//   const calculateTotals = (stock: PropellantStock[]) => {
//     const totals = { a: 0, b: 0, c: 0, d: 0, e: 0 };
//     stock.forEach(item => {
//       totals.a += item.a;
//       totals.b += item.b;
//       totals.c += item.c;
//       totals.d += item.d;
//       totals.e += item.e;
//     });
//     return totals;
//   };

//   const calculateGrandTotal = (totals: { a: number, b: number, c: number, d: number, e: number }) => {
//     return totals.a + totals.b + totals.c + totals.d + totals.e;
//   };

//   const availableTotals = calculateTotals(availableStock);
//   const disposedTotals = calculateTotals(disposedStock);
//   const availableGrandTotal = calculateGrandTotal(availableTotals);
//   const disposedGrandTotal = calculateGrandTotal(disposedTotals);

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="dashboard">
//       <nav className="navbar">
//         <button className="logout-button" onClick={handleLogout}>Logout</button>
//       </nav>

//       <div className="welcome-message">
//         <h2>Welcome, User!</h2>
//       </div>

//       <h3 className="dashboard-heading">Residual Propellant Management Dashboard</h3>

//       <div className="tables-container">
//         {/* Propellant Stock Available Table */}
//         <table className="stock-table">
//           <thead>
//             <tr>
//               <th>Unit</th>
//               <th>A</th>
//               <th>B</th>
//               <th>C</th>
//               <th>D</th>
//               <th>E</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {availableStock.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.unit}</td>
//                 <td>{row.a}</td>
//                 <td>{row.b}</td>
//                 <td>{row.c}</td>
//                 <td>{row.d}</td>
//                 <td>{row.e}</td>
//                 <td>{row.a + row.b + row.c + row.d + row.e}</td>
//               </tr>
//             ))}
//             <tr>
//               <td>Total</td>
//               <td>{availableTotals.a}</td>
//               <td>{availableTotals.b}</td>
//               <td>{availableTotals.c}</td>
//               <td>{availableTotals.d}</td>
//               <td>{availableTotals.e}</td>
//               <td>{availableGrandTotal}</td>
//             </tr>
//           </tbody>
//         </table>

//         {/* Propellant Stock Disposed Table */}
//         <table className="stock-table">
//           <thead>
//             <tr>
//               <th>Unit</th>
//               <th>A</th>
//               <th>B</th>
//               <th>C</th>
//               <th>D</th>
//               <th>E</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {disposedStock.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.unit}</td>
//                 <td>{row.a}</td>
//                 <td>{row.b}</td>
//                 <td>{row.c}</td>
//                 <td>{row.d}</td>
//                 <td>{row.e}</td>
//                 <td>{row.a + row.b + row.c + row.d + row.e}</td>
//               </tr>
//             ))}
//             <tr>
//               <td>Total</td>
//               <td>{disposedTotals.a}</td>
//               <td>{disposedTotals.b}</td>
//               <td>{disposedTotals.c}</td>
//               <td>{disposedTotals.d}</td>
//               <td>{disposedTotals.e}</td>
//               <td>{disposedGrandTotal}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="totals-summary">
//         <p>Total Propellant Stock Available is {availableGrandTotal}</p>
//         <p>Total Propellant Stock Disposed is {disposedGrandTotal}</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css'; // Make sure this CSS file is in the same folder or adjust the path accordingly.

interface PropellantData {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
}

interface TableData {
  SMPC1: PropellantData;
  SMPC2: PropellantData;
}

const Dashboard: React.FC = () => {
  // Placeholder for available and disposed data, replace with data from your database.
  const [availableData, setAvailableData] = useState<TableData>({
    SMPC1: { A: 5, B: 6, C: 7, D: 8, E: 9 },
    SMPC2: { A: 5, B: 6, C: 7, D: 8, E: 9 },
  });

  const [disposedData, setDisposedData] = useState<TableData>({
    SMPC1: { A: 0, B: 0, C: 0, D: 0, E: 0 },
    SMPC2: { A: 0, B: 0, C: 0, D: 0, E: 0 },
  });

  useEffect(() => {
    // Fetch data from the database (you can replace this with actual API calls)
    // Example API call or fetch from DB
    // setAvailableData(fetchedAvailableData);
    // setDisposedData(fetchedDisposedData);
  }, []);

  const calculateRowTotal = (data: PropellantData): number => {
    return Object.values(data).reduce((acc, curr) => acc + curr, 0);
  };

  const calculateColumnTotal = (data: TableData, column: keyof PropellantData): number => {
    return Object.keys(data).reduce((acc, key) => acc + data[key as keyof TableData][column], 0);
  };

  const calculateGrandTotal = (data: TableData): number => {
    const rowTotals = Object.keys(data).map((key) => calculateRowTotal(data[key as keyof TableData]));
    return rowTotals.reduce((acc, curr) => acc + curr, 0);
  };

  const totalAvailable = calculateGrandTotal(availableData);
  const totalDisposed = calculateGrandTotal(disposedData);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logout">
          <button>Logout</button>
        </div>
      </nav>

      <h1>Welcome, [User Name]</h1>

      <h2>Residual Propellant Management Dashboard</h2>

      <div className="tables-container">
        {/* Table for Propellant Stock Available */}
        <div className="table">
          <h3>Propellant Stock Available</h3>
          <table>
            <thead>
              <tr>
                <th>Unit</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>E</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(availableData).map((unit) => (
                <tr key={unit}>
                  <td>{unit}</td>
                  <td>{availableData[unit as keyof TableData].A}</td>
                  <td>{availableData[unit as keyof TableData].B}</td>
                  <td>{availableData[unit as keyof TableData].C}</td>
                  <td>{availableData[unit as keyof TableData].D}</td>
                  <td>{availableData[unit as keyof TableData].E}</td>
                  <td>{calculateRowTotal(availableData[unit as keyof TableData])}</td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>{calculateColumnTotal(availableData, 'A')}</td>
                <td>{calculateColumnTotal(availableData, 'B')}</td>
                <td>{calculateColumnTotal(availableData, 'C')}</td>
                <td>{calculateColumnTotal(availableData, 'D')}</td>
                <td>{calculateColumnTotal(availableData, 'E')}</td>
                <td>{totalAvailable}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table for Propellant Stock Disposed */}
        <div className="table">
          <h3>Propellant Stock Disposed</h3>
          <table>
            <thead>
              <tr>
                <th>Unit</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>E</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(disposedData).map((unit) => (
                <tr key={unit}>
                  <td>{unit}</td>
                  <td>{disposedData[unit as keyof TableData].A}</td>
                  <td>{disposedData[unit as keyof TableData].B}</td>
                  <td>{disposedData[unit as keyof TableData].C}</td>
                  <td>{disposedData[unit as keyof TableData].D}</td>
                  <td>{disposedData[unit as keyof TableData].E}</td>
                  <td>{calculateRowTotal(disposedData[unit as keyof TableData])}</td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>{calculateColumnTotal(disposedData, 'A')}</td>
                <td>{calculateColumnTotal(disposedData, 'B')}</td>
                <td>{calculateColumnTotal(disposedData, 'C')}</td>
                <td>{calculateColumnTotal(disposedData, 'D')}</td>
                <td>{calculateColumnTotal(disposedData, 'E')}</td>
                <td>{totalDisposed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals Display */}
      <div className="totals">
        <p>Total Propellant Stock Available is {totalAvailable}</p>
        <p>Total Propellant Stock Disposed is {totalDisposed}</p>
      </div>
    </div>
  );
};

export default Dashboard;

