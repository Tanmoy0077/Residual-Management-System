import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";
import ErrorPage from './ErrorPage';
import ProtectedRoute from './ProtectedRoute';
import SendingEngineer from './SendingEngineer';
import SendingFacility from './SendingFacility';
import ReceivingEngineer from './ReceivingEngineer';
import ReceivingFacility from './ReceivingFacility';
import DisposingFacility from './DisposingFacility';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
