import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
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

  const addCustomer = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/customers", form);

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      fetchCustomers();
    } catch (err) {
      console.log(err);
      alert("Failed to add customer");
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.includes(search)
  );

  return (
    <div>
      <Sidebar />

      <div className="customer-container">
        <Navbar />

        <div className="customer-body">

          <h2 style={{ color: "red", fontSize: "40px" }}>
            NEW CUSTOMER PAGE
          </h2>

          <input
            type="text"
            placeholder="Search Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />

          <div className="customer-form">

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />

            <button onClick={addCustomer}>
              Add Customer
            </button>

          </div>

          <table className="customer-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>

                    <td>
                      <button
                        onClick={() =>
                          deleteCustomer(customer._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    No Customers Found
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

export default Customers;