const staff = [
  { id: 1, name: "Reshma", role: "Dispatcher" },
  { id: 2, name: "Jithin", role: "Support" },
  { id: 3, name: "Akhil", role: "Admin" },
];

function StaffManagement() {
  return (
    <div style={{ padding: "32px" }}>
      <h1>Staff Management</h1>
      <ul>
        {staff.map((person) => (
          <li key={person.id} style={{ marginBottom: "10px" }}>
            {person.name} - {person.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffManagement;
