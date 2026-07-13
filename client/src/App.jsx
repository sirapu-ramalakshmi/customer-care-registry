import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Complaints from "./pages/Complaints";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Customers */}
      <Route path="/customers" element={<Customers />} />

      {/* Complaints */}
      <Route path="/complaints" element={<Complaints />} />

      {/* Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Settings */}
      <Route path="/settings" element={<Settings />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;