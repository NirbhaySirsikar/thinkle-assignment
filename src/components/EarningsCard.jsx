import React from 'react';
import '../styles/EarningsCard.css';

const EarningsCard = ({ title, amount, period, change }) => {
  return (
    <div className="earnings-card">
      <div className="earnings-card-header">
        <div className="earnings-card-title">{title}</div>
        {change && <div className="earnings-change">↑ {change}</div>}
      </div>
      <div className="earnings-amount">{amount}</div>
      <div className="earnings-period">{period}</div>
    </div>
  );
};

export default EarningsCard;
