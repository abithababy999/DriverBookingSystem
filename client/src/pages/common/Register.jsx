import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../service/authService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const user = registerUser(form);
      if (user.role === "worker") {
        navigate("/worker");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "60px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Register</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" style={inputStyle} />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" style={inputStyle} />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" style={inputStyle} />

        <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
          <option value="user">User</option>
          <option value="worker">Worker</option>
        </select>

        <button type="submit" style={buttonStyle}>Create Account</button>
      </form>

      <p style={{ marginTop: "16px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "12px 16px",
  background: "#17a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Register;
