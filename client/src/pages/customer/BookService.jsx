import { useState } from "react";
import BackButton from "../../components/common/BackButton";

const availableServices = ["Driver", "Plumber", "Electrician", "Cleaner"];

function BookService() {
  const [form, setForm] = useState({
    customerName: "Rahul",
    phone: "+91 98765 12345",
    pickup: "Mukkom",
    destination: "Kozhikode",
    date: "2026-10-20",
    service: "Driver",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const estimatedFare = 450;
    alert(
      `Booking created for ${form.customerName}. Estimated fare: ₹${estimatedFare}. ` +
        `Pickup: ${form.pickup} to ${form.destination}. Service: ${form.service}`
    );
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <BackButton />
      <h1>Book a Service</h1>
      <p>Local service booking for Mukkom / Kozhikode area</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
        <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="Customer Name" style={inputStyle} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" style={inputStyle} />
        <input name="pickup" value={form.pickup} onChange={handleChange} placeholder="Pickup Location" style={inputStyle} />
        <input name="destination" value={form.destination} onChange={handleChange} placeholder="Destination" style={inputStyle} />
        <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />

        <select name="service" value={form.service} onChange={handleChange} style={inputStyle}>
          {availableServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        <div style={{ background: "#f3f4f6", padding: "12px 16px", borderRadius: "8px" }}>
          Estimated charge: <strong>₹450</strong>
        </div>

        <button type="submit" style={buttonStyle}>Confirm Booking</button>
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
