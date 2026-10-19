const USERS_KEY = 'driver_booking_users';
const AUTH_KEY = 'driver_booking_auth';

const defaultUsers = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@driverbooking.com',
    password: 'admin123',
    role: 'admin',
  },
];

export function seedUsers() {
  const existingUsers = localStorage.getItem(USERS_KEY);

  if (!existingUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

export function getUsers() {
  const storedUsers = localStorage.getItem(USERS_KEY);
  return storedUsers ? JSON.parse(storedUsers) : defaultUsers;
}

export function registerUser(formData) {
  const users = getUsers();
  const emailExists = users.some(
    (user) => user.email.toLowerCase() === formData.email.toLowerCase()
  );

  if (emailExists) {
    throw new Error('This email is already registered. Please log in instead.');
  }

  const selectedRole = formData.role === 'worker' ? 'worker' : 'user';

  const newUser = {
    id: `${selectedRole}-${Date.now()}`,
    name: formData.name,
    email: formData.email,
    password: formData.password,
    role: selectedRole,
  };

  const updatedUsers = [...users, newUser];
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));

  return newUser;
}

export function loginUser(email, password) {
  const users = getUsers();
  const matchedUser = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );

  if (!matchedUser) {
    throw new Error('Invalid email or password.');
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(matchedUser));
  return matchedUser;
}

export function getCurrentUser() {
  const savedUser = localStorage.getItem(AUTH_KEY);
  return savedUser ? JSON.parse(savedUser) : null;
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}
