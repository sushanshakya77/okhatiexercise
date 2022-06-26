import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";

export interface IState {
  auth: {
    isAuthenticated: boolean;
  };
}
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useSelector((state: IState) => state.auth.isAuthenticated);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};
const PublicRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useSelector((state: IState) => state.auth.isAuthenticated);
  return isLoggedIn ? <Navigate to="/profile" /> : <>{children}</>;
};

function App() {
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
