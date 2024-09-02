import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../AuthService';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button className="btn btn-outline-danger my-2 my-sm-0 ms-auto" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
