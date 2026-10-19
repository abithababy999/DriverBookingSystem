import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Driver Booking System</h1>

      <Link to="/book-service">
        <button>Book Service</button>
      </Link>

      <Link to="/admin">
        <button>Admin</button>
      </Link>

      <Link to="/worker">
        <button>Worker</button>
      </Link>
    </div>
  );
}

export default Home;