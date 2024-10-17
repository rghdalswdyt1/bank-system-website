import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/context.js';
import './deposit.css';
import { Helmet } from 'react-helmet';

export default function Deposit() {
    const { depositAmount, isPopupVisible, setPopupVisible, popupMessage, popupStatus } = useContext(DataContext);
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false); // حالة التحميل

    const handleDeposit = async () => {
        setLoading(true); // البدء في التحميل
        await depositAmount(accountNumber, amount); // انتظار اكتمال عملية الإيداع
        setLoading(false); // إيقاف التحميل بعد الانتهاء
    };

    return (
        <div className="deposit-page">
              <Helmet>
                <title>Deposit Funds - Bank System</title>
                <meta name="description" content="Deposit funds into your bank account securely and easily using the account number and amount." />
            </Helmet>
            <div className="deposit-form-container">
                <h2>Deposit Funds</h2>
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
                        style={{borderRadius:"50px"}}/>
                </div>

                {/* إظهار مؤشر التحميل عند الضغط على زر الإيداع */}
                <button
                    className="btn btn-primary"
                    onClick={handleDeposit}
                    style={{borderRadius:"50px"}}
                    disabled={loading || !accountNumber || !amount} // تعطيل الزر إذا كانت الحقول فارغة
                >
                    {loading ? (
                        'Depositing' // عرض مؤشر تحميل
                    ) : (
                        'Deposit'
                    )}
                </button>

                {/* عرض رسالة التأكيد أو الخطأ */}
                {isPopupVisible && (
                    <div className="popup">
                        <div className={`popup-content ${popupStatus === 'success' ? 'popup-success' : 'popup-error'}`}>
                            <h5 className="close-btn text-danger" onClick={() => setPopupVisible(false)}>&times;</h5>
                            {popupStatus === 'success' ? (
                                <i className="fas fa-check-circle fa-3x text-success"></i>
                            ) : (
                                <i className="fas fa-times-circle fa-3x text-danger"></i>
                            )}
                            {/* Use dangerouslySetInnerHTML to display the popupMessage with HTML */}
                            <h5 className='text-dark' dangerouslySetInnerHTML={{ __html: popupMessage }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
