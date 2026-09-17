import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface ProfileProps {
  user: User | null;
  logout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, logout }) => {
  if (!user) return null;

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={logout} style={{ marginTop: '20px' }}>Log out</button>
    </div>
  );
};

export default Profile;
