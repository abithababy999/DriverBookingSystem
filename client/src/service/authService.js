const USERS_KEY = 'driver_booking_users';
const AUTH_KEY = 'driver_booking_auth';

const defaultUsers = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@driverbooking.com',
    username: 'admin',
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

  const usernameExists = users.some(
    (user) => user.username && user.username.toLowerCase() === formData.username.toLowerCase()
  );

  if (emailExists) {
    throw new Error('This email is already registered. Please log in instead.');
  }

  if (usernameExists) {
    throw new Error('This username is already taken. Please choose another one.');
  }

  const selectedRole = formData.role === 'worker' ? 'worker' : 'user';

  const newUser = {
    id: `${selectedRole}-${Date.now()}`,
    name: formData.name,
    email: formData.email,
    username: formData.username,
    phone: formData.phone,
    role: selectedRole,
    password: formData.password,
    location: formData.location || '',
    details: formData.details || '',
  };

  const updatedUsers = [...users, newUser];
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));

  return newUser;
}

export function loginUser(usernameOrEmail, password) {
  const users = getUsers();
  const matchedUser = users.find((user) => {
    const loginValue = (user.username || user.email || '').toLowerCase();
    const inputValue = (usernameOrEmail || '').toLowerCase();

    return (
      (loginValue === inputValue || user.email.toLowerCase() === inputValue) &&
      user.password === password
    );
  });

  if (!matchedUser) {
    throw new Error('Invalid username/email or password.');
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(matchedUser));
  return matchedUser;
}

export function findUserByIdentifier(identifier) {
  const users = getUsers();
  const value = (identifier || '').trim().toLowerCase();

  if (!value) return null;

  return users.find((user) => {
    const emailMatch = user.email && user.email.toLowerCase() === value;
    const usernameMatch = user.username && user.username.toLowerCase() === value;
    const phoneMatch = user.phone && String(user.phone).replace(/\D/g, '') === value.replace(/\D/g, '');
    return emailMatch || usernameMatch || phoneMatch;
  }) || null;
}

export function resetPassword(identifier, newPassword) {
  const user = findUserByIdentifier(identifier);

  if (!user) {
    throw new Error('No user found with that email, username, or mobile number.');
  }

  const users = getUsers().map((item) =>
    item.id === user.id ? { ...item, password: newPassword } : item
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === user.id) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ ...currentUser, password: newPassword }));
  }

  return { ...user, password: newPassword };
}

export function getCurrentUser() {
  const savedUser = localStorage.getItem(AUTH_KEY);
  return savedUser ? JSON.parse(savedUser) : null;
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}
