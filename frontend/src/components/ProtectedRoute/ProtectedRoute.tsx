import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteElementProps {
  element: ReactElement
  isLoggedIn: boolean
}

function ProtectedRouteElement(
  {
    element,
    isLoggedIn,
    ...props
  }: ProtectedRouteElementProps,
) {
  return (
    !isLoggedIn
      ? React.cloneElement(element, props)
      : <Navigate to="/" replace />
  );
}

export default ProtectedRouteElement;
