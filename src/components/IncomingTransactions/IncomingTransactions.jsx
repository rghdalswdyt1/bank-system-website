import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/context.js'; // Adjust the path based on your folder structure
import './incomingTransaction.css'; // Assuming you're adding CSS here
import { Helmet } from 'react-helmet';

export default function IncomingTransactions() {
    const { incomingTransfers, fetchIncomingTransfers } = useContext(DataContext); // Get incoming transfers from context
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            await fetchIncomingTransfers(); // Fetch the incoming transfers
            setLoading(false); // Stop loading after data is fetched
        };

        fetchData();
    }, []);

    return (
        <div className="transactions-container">
             <Helmet>
                <title>incoming transactions</title>
                <meta name="description" content="All incoming transactions in your account" />
            </Helmet>
            {loading ? (
                <div className="loading-spinner d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                    <i className="fas fa-spinner fa-spin fs-1 text-success"></i> {/* مؤشر تحميل */}
                </div>
            ) : (
                <>
                    {incomingTransfers && incomingTransfers.length > 0 ? (
                        incomingTransfers.map((transfer) => (
                            <div className="transaction-row" key={transfer._id}>
                                <div className="account-number">
                                    <strong>From account: </strong> {transfer?.account?.accountNumber}
                                </div>
                                <div className="account-number">
                                    <strong>To account: </strong> {transfer?.toAccount?.accountNumber}
                                </div>
                                <div className="transaction-type">
                                    <span>Transfer <span className="arrow down mx-2" style={{ borderRadius:"50px"}}>&#8601;</span></span>
                                </div>
                                <div className="amount">
                                    <strong>Amount:</strong> {transfer?.amount} $
                                </div>
                                <div className="transaction-date">
                                    <strong>Date:</strong> {new Date(transfer?.transactionDate).toLocaleString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-transactions d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                            <h2>No incoming transfers available.</h2>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
