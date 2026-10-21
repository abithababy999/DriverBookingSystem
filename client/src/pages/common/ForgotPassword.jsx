import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByIdentifier, resetPassword } from "../../service/authService";

function ForgotPassword() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendOtp = () => {
    const trimmedValue = identifier.trim();

    if (!trimmedValue) {
      setError("Please enter your email, username, or mobile number.");
      return;
    }

    const user = findUserByIdentifier(trimmedValue);

    if (!user) {
      setError("No account found with that email, username, or mobile number.");
      return;
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setOtpSent(true);
    setError("");
    setSuccess(`OTP sent successfully to ${user.email || user.phone}. Demo OTP: ${otp}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier.trim()) {
      setError("Please enter your email, username, or mobile number.");
      return;
    }

    if (!otpSent) {
      setError("Please send the OTP first.");
      return;
    }

    if (otpInput !== generatedOtp) {
      setError("OTP does not match. Please try again.");
      return;
    }

    if (!newPassword.trim() || newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      resetPassword(identifier, newPassword);
      setError("");
      setSuccess("Password reset successful. Redirecting to login...");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "60px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Forgot Password</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email, username, or mobile number"
          style={inputStyle}
        />

        <button type="button" onClick={sendOtp} style={secondaryButtonStyle}>Send OTP</button>

        {otpSent && (
          <>
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="Enter OTP"
              style={inputStyle}
            />

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              style={inputStyle}
            />
          </>
        )}

        <button type="submit" style={buttonStyle}>Reset Password</button>
      </form>

      <p style={{ marginTop: "16px" }}>
        <Link to="/login">Back to login</Link>
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

const secondaryButtonStyle = {
  padding: "12px 16px",
  background: "#f3f4f6",
  color: "#111827",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default ForgotPassword;
