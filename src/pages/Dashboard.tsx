import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PropellantStock {
  unit: string;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
}

const Dashboard: React.FC = () => {
  const [availableStock, setAvailableStock] = useState<PropellantStock[]>([]);
  const [disposedStock, setDisposedStock] = useState<PropellantStock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const availableResponse = await axios.get<PropellantStock[]>('/api/available_stock');
        const disposedResponse = await axios.get<PropellantStock[]>('/api/disposed_stock');
        setAvailableStock(availableResponse.data);
        setDisposedStock(disposedResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    // Clear any session data or tokens here if necessary
    navigate('/login'); // Redirect to login page
  };

  const calculateTotals = (stock: PropellantStock[]) => {
    const totals = { a: 0, b: 0, c: 0, d: 0, e: 0 };
    stock.forEach(item => {
      totals.a += item.a;
      totals.b += item.b;
      totals.c += item.c;
      totals.d += item.d;
      totals.e += item.e;
    });
    return totals;
  };

  const calculateGrandTotal = (totals: { a: number, b: number, c: number, d: number, e: number }) => {
    return totals.a + totals.b + totals.c + totals.d + totals.e;
  };

  const availableTotals = calculateTotals(availableStock);
  const disposedTotals = calculateTotals(disposedStock);
  const availableGrandTotal = calculateGrandTotal(availableTotals);
  const disposedGrandTotal = calculateGrandTotal(disposedTotals);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="welcome-message">
        <h2>Welcome, User!</h2>
      </div>

      <h3 className="dashboard-heading">Residual Propellant Management Dashboard</h3>

      <div className="tables-container">
        {/* Propellant Stock Available Table */}
        <table className="stock-table">
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
            {availableStock.map((row, index) => (
              <tr key={index}>
                <td>{row.unit}</td>
                <td>{row.a}</td>
                <td>{row.b}</td>
                <td>{row.c}</td>
                <td>{row.d}</td>
                <td>{row.e}</td>
                <td>{row.a + row.b + row.c + row.d + row.e}</td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td>{availableTotals.a}</td>
              <td>{availableTotals.b}</td>
              <td>{availableTotals.c}</td>
              <td>{availableTotals.d}</td>
              <td>{availableTotals.e}</td>
              <td>{availableGrandTotal}</td>
            </tr>
          </tbody>
        </table>

        {/* Propellant Stock Disposed Table */}
        <table className="stock-table">
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
            {disposedStock.map((row, index) => (
              <tr key={index}>
                <td>{row.unit}</td>
                <td>{row.a}</td>
                <td>{row.b}</td>
                <td>{row.c}</td>
                <td>{row.d}</td>
                <td>{row.e}</td>
                <td>{row.a + row.b + row.c + row.d + row.e}</td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td>{disposedTotals.a}</td>
              <td>{disposedTotals.b}</td>
              <td>{disposedTotals.c}</td>
              <td>{disposedTotals.d}</td>
              <td>{disposedTotals.e}</td>
              <td>{disposedGrandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="totals-summary">
        <p>Total Propellant Stock Available is {availableGrandTotal}</p>
        <p>Total Propellant Stock Disposed is {disposedGrandTotal}</p>
      </div>
    </div>
  );
};

export default Dashboard;
