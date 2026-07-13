import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {
  return (
    <div>
      <Sidebar />

      <div className="dashboard-container">
        <Navbar />

        <div className="dashboard-body">
          <h2>Settings</h2>

          <div className="card green">
            <h3>Application Settings</h3>

            <p>Theme : Light</p>
            <p>Language : English</p>
            <p>Notifications : Enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;