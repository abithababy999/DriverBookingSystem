const bookingList = [
  { id: 1, name: "Aisha", destination: "Kozhikode", status: "Confirmed" },
  { id: 2, name: "Naseef", destination: "Calicut", status: "Pending" },
];

function BookingManagement() {
  return (
    <div style={{ padding: "32px" }}>
      <h1>Booking Management</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Destination</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookingList.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.destination}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingManagement;
