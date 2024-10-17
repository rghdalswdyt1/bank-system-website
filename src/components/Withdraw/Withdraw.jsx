import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/context.js';
import './withdraw.css';
import { Helmet } from 'react-helmet';

export default function Withdraw() {
    const { withdrawAmount, isPopupVisible, setPopupVisible, popupMessage, popupStatus } = useContext(DataContext);
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleWithdraw = async () => {
        setLoading(true); // Start loading
        try {
            await withdrawAmount(accountNumber, amount); // Await the withdrawal process
        } catch (error) {
            console.error("Error during withdrawal:", error); // Handle errors here if necessary
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="withdraw-page">
             <Helmet>
                <title>withdraw</title>
                <meta name="description" content="The process of withdrawing money from your account" />
            </Helmet>
            <div className="withdraw-form-container">
                <h2>Withdraw Funds</h2>
                <div className="form-group">
                    <label>Account Number:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={accountNumber} 
                        onChange={(e) => setAccountNumber(e.target.value)} 
                        placeholder="Enter account number" 
                        style={{borderRadius:"50px"}}
                    />
                </div>
                <div className="form-group">
                    <label>Amount:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="Enter amount" 
                        style={{borderRadius:"50px"}}
                    />
                </div>
                <button style={{borderRadius:"50px"}} className="btn btn-primary" onClick={handleWithdraw} disabled={loading || !accountNumber || !amount}>
                    {loading ? 'Withdrawing...' : 'Withdraw'}
                </button>
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
