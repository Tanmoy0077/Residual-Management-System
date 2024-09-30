// import React, { useState, useEffect } from 'react';
// import '../css/Dashboard.css';
// import Navbar from '../components/AppNavbar'; // Make sure this CSS file is in the same folder or adjust the path accordingly.

// interface PropellantData {
//   A: number;
//   B: number;
//   C: number;
//   D: number;
//   E: number;
// }

// interface TableData {
//   SMPC1: PropellantData;
//   SMPC2: PropellantData;
// }

// const Dashboard: React.FC = () => {
//   // Placeholder for available and disposed data, replace with data from your database.
//   const [availableData, setAvailableData] = useState<TableData>({
//     SMPC1: { A: 5, B: 6, C: 7, D: 8, E: 9 },
//     SMPC2: { A: 5, B: 6, C: 7, D: 8, E: 9 },
//   });

//   const [disposedData, setDisposedData] = useState<TableData>({
//     SMPC1: { A: 0, B: 0, C: 0, D: 0, E: 0 },
//     SMPC2: { A: 0, B: 0, C: 0, D: 0, E: 0 },
//   });

//   useEffect(() => {
//     // Fetch data from the database (you can replace this with actual API calls)
//     // Example API call or fetch from DB
//     // setAvailableData(fetchedAvailableData);
//     // setDisposedData(fetchedDisposedData);
//   }, []);

//   const calculateRowTotal = (data: PropellantData): number => {
//     return Object.values(data).reduce((acc, curr) => acc + curr, 0);
//   };

//   const calculateColumnTotal = (data: TableData, column: keyof PropellantData): number => {
//     return Object.keys(data).reduce((acc, key) => acc + data[key as keyof TableData][column], 0);
//   };

//   const calculateGrandTotal = (data: TableData): number => {
//     const rowTotals = Object.keys(data).map((key) => calculateRowTotal(data[key as keyof TableData]));
//     return rowTotals.reduce((acc, curr) => acc + curr, 0);
//   };

//   const totalAvailable = calculateGrandTotal(availableData);
//   const totalDisposed = calculateGrandTotal(disposedData);

//   return (
//     <div className="dashboard">

//       <Navbar />
//       <div className="heading d-flex flex-column justify-content-center align-items-center my-5">

//         <h1>Welcome, {localStorage.getItem("name") || "User"}</h1>

//         <h2>Residual Propellant Management Dashboard</h2>

//       </div>

//       <div className="tables-container d-flex justify-content-between">
//         {/* Table for Propellant Stock Available */}
//         <div className="table mx-3 d-flex justify-content-center flex-column align-items-center">
//           <h3>Propellant Stock Available</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Unit</th>
//                 <th>A</th>
//                 <th>B</th>
//                 <th>C</th>
//                 <th>D</th>
//                 <th>E</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(availableData).map((unit) => (
//                 <tr key={unit}>
//                   <td>{unit}</td>
//                   <td>{availableData[unit as keyof TableData].A}</td>
//                   <td>{availableData[unit as keyof TableData].B}</td>
//                   <td>{availableData[unit as keyof TableData].C}</td>
//                   <td>{availableData[unit as keyof TableData].D}</td>
//                   <td>{availableData[unit as keyof TableData].E}</td>
//                   <td>{calculateRowTotal(availableData[unit as keyof TableData])}</td>
//                 </tr>
//               ))}
//               <tr>
//                 <td>Total</td>
//                 <td>{calculateColumnTotal(availableData, 'A')}</td>
//                 <td>{calculateColumnTotal(availableData, 'B')}</td>
//                 <td>{calculateColumnTotal(availableData, 'C')}</td>
//                 <td>{calculateColumnTotal(availableData, 'D')}</td>
//                 <td>{calculateColumnTotal(availableData, 'E')}</td>
//                 <td>{totalAvailable}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Table for Propellant Stock Disposed */}
//         <div className="table mx-3 d-flex justify-content-center flex-column align-items-center">
//           <h3>Propellant Stock Disposed</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Unit</th>
//                 <th>A</th>
//                 <th>B</th>
//                 <th>C</th>
//                 <th>D</th>
//                 <th>E</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(disposedData).map((unit) => (
//                 <tr key={unit}>
//                   <td>{unit}</td>
//                   <td>{disposedData[unit as keyof TableData].A}</td>
//                   <td>{disposedData[unit as keyof TableData].B}</td>
//                   <td>{disposedData[unit as keyof TableData].C}</td>
//                   <td>{disposedData[unit as keyof TableData].D}</td>
//                   <td>{disposedData[unit as keyof TableData].E}</td>
//                   <td>{calculateRowTotal(disposedData[unit as keyof TableData])}</td>
//                 </tr>
//               ))}
//               <tr>
//                 <td>Total</td>
//                 <td>{calculateColumnTotal(disposedData, 'A')}</td>
//                 <td>{calculateColumnTotal(disposedData, 'B')}</td>
//                 <td>{calculateColumnTotal(disposedData, 'C')}</td>
//                 <td>{calculateColumnTotal(disposedData, 'D')}</td>
//                 <td>{calculateColumnTotal(disposedData, 'E')}</td>
//                 <td>{totalDisposed}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Totals Display */}
//       <div className="totals">
//         <p>Total Propellant Stock Available is {totalAvailable}</p>
//         <p>Total Propellant Stock Disposed is {totalDisposed}</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import Navbar from '../components/AppNavbar';
import axios from 'axios';

interface PropellantData {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
}

interface TableData {
  U1: PropellantData;
  U2: PropellantData;
}

const Dashboard: React.FC = () => {
  const [availableData, setAvailableData] = useState<TableData>({
    U1: { A: 0, B: 0, C: 0, D: 0, E: 0 },
    U2: { A: 0, B: 0, C: 0, D: 0, E: 0 },
  });

  const [disposedData, setDisposedData] = useState<TableData>({
    U1: { A: 0, B: 0, C: 0, D: 0, E: 0 },
    U2: { A: 0, B: 0, C: 0, D: 0, E: 0 },
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/propellant-data/')
      .then(response => {
        setAvailableData(response.data.availableData);
        setDisposedData(response.data.disposedData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
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
      <Navbar />
      <div className="heading d-flex flex-column justify-content-center align-items-center my-5">
        <h1>Welcome, {localStorage.getItem("name") || "User"}</h1>
        <h2>Residual Propellant Management Dashboard</h2>
      </div>
      <div className="tables-container d-flex justify-content-between">
        <div className="table mx-3 d-flex justify-content-center flex-column align-items-center">
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
        <div className="table mx-3 d-flex justify-content-center flex-column align-items-center">
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
      <div className="totals">
        <p>Total Propellant Stock Available is {totalAvailable}</p>
        <p>Total Propellant Stock Disposed is {totalDisposed}</p>
      </div>
    </div>
  );
};

export default Dashboard;
