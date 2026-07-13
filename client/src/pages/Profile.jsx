import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {
  return (
    <div>
      <Sidebar />

      <div className="dashboard-container">
        <Navbar />

        <div className="dashboard-body">
          <h2>My Profile</h2>

          <div className="card blue">
            <h3>Administrator</h3>
            <p>Name: Admin</p>
            <p>Email: admin@gmail.com</p>
            <p>Role: System Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;