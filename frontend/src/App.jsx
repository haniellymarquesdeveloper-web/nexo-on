import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Demandas from "./pages/demandas/Demandas";
import Usuarios from "./pages/usuarios/Usuarios";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/" replace />;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? <Navigate to="/dashboard" replace /> : children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/demandas" element={<PrivateRoute><Demandas /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;