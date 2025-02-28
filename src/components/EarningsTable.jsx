import React from 'react';
import '../styles/EarningsTable.css';

const EarningsTable = ({ data }) => {
  return (
    <div className="earnings-table-container">
      <table className="earnings-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Views</th>
            <th>Platform views</th>
            <th>View Share</th>
            <th>Pool Amount</th>
            <th>Earning</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.month}</td>
              <td>{row.views.toLocaleString()}</td>
              <td>{row.platformViews.toLocaleString()}</td>
              <td>{row.viewShare}</td>
              <td>{row.poolAmount}</td>
              <td>{row.earning}</td>
              <td>
                <span className={`status-badge ${row.status === 'Paid' ? 'status-paid' : 'status-progress'}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EarningsTable;
