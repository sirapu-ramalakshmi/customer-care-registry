import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Customer Care</h2>

      <ul className="menu">
        <li>
          <Link to="/dashboard">📊 Dashboard</Link>
        </li>

        <li>
          <Link to="/customers">👥 Customers</Link>
        </li>

        <li>
          <Link to="/complaints">📝 Complaints</Link>
        </li>

        <li>
          <Link to="/">🚪 Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;