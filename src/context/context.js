import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let DataContext = createContext();

export default function DataContextFunction({ children }) {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [allAccounts, setAllAccounts] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupStatus, setPopupStatus] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [incomingTransfers, setIncomingTransfers] = useState([]);

    const API_ENDPOINTS = {
        defaultAccount: 'https://bank-system-backend.vercel.app/apis/accountBank/default-account',
        allAccounts: 'https://bank-system-backend.vercel.app/apis/accountBank/accounts',
        createAccount: 'https://bank-system-backend.vercel.app/apis/accountBank/create',
        withdraw: 'https://bank-system-backend.vercel.app/apis/transaction/withdraw',
        deposit: 'https://bank-system-backend.vercel.app/apis/transaction/deposit',
        transfer: 'https://bank-system-backend.vercel.app/apis/transaction/transfer',
        myTransactions: 'https://bank-system-backend.vercel.app/apis/transaction/my-transactions',
        incomingTransfers: 'https://bank-system-backend.vercel.app/apis/transaction/incoming-transfers',
        deleteAccount: 'https://bank-system-backend.vercel.app/apis/accountBank/delete',
    };

    const fetchDefaultAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_ENDPOINTS.defaultAccount, {
                headers: { Authorization: token },
            });
            setDefaultAccount(response.data);
        } catch (error) {
            console.error("Error fetching default account:", error);
        }
    };

    const fetchAllAccounts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_ENDPOINTS.allAccounts, {
                headers: { Authorization: token },
            });
            setAllAccounts(response.data);
            console.log('Fetched accounts:', response.data); // تأكيد البيانات
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    useEffect(() => {
        fetchDefaultAccount();
        fetchAllAccounts();
    }, []);

    const createNewAccount = async (accountType = 'Personal account') => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(API_ENDPOINTS.createAccount, { accountType }, {
                headers: { Authorization: token },
            });
            setPopupStatus('success');
            setPopupMessage('Account created successfully!');
            setPopupVisible(true);
            await fetchAllAccounts(); // تحديث قائمة الحسابات بعد إنشاء حساب جديد
        } catch (error) {
            setPopupStatus('error');
            setPopupMessage('Error creating account!');
            setPopupVisible(true);
        }
    };
    const withdrawAmount = async (accountNumber, amount) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_ENDPOINTS.withdraw, { accountNumber, amount }, {
                headers: { Authorization: token },
            });
            setPopupStatus('success');
            setPopupMessage(response.data.message || 'Withdrawal successful!');
            setPopupVisible(true);
            await fetchDefaultAccount();
            await fetchAllAccounts();
            await fetchTransactions(); // تحديث قائمة المعاملات بعد السحب
        } catch (error) {
            setPopupStatus('error');
            setPopupMessage(error.response?.data?.message || 'Error during withdrawal!');
            setPopupVisible(true);
        }
    };
    
    const depositAmount = async (accountNumber, amount) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_ENDPOINTS.deposit, { accountNumber, amount }, {
                headers: { Authorization: token },
            });
            setPopupStatus('success');
            setPopupMessage(`${response.data.message} <br/> Your Balance is: ${response.data.balance} $`);
            setPopupVisible(true);
            await fetchDefaultAccount();
            await fetchAllAccounts();
            await fetchTransactions(); // تحديث قائمة المعاملات بعد الإيداع
        } catch (error) {
            setPopupStatus('error');
            setPopupMessage(error.response?.data?.message || 'Error during deposit!');
            setPopupVisible(true);
        }
    };
    
    const transferAmount = async (fromAccountNumber, toAccountNumber, amount) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_ENDPOINTS.transfer, { fromAccountNumber, toAccountNumber, amount }, {
                headers: { Authorization: token },
            });
            setPopupStatus('success');
            setPopupMessage(response.data.message);
            setPopupVisible(true);
            await fetchDefaultAccount();
            await fetchAllAccounts();
            await fetchTransactions(); // تحديث قائمة المعاملات بعد التحويل
        } catch (error) {
            setPopupStatus('error');
            setPopupMessage(error.response?.data?.message || 'Error during transfer!');
            setPopupVisible(true);
        }
    };
    
   

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_ENDPOINTS.myTransactions, {
                headers: { Authorization: token },
            });
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const fetchIncomingTransfers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_ENDPOINTS.incomingTransfers, {
                headers: { Authorization: token },
            });
            setIncomingTransfers(response.data);
        } catch (error) {
            console.error("Error fetching incoming transfers:", error);
        }
    };

    const deleteAccount = async (accountId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_ENDPOINTS.deleteAccount}/${accountId}`, {
                headers: { Authorization: token },
            });
            setPopupStatus('success');
            setPopupMessage('Account deleted successfully!');
            setPopupVisible(true);
            await fetchAllAccounts(); // تحديث الحسابات بعد الحذف
        } catch (error) {
            setPopupStatus('error');
            setPopupMessage(error.response?.data?.message || 'Error deleting account!');
            setPopupVisible(true);
        }
    };

    // Fetch transactions and incoming transfers when the component loads
    useEffect(() => {
        fetchTransactions();
        fetchIncomingTransfers();
    }, []);

    return (
        <DataContext.Provider
            value={{
                defaultAccount,
                allAccounts,
                createNewAccount,
                fetchDefaultAccount,
                fetchAllAccounts,
                fetchTransactions,
                API_ENDPOINTS,
                fetchIncomingTransfers,
                isPopupVisible,
                setPopupVisible,
                withdrawAmount,
                depositAmount,
                transferAmount,
                popupMessage,
                popupStatus,
                transactions,
                incomingTransfers,
                deleteAccount,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
