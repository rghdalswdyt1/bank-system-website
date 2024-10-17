import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DataContextFunction from './context/context';
import Layout from './components/layout/Layout.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import CreateAccount from './components/CreateAccount/CreateAccount.jsx';
import WelcomePage from './components/WelcomePage/WelcomePage.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import { ToastContainer } from 'react-toastify';
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';
import Protected from './components/Protucted/Protucted.jsx';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated/RedirectIfAuthenticated.jsx';
import AllAccounts from './components/AllAccounts/AllAccounts.jsx';
import Withdra from './components/Withdraw/Withdraw.jsx';
import Deposit from './components/Deposit/Deposit.jsx';
import Transfer from './components/Transfer/Transfer.jsx';
import Transactions from './components/Transactions/Transactions.jsx';
import IncomingTransactions from './components/IncomingTransactions/IncomingTransactions.jsx';
import Profile from './components/Profile/Profile.jsx';
import Notfoundpage from './components/Notfoundpage/Notfoundpage.jsx';
import Otp from './components/otp/Otp.jsx';

export default function App() {
  // Set up the router
  let router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: '/HomePage', element: <Protected><HomePage /></Protected> },
        { path: '/dashboard', element: <Protected><Dashboard /></Protected> },
        { 
          path: '/login', 
          element: <RedirectIfAuthenticated><Login /></RedirectIfAuthenticated> 
        },  
        { 
          path: '/signup', 
          element: <RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated> 
        },
        { 
          path: '/Otp-verification', 
          element: <RedirectIfAuthenticated><Otp/></RedirectIfAuthenticated> 
        },
        { path: '/forgot-password', element: <ForgetPassword /> },
        { path: '/create-account', element: <Protected><CreateAccount /></Protected> },
        {
          path: '/all-accounts', element: <Protected><AllAccounts /></Protected>
        },
        {
          path: '/withdraw', element: <Protected><Withdra /></Protected>
        },
        {
          path: '/deposit', element: <Protected><Deposit /></Protected>
        },
        {
          path: '/transfer', element: <Protected><Transfer /></Protected>
        },
        {
          path: '/transactions', element: <Protected><Transactions /></Protected>
        },
        {
          path: '/incoming-transactions', element: <Protected><IncomingTransactions /></Protected>
        },
        {
          path: '/profile', element: <Protected><Profile /></Protected>
        },
        {
          path: '/transactions', element: <Protected><Transactions /></Protected>
        },
        {path:"*",element:<Notfoundpage/>}
        
      ]
    }
  ]);

  return (
    <DataContextFunction>
      <RouterProvider router={router} />
      <ToastContainer theme="colored" />
    </DataContextFunction>
  );
}
