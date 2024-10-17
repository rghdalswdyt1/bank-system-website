import './transfer.css'
import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/context.js';
import { Helmet } from 'react-helmet';

export default function Transfer() {
  const { transferAmount, isPopupVisible, setPopupVisible, popupMessage, popupStatus } = useContext(DataContext);
  const [fromAccountNumber, setFromAccountNumber] = useState('');
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
      e.preventDefault();
      if (fromAccountNumber && toAccountNumber && amount) {
          setLoading(true); // Start loading
          try {
              await transferAmount(fromAccountNumber, toAccountNumber, amount); // Await the transfer operation
          } catch (error) {
              console.error("Error during transfer:", error); // Handle errors here if necessary
          } finally {
              setLoading(false); // Stop loading
          }
      }
  };

  return (
      <div className="transfer-page">
        <Helmet>
                <title>transfer transaction</title>
                <meta name="description" content="Transfer money from your account to another account" />
            </Helmet>
          <div className="transfer-form-container">
              <form onSubmit={handleTransfer}>
                  <h2>Transfer Funds</h2>
                  <div className="form-group">
                      <label htmlFor="fromAccountNumber">From Account Number:</label>
                      <input
                          type="text"
                          id="fromAccountNumber"
                          className="form-control"
                          value={fromAccountNumber}
                          onChange={(e) => setFromAccountNumber(e.target.value)}
                          required
                          style={{borderRadius:"50px"}}
                      />
                  </div>

                  <div className="form-group">
                      <label htmlFor="toAccountNumber">To Account Number:</label>
                      <input
                          type="text"
                          id="toAccountNumber"
                          className="form-control"
                          value={toAccountNumber}
                          onChange={(e) => setToAccountNumber(e.target.value)}
                          required
                          style={{borderRadius:"50px"}}
                      />
                  </div>

                  <div className="form-group">
                      <label htmlFor="amount">Amount:</label>
                      <input
                          type="number"
                          id="amount"
                          className="form-control"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          style={{borderRadius:"50px"}}
                      />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{borderRadius:"50px"}} disabled={loading || !toAccountNumber ||!fromAccountNumber || !amount}>
                      {loading ? 'Transferring...' : 'Transfer'}
                  </button>
              </form>
          </div>
          {isPopupVisible && (
              <div className="popup">
                  <div className={`popup-content ${popupStatus === 'success' ? 'popup-success' : 'popup-error'}`}>
                      <h5 className="close-btn text-danger" onClick={() => setPopupVisible(false)}>&times;</h5>
                      {popupStatus === 'success' ? (
                          <i className="fas fa-check-circle fa-3x text-success"></i>
                      ) : (
                          <i className="fas fa-times-circle fa-3x text-danger"></i>
                      )}
                      <h5 className='text-dark'>{popupMessage}</h5>
                  </div>
              </div>
          )}
      </div>
  );
}
