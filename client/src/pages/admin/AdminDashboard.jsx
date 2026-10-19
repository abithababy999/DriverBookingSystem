import BackButton from "../../components/common/BackButton";

const stats = [
  { label: "Total Bookings", value: 128 },
  { label: "Active Drivers", value: 12 },
  { label: "Revenue", value: "₹84,500" },
  { label: "Pending Jobs", value: 7 },
];

function AdminDashboard() {
  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <BackButton />
      <h1>Admin Dashboard</h1>
      <p>Local operations dashboard for Mukkom / Kozhikode services</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginTop: "20px" }}>
        {stats.map((item) => (
          <div
            key={item.label}
            style={{
              background: "#f3f4f6",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
          >
            <p>{item.label}</p>
            <h2>{typeof item.value === "number" ? item.value : item.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
