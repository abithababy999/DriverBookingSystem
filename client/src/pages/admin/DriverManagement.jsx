import BackButton from "../../components/common/BackButton";

const drivers = [
  { id: 1, name: "Anoop", status: "available", area: "Mukkom", vehicle: "Car", rating: 4.8 },
  { id: 2, name: "Babu", status: "busy", area: "Kozhikode", vehicle: "Car", rating: 4.6 },
  { id: 3, name: "Shaji", status: "available", area: "Perambra", vehicle: "Auto", rating: 4.9 },
  { id: 4, name: "Ravi", status: "available", area: "Kallayi", vehicle: "Car", rating: 4.7 },
];

function DriverManagement() {
  return (
    <div style={{ padding: "32px" }}>
      <BackButton />
      <h1>Driver Management</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Vehicle</th>
            <th style={cellStyle}>Area</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td style={cellStyle}>{driver.name}</td>
              <td style={cellStyle}>{driver.vehicle}</td>
              <td style={cellStyle}>{driver.area}</td>
              <td style={cellStyle}>{driver.status}</td>
              <td style={cellStyle}>{driver.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #e5e7eb",
  padding: "10px 12px",
  textAlign: "left",
};

export default DriverManagement;
