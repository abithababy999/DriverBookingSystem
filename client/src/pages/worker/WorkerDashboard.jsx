import BackButton from "../../components/common/BackButton";

function WorkerDashboard() {
  return (
    <div style={{ padding: "32px" }}>
      <BackButton />
      <h1>Worker Dashboard</h1>
      <p>Available Jobs: 4</p>
      <p>Today’s Income: ₹980</p>
      <p>Status: Online</p>
    </div>
  );
}

export default WorkerDashboard;
