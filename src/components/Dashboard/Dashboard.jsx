import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/context.js';
import { Helmet } from 'react-helmet';

export default function Dashboard() {
    const { defaultAccount, fetchDefaultAccount } = useContext(DataContext); // الحصول على البيانات والدالة من الـ Context
    const [loading, setLoading] = useState(true); // حالة التحميل
    const [isDarkMode, setIsDarkMode] = useState(false); // حالة الوضع الداكن
    
    // نستخدم useEffect لجلب الحساب الافتراضي عند تحميل المكون
    useEffect(() => {
        fetchDefaultAccount(); // جلب الحساب الافتراضي
    }, []);

    useEffect(() => {
        if (defaultAccount) {
            setLoading(false); // عند وجود بيانات يتم إنهاء حالة التحميل
        }
    }, [defaultAccount]);

    // useEffect لمراقبة تغييرات الوضع الداكن
    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.body.classList.contains('dark-mode');
            setIsDarkMode(isDark); // تحديث حالة الوضع الداكن بناءً على كلاس body
        };

        // التحقق أول مرة عند تحميل الصفحة
        checkDarkMode();

        // مراقبة التغييرات في الكلاس
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => {
            observer.disconnect(); // تنظيف المراقب عند إزالة المكون
        };
    }, []);

    return (
        <div className="container mt-5">

                <Helmet>
                <title>Bank Account Details - Dashboard</title>
                <meta name="description" content="View details of your default bank account, including account type, number, customer information, and balance." />
            </Helmet>
            <h2 className="mb-4">Bank Account Details</h2>

            {loading ? (
                <div className="text-center">
                    <i className="fas fa-spin fa-spinner fa-3x text-success"></i> {/* أيقونة التحميل */}
                    <p>Loading account details...</p>
                </div>
            ) : (
                defaultAccount ? (
                    <div
                        className="card p-4 shadow"
                        style={{
                            backgroundColor: isDarkMode ? 'rgba(49, 49, 87, 0.5)' : '#fff', // تغيير لون الخلفية بناءً على الوضع
                            borderRadius: '50px'
                        }}
                    >
                        <h5 className="card-title">Account Type: {defaultAccount?.accountType}</h5>
                        
                        <p className="card-text" style={{ color: isDarkMode ? '#fff' : '#000' }}>
                            <strong >Account Number:</strong> {defaultAccount?.accountNumber}
                        </p>
                        <p className="card-text" style={{ color: isDarkMode ? '#fff' : '#000' }}>
                            <strong>Customer Name:</strong> {defaultAccount?.customer?.name}
                        </p>
                        <p className="card-text" style={{ color: isDarkMode ? '#fff' : '#000' }}>
                            <strong>Customer address:</strong> {defaultAccount?.customer?.address}
                        </p>
                        <p className="card-text" style={{ color: isDarkMode ? '#fff' : '#000' }}>
                            <strong>Balance:</strong> ${defaultAccount?.balance}
                        </p>
                        {defaultAccount.isDefault && (
                            <span className="badge bg-success">Default Account</span>
                        )}
                    </div>
                ) : (
                    <p>No account details available.</p>
                )
            )}
        </div>
    );
}
