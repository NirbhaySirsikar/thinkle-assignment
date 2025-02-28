import React, { useState } from 'react';
import Button from '../components/Button';
import EarningsCard from '../components/EarningsCard';
import EarningsTable from '../components/EarningsTable';
import Modal from '../components/Modal';
import BankDetailsForm from '../components/BankDetailsForm';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for the earnings table
  const earningsData = [
    {
      month: 'January 2025',
      views: 18930,
      platformViews: 918930,
      viewShare: '1.93%',
      poolAmount: '₹450,980',
      earning: '₹8,980',
      status: 'Paid'
    },
    {
      month: 'December 2024',
      views: 15650,
      platformViews: 915650,
      viewShare: '1.78%',
      poolAmount: '₹400,000',
      earning: '₹7,000',
      status: 'In Progress'
    }
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Thinkle+ Creator</h1>
          <p>Create Content that generate revenue for you</p>
        </div>
        <Button onClick={openModal}>Add Bank Details</Button>
      </div>

      <div className="earnings-overview">
        <EarningsCard
          title="Monthly Earnings"
          amount="8.5K"
          period="vs last month"
          change="26%"
        />
        <EarningsCard
          title="Lifetime Earnings"
          amount="₹14990"
          period="Since January"
        />
        <EarningsCard
          title="Pending Payout"
          amount="₹7490"
          period="November"
        />
      </div>

      <div className="section-container">
        <EarningsTable data={earningsData} />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Bank Account Details">
        <BankDetailsForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Dashboard;
