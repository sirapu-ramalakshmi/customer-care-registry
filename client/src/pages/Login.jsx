import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {
    if (
      form.username === "admin" &&
      form.password === "admin123"
    ) {
      navigate("/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">
        <h1>Customer Care Registry</h1>

        <p>
          Complaint Management System
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Admin"
        />
      </div>

      <div className="login-card">

        <h2>Admin Login</h2>

        <div className="input-box">
          <FaUser />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaLock />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <span
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

        </div>

        <button onClick={login}>
          LOGIN
        </button>

        <p className="login-info">
          Username : admin <br />
          Password : admin123
        </p>

      </div>

    </div>
  );
}

export default Login;