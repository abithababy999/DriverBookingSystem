import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../../service/authService";
import BackButton from "../../components/common/BackButton";

function Home() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <BackButton label="Logout" />
      <h1>Driver Booking System</h1>
      <p>Welcome, {user?.name || "Customer"}</p>
      <p>Need a driver in your area? Book fast and safely.</p>

      <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
        <Link to="/book-service">
          <button>Book Service</button>
        </Link>
        <Link to="/my-bookings">
          <button>My Bookings</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
