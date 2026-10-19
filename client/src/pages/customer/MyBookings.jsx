import BackButton from "../../components/common/BackButton";

const bookings = [
  { id: 1, customer: "Rahul", destination: "Kozhikode", status: "Assigned" },
  { id: 2, customer: "Anu", destination: "Mukkom", status: "Completed" },
  { id: 3, customer: "Nikhil", destination: "Perambra", status: "Pending" },
];

function MyBookings() {
  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <BackButton />
      <h1>My Bookings</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Customer</th>
            <th style={cellStyle}>Destination</th>
            <th style={cellStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td style={cellStyle}>{booking.id}</td>
              <td style={cellStyle}>{booking.customer}</td>
              <td style={cellStyle}>{booking.destination}</td>
              <td style={cellStyle}>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #e5e7eb",
  padding: "12px",
  textAlign: "left",
};

export default MyBookings;
