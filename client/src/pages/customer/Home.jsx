import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <h1>Driver Booking System</h1>
      <p>Need a driver in your area? Book fast and safely.</p>

      <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
        <Link to="/book-service">
          <button>Book Service</button>
        </Link>
        <Link to="/my-bookings">
          <button>My Bookings</button>
        </Link>
        <Link to="/admin">
          <button>Admin</button>
        </Link>
        <Link to="/worker">
          <button>Driver</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
