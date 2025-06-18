import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";

// Si no hay usuario, lo redirige al login
function ProtectedRoute({ children }) {
  const docnum = localStorage.getItem("docnum");
  return docnum ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const docnum = localStorage.getItem("docnum");
  return docnum ? <Navigate to="/home" /> : children;
}

function App() {
  const docnum = localStorage.getItem("docnum");

  return (
    <Router>
      <Routes>
        {/* Redirección base según sesión */}
        <Route
          path="/"
          element={
            docnum ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
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
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
