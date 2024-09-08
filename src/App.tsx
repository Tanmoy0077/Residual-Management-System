import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";
import ErrorPage from './ErrorPage';
import ProtectedRoute from './ProtectedRoute';
import SendingEngineer from './pages/SendingEngineer';
import SendingFacility from './pages/SendingFacility';
import ReceivingEngineer from './pages/ReceivingEngineer';
import ReceivingFacility from './pages/ReceivingFacility';
import DisposingFacility from './pages/DisposingFacility';
import ResidualPropellantForm from './pages/ResidualPropellantForm';
import SmForm from './pages/SmForm';
import ReForm from './pages/ReForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-form" element={<ResidualPropellantForm />} />
        <Route path="/sm-form/:request_no" element={<SmForm />} />
        <Route path="/re-form/:request_no" element={<ReForm />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredDesignation="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sending-engineer"
          element={
            <ProtectedRoute requiredDesignation="sending engineer">
              <SendingEngineer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sending-manager"
          element={
            <ProtectedRoute requiredDesignation="sending manager">
              <SendingFacility />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiving-engineer"
          element={
            <ProtectedRoute requiredDesignation="receiving engineer">
              <ReceivingEngineer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiving-manager"
          element={
            <ProtectedRoute requiredDesignation="receiving manager">
              <ReceivingFacility />
            </ProtectedRoute>
          }
        />
        <Route
          path="/disposing-manager"
          element={
            <ProtectedRoute requiredDesignation="disposing manager">
              <DisposingFacility />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

// import React from 'react';
//qimport ReForm from './pages/ReForm';
//import DisposingEngineer from './pages/DisposingEngineer';
//import ReceivingFacility from './pages/ReceivingFacility';
//import DisposingFacility from './pages/DisposingFacility';
// import Dashboard from './pages/Dashboard';




// const App: React.FC = () => {
//   return (
//       <Dashboard />
//   );
// };

// export default App;

//hello