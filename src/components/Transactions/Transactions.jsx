import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/context.js';
import './Transactions.css';
import { Helmet } from 'react-helmet';

export default function Transactions() {
    const { transactions, fetchTransactions } = useContext(DataContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
          setLoading(true); // عرض حالة التحميل
          await fetchTransactions(); // جلب العمليات
          setLoading(false); // إيقاف حالة التحميل بعد الجلب
      };
  
      fetchData();
  }, []);
  
    return (
      <div className="transactions-container" >
         <Helmet>
                <title>transactions</title>
                <meta name="description" content="All the transactions you have performed deposit and withdraw and transfer " />
            </Helmet>
          {loading ? (
              <div className="loading d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                  <i className="fas fa-spinner fa-spin fs-1 text-success"></i>
              </div>
          ) : transactions.length > 0 ? (
              transactions.map((transaction) => (
                  <div 
                      key={transaction._id} 
                      className="transaction-row" 
                      style={{ 
                          justifyContent: transaction.type === 'Withdraw' ? 'flex-end' : transaction.type === 'Transfer' ? 'flex-end' : 'flex-start' 
                      }}
                  >
                      <div className="account-number">
                          Account Number: {transaction?.account?.accountNumber}
                      </div>
                      <div className="account-type">
                          Account Type: {transaction?.account?.accountType}
                      </div>
                      <div className="is-default">
                          {transaction?.account?.isDefault ? 'Default Account' : 'Secondary Account'}
                      </div>
                      <div className="transaction-type">
                          Transaction: {transaction.type}
                          {transaction.type === 'Transfer' ? (
                              <span className="arrow up   mx-2" style={{ borderRadius:"50px" }}>&#8599;</span>
                          ) : transaction.type === 'Withdrawal' ? (
                              <span className="arrow up   mx-2" style={{borderRadius:"50px" }}>&#8599;</span>
                          ) : (
                              <span className="arrow down  mx-2" style={{ borderRadius:"50px"}}>&#8601;</span>
                          )}
                      </div>
                      <div className="amount">
                          Amount: ${transaction?.amount}
                      </div>
                      <div className="transaction-date">
                          Date: {new Date(transaction?.transactionDate).toLocaleString()}
                      </div>
                  </div>
              ))
          ) : (
              <div className="no-transactions d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                  <h2>No transactions found.</h2>
              </div>
          )}
      </div>
  );
}
