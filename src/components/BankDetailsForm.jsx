import React, { useState } from 'react';
import Button from './Button';
import '../styles/BankDetailsForm.css';

const BankDetailsForm = ({ onClose }) => {
  const [accountType, setAccountType] = useState('Savings');
  const [accountHolder, setAccountHolder] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your server
    console.log('Saving bank details:', { accountType, accountHolder, ifscCode, accountNumber });
    // Close the modal after saving
    onClose();
  };

  return (
    <form className="bank-details-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Account Type</label>
        <div className="account-type-options">
          <button
            type="button"
            className={`account-type-button ${accountType === 'Savings' ? 'active' : ''}`}
            onClick={() => setAccountType('Savings')}
          >
            Savings
          </button>
          <button
            type="button"
            className={`account-type-button ${accountType === 'Current' ? 'active' : ''}`}
            onClick={() => setAccountType('Current')}
          >
            Current
          </button>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="accountHolder">Account holder Name</label>
        <input
          id="accountHolder"
          type="text"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          placeholder="John doe"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="ifscCode">IFSC Code</label>
        <input
          id="ifscCode"
          type="text"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          placeholder="SBIN9798979809"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="accountNumber">Account Number</label>
        <input
          id="accountNumber"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="SBIN9798979809"
          required
        />
      </div>

      <div className="form-actions">
        <Button type="primary">Save Changes</Button>
      </div>
    </form>
  );
};

export default BankDetailsForm;
