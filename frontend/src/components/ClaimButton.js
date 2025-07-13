import React from 'react';

function ClaimButton({ onClaim }) {
  return (
    <button className="claim-btn" onClick={onClaim}>
      Claim Points
    </button>
  );
}

export default ClaimButton;
