import React from 'react';
import '../styles/EarningsTable.css';

const EarningsTable = ({ data }) => {
  return (
    <div className="earnings-table-container">
      {/* Desktop table layout */}
      <table className="earnings-table desktop-view">
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

      {/* Mobile card layout */}
      <div className="mobile-earnings-cards">
        {data.map((row, index) => (
          <div className="mobile-earnings-card" key={index}>
            <div className="card-row">
              <div className="card-col">
                <div className="card-value">{row.month.split(' ')[0]}</div>
                <div className="card-label">Month</div>
              </div>
              <div className="card-col">
                <div className="card-value">{row.views.toLocaleString()}</div>
                <div className="card-label">Views</div>
              </div>
            </div>

            <div className="card-row">
              <div className="card-col">
                <div className="card-value">{row.platformViews.toLocaleString()}</div>
                <div className="card-label">Platform Views</div>
              </div>
              <div className="card-col">
                <div className="card-value">{row.viewShare}</div>
                <div className="card-label">Views Share</div>
              </div>
            </div>

            <div className="card-row">
              <div className="card-col">
                <div className="card-value">{row.poolAmount}</div>
                <div className="card-label">Pool Amount</div>
              </div>
              <div className="card-col">
                <div className="card-value">{row.earning}</div>
                <div className="card-label">Earning</div>
              </div>
            </div>

            <div className="card-row">
              <div className="card-col">
                <div className="card-value">
                  <span className="mobile-status-badge">
                    Paid
                  </span>
                  {row.status === 'Paid' && <span className="status-badge status-paid">Paid</span>}
                </div>
                <div className="card-label">Status</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsTable;