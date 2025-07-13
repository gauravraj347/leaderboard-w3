import React from 'react';

function UserSelector({ users, selectedUser, setSelectedUser }) {
  return (
    <select value={selectedUser || ''} onChange={e => setSelectedUser(e.target.value)}>
      {users.map(user => (
        <option key={user._id} value={user._id}>{user.name}</option>
      ))}
    </select>
  );
}

export default UserSelector;
