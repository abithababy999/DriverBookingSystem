import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, seedUsers } from "../../service/authService";

seedUsers();

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = loginUser(form.username, form.password);

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "worker") navigate("/worker");
      else navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "60px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username or Email"
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Login</button>
      </form>

      <p style={{ marginTop: "16px" }}>
        <Link to="/forgot-password">Forgot password?</Link>
      </p>

      <p style={{ marginTop: "16px" }}>
        New user? <Link to="/register">Register here</Link>
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
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Login;
