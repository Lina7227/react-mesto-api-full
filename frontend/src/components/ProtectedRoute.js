import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
    return (
      <Route>
        {
          () => props.islogOn ? <Component {...props} /> : <Redirect to="./sign-in" />
        }
      </Route>
  )}
  
  export default ProtectedRoute;
