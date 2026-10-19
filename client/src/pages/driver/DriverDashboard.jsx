import BackButton from "../../components/common/BackButton";

function DriverDashboard() {
  return (
    <div style={{ padding: "32px" }}>
      <BackButton />
      <h1>Driver Dashboard</h1>
      <p>Available Jobs: 5</p>
      <p>Earnings Today: ₹1,250</p>
      <p>Status: Available</p>
    </div>
  );
}

export default DriverDashboard;
