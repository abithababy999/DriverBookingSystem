import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../service/authService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role: "user",
    location: "",
    vehicle: "",
    details: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [actualOtp, setActualOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = () => {
    if (!form.email || !form.phone) {
      setError("Please enter email and phone number first.");
      return;
    }

    const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
    setActualOtp(generatedOtp);
    setOtpSent(true);
    setError("");
    alert(`OTP sent successfully. Your demo OTP is: ${generatedOtp}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otpSent) {
      setError("Please send the OTP first.");
      return;
    }

    if (otpInput !== actualOtp) {
      setError("OTP does not match. Please try again.");
      return;
    }

    try {
      const user = registerUser(form);
      if (user.role === "worker") {
        navigate("/worker");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "60px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Register</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
        <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
          <option value="user">User</option>
          <option value="worker">Worker</option>
        </select>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" style={inputStyle} />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" style={inputStyle} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" style={inputStyle} />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location (Example: Mukkom)" style={inputStyle} />

        {form.role === "worker" && (
          <>
            <input name="vehicle" value={form.vehicle} onChange={handleChange} placeholder="Vehicle / Skill (Car / Plumber / Electrician)" style={inputStyle} />
            <textarea name="details" value={form.details} onChange={handleChange} placeholder="Worker details / experience" rows="3" style={inputStyle} />
          </>
        )}

        <button type="button" onClick={sendOtp} style={secondaryButtonStyle}>Send OTP</button>

        <input
          type="text"
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          placeholder="Enter OTP"
          style={inputStyle}
        />

        <input name="username" value={form.username} onChange={handleChange} placeholder="Create Username" style={inputStyle} />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create Password" style={inputStyle} />

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

const secondaryButtonStyle = {
  padding: "12px 16px",
  background: "#f3f4f6",
  color: "#111827",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Register;
