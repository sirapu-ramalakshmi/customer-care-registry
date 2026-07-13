import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const customerRes = await API.get("/customers");
      const complaintRes = await API.get("/complaints");

      setCustomers(customerRes.data);
      setComplaints(complaintRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalCustomers = customers.length;
  const totalComplaints = complaints.length;

  const openComplaints = complaints.filter(
    (c) => c.status === "Open"
  ).length;

  const inProgressComplaints = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div>
      <Sidebar />

      <div className="dashboard-container">
        <Navbar />

        <div className="dashboard-body">

          <h2>Dashboard</h2>

          <div className="dashboard-cards">

            <div
              className="card blue"
              onClick={() => navigate("/customers")}
              style={{ cursor: "pointer" }}
            >
              <h3>Total Customers</h3>
              <h1>{totalCustomers}</h1>
            </div>

            <div
              className="card green"
              onClick={() => navigate("/complaints")}
              style={{ cursor: "pointer" }}
            >
              <h3>Total Complaints</h3>
              <h1>{totalComplaints}</h1>
            </div>

            <div
              className="card orange"
              onClick={() => navigate("/complaints?status=Open")}
              style={{ cursor: "pointer" }}
            >
              <h3>Open</h3>
              <h1>{openComplaints}</h1>
            </div>

            <div
              className="card purple"
              onClick={() =>
                navigate("/complaints?status=In Progress")
              }
              style={{ cursor: "pointer" }}
            >
              <h3>In Progress</h3>
              <h1>{inProgressComplaints}</h1>
            </div>

            <div
              className="card red"
              onClick={() =>
                navigate("/complaints?status=Resolved")
              }
              style={{ cursor: "pointer" }}
            >
              <h3>Resolved</h3>
              <h1>{resolvedComplaints}</h1>
            </div>

          </div>

          <div className="recent-section">

            <h3>Recent Complaints</h3>

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {complaints.length > 0 ? (
                  complaints.slice(0, 5).map((complaint) => (
                    <tr key={complaint._id}>
                      <td>
                        {complaint.customerId
                          ? complaint.customerId.name
                          : "Customer Deleted"}
                      </td>
                      <td>{complaint.title}</td>
                      <td>{complaint.priority}</td>
                      <td>{complaint.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No Complaints Available
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;