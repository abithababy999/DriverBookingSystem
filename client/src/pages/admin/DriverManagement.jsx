const drivers = [
  { id: 1, name: "Anoop", status: "Available", area: "Mukkom" },
  { id: 2, name: "Babu", status: "Busy", area: "Kozhikode" },
  { id: 3, name: "Shaji", status: "Available", area: "Perambra" },
];

function DriverManagement() {
  return (
    <div style={{ padding: "32px" }}>
      <h1>Driver Management</h1>
      <ul>
        {drivers.map((driver) => (
          <li key={driver.id} style={{ marginBottom: "10px" }}>
            {driver.name} - {driver.status} - {driver.area}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverManagement;
