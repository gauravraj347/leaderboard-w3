import React, { useState, useEffect } from 'react';
import UserSelector from './components/UserSelector';
import AddUserForm from './components/AddUserForm';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import api from './api/api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [lastClaim, setLastClaim] = useState(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
    setLeaderboard(res.data);
    if (res.data.length > 0 && !selectedUser) setSelectedUser(res.data[0]._id);
  };

  const handleAddUser = async (name) => {
    await api.post('/users', { name });
    fetchUsers();
  };

  const handleClaim = async () => {
    if (!selectedUser) return;
    const res = await api.post('/claims/claim', { userId: selectedUser });
    setLastClaim({
      name: res.data.user.name,
      points: res.data.points
    });
    setLeaderboard(res.data.leaderboard);
    fetchUsers();
    setHistoryRefresh(r => r + 1); // trigger claim history refresh
  };

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      <div className="controls">
        <UserSelector users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ClaimButton onClaim={handleClaim} />
        <AddUserForm onAddUser={handleAddUser} />
      </div>
      {lastClaim && (
        <div className="last-claim">
          <strong>{lastClaim.name}</strong> claimed <strong>{lastClaim.points}</strong> points!
        </div>
      )}
      <Leaderboard users={leaderboard} />
      <ClaimHistory historyRefresh={historyRefresh} />
    </div>
  );
}

export default App;
