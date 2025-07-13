import React, { useState } from 'react';

function AddUserForm({ onAddUser }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name required');
      return;
    }
    try {
      await onAddUser(name.trim());
      setName('');
      setError('');
    } catch {
      setError('Could not add user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <input
        type="text"
        placeholder="Add user..."
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Add</button>
      {error && <span className="error">{error}</span>}
    </form>
  );
}

export default AddUserForm;
