import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2>Customer Care Registry</h2>

      <div className="admin-profile">
        <div
          className="admin-info"
          onClick={() => setOpen(!open)}
        >
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff"
            alt="Admin"
          />
          <span>Admin ▼</span>
        </div>

        {open && (
          <div className="dropdown">
            <div onClick={() => navigate("/profile")}>
              My Profile
            </div>

            <div onClick={() => navigate("/settings")}>
              Settings
            </div>

            <div onClick={() => navigate("/")}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;