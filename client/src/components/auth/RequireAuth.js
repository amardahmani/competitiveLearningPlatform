import React from 'react'
import { getCurrentUser } from '../../services/auth.service'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = ({ allowedRole }) => {
    const user = getCurrentUser();
    const location = useLocation();
    
    if (user && user.role === allowedRole) {
        
      return <Outlet />;
    } else if (user) {
      return (
        <>
          <h1>Not Authorized</h1>
          <p>You don't have permission to access this page.</p>
        </>
      );
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  };

export default RequireAuth