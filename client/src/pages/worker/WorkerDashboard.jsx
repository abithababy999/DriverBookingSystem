import BackButton from "../../components/common/BackButton";

const assignedJobs = [
  {
    id: 1,
    customer: "Abitha",
    service: "Plumber",
    location: "House No. 12, Kunnamangalam, Kozhikode",
    issue: "Water leakage in bathroom pipe",
    time: "Today, 02:00 PM",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Nisha",
    service: "Electrician",
    location: "Near Town Hall, Vatakara",
    issue: "Fan and switch not working",
    time: "Today, 04:30 PM",
    status: "Accepted",
  },
  {
    id: 3,
    customer: "Meera",
    service: "Cleaner",
    location: "Kuttikkattoor, Kozhikode",
    issue: "Kitchen deep cleaning service",
    time: "Tomorrow, 10:00 AM",
    status: "Scheduled",
  },
];

function WorkerDashboard() {
  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <BackButton />
      <h1>Worker Dashboard</h1>
      <p>Available Jobs: {assignedJobs.length}</p>
      <p>Today’s Income: ₹980</p>
      <p>Status: Online</p>

      <div style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
        {assignedJobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px",
              background: "#f9fafb",
            }}
          >
            <h3 style={{ margin: "0 0 8px" }}>{job.service} Request</h3>
            <p style={{ margin: "4px 0" }}><strong>Customer:</strong> {job.customer}</p>
            <p style={{ margin: "4px 0" }}><strong>Location:</strong> {job.location}</p>
            <p style={{ margin: "4px 0" }}><strong>Issue:</strong> {job.issue}</p>
            <p style={{ margin: "4px 0" }}><strong>Time:</strong> {job.time}</p>
            <p style={{ margin: "4px 0" }}><strong>Status:</strong> {job.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkerDashboard;
