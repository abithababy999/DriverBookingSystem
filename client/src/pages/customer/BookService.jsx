import { useState } from "react";

function BookService() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    pickup: "",
    destination: "",
    date: "",
    service: "Driver",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking request created for ${form.customerName}`);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Book a Driver</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
        <input
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          placeholder="Customer Name"
          style={inputStyle}
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          style={inputStyle}
        />

        <input
          name="pickup"
          value={form.pickup}
          onChange={handleChange}
          placeholder="Pickup Location"
          style={inputStyle}
        />

        <input
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
          style={inputStyle}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={inputStyle}
        />

        <select name="service" value={form.service} onChange={handleChange} style={inputStyle}>
          <option value="Driver">Driver</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Cleaner">Cleaner</option>
        </select>

        <button type="submit" style={buttonStyle}>Book Now</button>
      </form>
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

export default BookService;
