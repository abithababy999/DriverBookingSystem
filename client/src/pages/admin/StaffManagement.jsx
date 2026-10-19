import BackButton from "../../components/common/BackButton";

const staff = [
  { id: 1, name: "Reshma", role: "Dispatcher", phone: "+91 99887 76543" },
  { id: 2, name: "Jithin", role: "Support", phone: "+91 99666 55443" },
  { id: 3, name: "Akhil", role: "Admin", phone: "+91 98555 66554" },
];

function StaffManagement() {
  return (
    <div style={{ padding: "32px" }}>
      <BackButton />
      <h1>Staff Management</h1>
      <ul>
        {staff.map((person) => (
          <li key={person.id} style={{ marginBottom: "12px" }}>
            <strong>{person.name}</strong> - {person.role} - {person.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffManagement;
