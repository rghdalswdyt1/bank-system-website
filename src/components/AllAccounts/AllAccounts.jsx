import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/context.js';
import './AllAccounts.css';
import { Helmet } from 'react-helmet';

export default function AllAccounts() {
    const { 
        allAccounts, 
        createNewAccount, 
        isPopupVisible, 
        setPopupVisible, 
        popupMessage, 
        fetchAllAccounts,
        popupStatus,
        deleteAccount  
    } = useContext(DataContext);

    const [newAccountType, setNewAccountType] = useState('Personal account');
    const [loading, setLoading] = useState(false); // حالة التحميل
    const [loadingAccounts, setLoadingAccounts] = useState(true); // حالة تحميل الحسابات
    const [deletingAccountId, setDeletingAccountId] = useState(null); // لحالة تحميل زر الحذف

    const handleCreateAccount = async () => {
        setLoading(true); // ابدأ التحميل
        await createNewAccount(newAccountType); // إنشاء الحساب الجديد
        setLoading(false); // انتهى التحميل
    };

    const handleDeleteAccount = async (accountId, accountBalance) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete this account? It may contain money (Balance: $${accountBalance}).`
        );
        
        if (confirmDelete) {
            setDeletingAccountId(accountId); 
            await deleteAccount(accountId); 
            setDeletingAccountId(null);
        } else {
            console.log('Account deletion canceled');
        }
    };

    // تحديث حالة تحميل الحسابات عند تحميل المكون
    useEffect(() => {
        const fetchAccounts = async () => {
            setLoadingAccounts(true); // ابدأ تحميل الحسابات
            await fetchAllAccounts(); // تأكد من أن الحسابات تُجلب عند تحميل الصفحة
            setLoadingAccounts(false); // انتهى تحميل الحسابات بعد الجلب
        };
        fetchAccounts();
    }, []); // تأكد من تنفيذ الدالة مرة واحدة عند التحميل

    return (
        <div className="container mt-5">
             <Helmet>
                <title>All Bank Accounts - Bank System</title>
                <meta name="description" content="Manage all your bank accounts, create new ones, and delete existing accounts in our secure bank system." />
            </Helmet>
            <h2 className="mb-4">All Bank Accounts</h2>
            <div className="row">
                {loadingAccounts ? (
                   <div className='d-flex justify-content-center '>
                   <i className="fas fa-spinner fa-spin fs-2 text-success"></i>
                   </div>
                ) : allAccounts.length > 0 ? (
                    allAccounts.map((account) => (
                        <div key={account._id} className="col-md-4">
                            <div className={`card p-4 mb-3 shadow ${document.body.classList.contains('dark-mode') ? 'dark-cardd' : 'light-cardd'}`} style={{borderRadius:"50px"}} >
                                <h5 className={`card-title `}><strong>Account Type:</strong> {account.accountType}</h5>
                                <h5 className="card-text "><strong>Account Number:</strong> {account.accountNumber}</h5>
                                <h5 className="card-text"><strong>Balance:</strong> ${account.balance}</h5>
                                
                                {account.isDefault ? (
                                    <div className="default-account-label bg-success" style={{
                                        padding: '10px',
                                        color: '#fff',
                                        borderRadius: '50px',
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}>
                                        Default account 
                                    </div>
                                ) : (
                                    <button
                                        className="btn btn-danger "
                                        onClick={() => handleDeleteAccount(account._id, account.balance)} 
                                        disabled={deletingAccountId === account._id} 
                                        style={{borderRadius: "50px"}}
                                    >
                                        {deletingAccountId === account._id ? (
                                            <i className="fas fa-spinner fa-spin"></i> 
                                        ) : (
                                            <i className="fas fa-trash"></i> 
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No accounts available.</p>
                )}
            </div>

            <div className="mt-4">
                <h4>Create a New Account</h4>
                <select className="form-select" value={newAccountType} onChange={(e) => setNewAccountType(e.target.value)} style={{borderRadius:"50px"}}>
                    <option value="Personal account">Personal Account</option>
                    <option value="Savings account">Savings Account</option>
                    <option value="Business account">Business Account</option>
                </select>
                <button
                    className="btn btn-primary mt-3"
                    onClick={handleCreateAccount}
                    style={{borderRadius:"50px"}}
                    disabled={loading} 
                >
                    {loading ? (
                        <i className="fas fa-spinner fa-spin"></i> 
                    ) : (
                        'Create Account'
                    )}
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
