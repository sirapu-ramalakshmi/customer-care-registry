import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/Complaints.css";

function Complaints() {
  const [customers, setCustomers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status");

  const [form, setForm] = useState({
    customerId: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  useEffect(() => {
    fetchCustomers();
    fetchComplaints();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addComplaint = async () => {
    if (
      !form.customerId ||
      !form.title ||
      !form.description
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/complaints", form);

      setForm({
        customerId: "",
        title: "",
        description: "",
        priority: "Medium",
        status: "Open",
      });

      fetchComplaints();
    } catch (err) {
      console.log(err);
      alert("Failed to add complaint");
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await API.delete(`/complaints/${id}`);
      fetchComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchStatus = statusFilter
      ? complaint.status === statusFilter
      : true;

    const matchSearch =
      complaint.title.toLowerCase().includes(search.toLowerCase()) ||
      complaint.description.toLowerCase().includes(search.toLowerCase()) ||
      complaint.customerId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <div>
      <Sidebar />

      <div className="complaint-container">
        <Navbar />

        <div className="complaint-body">

          <h2>Complaints</h2>

          <input
            type="text"
            className="search-box"
            placeholder="Search Complaint..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="complaint-form">

            <select
              name="customerId"
              value={form.customerId}
              onChange={handleChange}
            >
              <option value="">Select Customer</option>

              {customers.map((customer) => (
                <option
                  key={customer._id}
                  value={customer._id}
                >
                  {customer.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="title"
              placeholder="Complaint Title"
              value={form.title}
              onChange={handleChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <button onClick={addComplaint}>
              Add Complaint
            </button>

          </div>

          <table className="complaint-table">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint._id}>

                    <td>
                      {complaint.customerId
                        ? complaint.customerId.name
                        : "Customer Deleted"}
                    </td>

                    <td>{complaint.title}</td>
                    <td>{complaint.priority}</td>
                    <td>{complaint.status}</td>

                    <td>
                      <button
                        onClick={() =>
                          deleteComplaint(complaint._id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Complaints Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default Complaints;