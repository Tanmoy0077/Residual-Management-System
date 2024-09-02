import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";
import ErrorPage from './ErrorPage';
import ProtectedRoute from './ProtectedRoute';

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
        {/* <Route
          path="/engineer"
          element={
            <ProtectedRoute requiredDesignation="Engineer">
              <EngineerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute requiredDesignation="Manager">
              <ManagerPage />
            </ProtectedRoute>
          }
        /> */}
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
