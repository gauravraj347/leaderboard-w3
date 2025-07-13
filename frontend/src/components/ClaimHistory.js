import React, { useEffect, useState } from 'react';
import api from '../api/api';

function ClaimHistory({ historyRefresh }) {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchHistory(page);
    // eslint-disable-next-line
  }, [page, historyRefresh]);

  const fetchHistory = async (pg) => {
    const res = await api.get(`/claims/history?page=${pg}&limit=10`);
    setHistory(res.data.history);
    setTotalPages(res.data.totalPages);
  };

  return (
    <div className="claim-history">
      <h2>Claim History</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Points</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, idx) => (
            <tr key={item._id}>
              <td>{item.user.name}</td>
              <td>{item.pointsClaimed}</td>
              <td>{new Date(item.claimedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default ClaimHistory;
