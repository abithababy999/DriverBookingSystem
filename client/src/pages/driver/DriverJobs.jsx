import BackButton from "../../components/common/BackButton";

const jobs = [
  { id: 1, route: "Mukkom to Kozhikode", fare: "₹450", status: "Assigned" },
  { id: 2, route: "Perambra to Calicut", fare: "₹600", status: "Pending" },
];

function DriverJobs() {
  return (
    <div style={{ padding: "32px" }}>
      <BackButton />
      <h1>Driver Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} style={{ marginBottom: "12px" }}>
            {job.route} - {job.fare} - {job.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverJobs;
