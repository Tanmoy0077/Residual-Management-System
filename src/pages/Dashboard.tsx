import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import Navbar from '../components/AppNavbar';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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

  // Chart data for Available Stock
  const availableChartData = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [
      {
        label: 'Unit 1',
        data: Object.values(availableData.U1),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Unit 2',
        data: Object.values(availableData.U2),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Chart data for Disposed Stock
  const disposedChartData = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [
      {
        label: 'Unit 1',
        data: Object.values(disposedData.U1),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Unit 2',
        data: Object.values(disposedData.U2),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const availablePieData = {
    labels: ['SMPC1', 'SMPC2'],
    datasets: [
      {
        label: 'Available Stock',
        data: [
          calculateRowTotal(availableData.U1),
          calculateRowTotal(availableData.U2),
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };
  const disposedPieData = {
    labels: ['SMPC1', 'SMPC2'],
    datasets: [
      {
        label: 'Disposed Stock',
        data: [
          calculateRowTotal(disposedData.U1),
          calculateRowTotal(disposedData.U2),
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };

  // Pie chart options to make them smaller
  const pieChartOptions = {
    maintainAspectRatio: false, // Maintain aspect ratio set to false
    responsive: true,
  };

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
      <div className="charts-container">
        {/* Chart for Available Stock */}
        <div className="chart">
          <h3 className='d-flex justify-content-center'>Available Stock per Category</h3>
          <Bar data={availableChartData} />
          <h3 className='d-flex justify-content-center mt-5'>Available Stock Pie Chart</h3>
          <div style={{ position: 'relative', height: '250px' }}> {/* Set a specific height */}
            <Pie data={availablePieData} options={pieChartOptions} />
          </div>
        </div>

        {/* Chart for Disposed Stock */}
        <div className="chart">
          <h3 className='d-flex justify-content-center'>Disposed Stock per Category</h3>
          <Bar data={disposedChartData} />
          <h3 className='d-flex justify-content-center mt-5'>Disposed Stock Pie Chart</h3>
          <div style={{ position: 'relative', height: '250px' }}> {/* Set a specific height */}
            <Pie data={disposedPieData} options={pieChartOptions} />
          </div>
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
