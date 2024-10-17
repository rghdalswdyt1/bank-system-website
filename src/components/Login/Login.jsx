import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // يمكنك إنشاء ملف CSS منفصل لتنسيق صفحة تسجيل الدخول
import { Helmet } from 'react-helmet';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Formik لتسجيل الدخول
  const formik = useFormik({
    initialValues: {
      nationalID: '',
      password: '',
    },
    validationSchema: Yup.object({
      nationalID: Yup.string().required('National ID is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // إرسال البيانات إلى API
        const response = await axios.post('https://bank-system-backend.vercel.app/apis/customer/login', values, {
          withCredentials: true
        });
        
        const { token, isVerified } = response.data; // بافتراض أن الـ API يعيد `isVerified`

        // التحقق مما إذا كان العميل قد أكد الـ OTP
        if (!isVerified) {
          toast.error('Please verify your OTP before logging in.', { theme: 'warning' });
          setLoading(false);
          return;
        }

        // إذا تم التحقق، تخزين التوكن وتوجيه المستخدم
        localStorage.setItem('token', token); // تخزين الـ token في localStorage
        toast.success('Login successful!', { theme: 'success' });
        setTimeout(() => {
          navigate('/dashboard'); // إعادة التوجيه إلى صفحة dashboard أو الصفحة المقصودة
        }, 2000);
      } catch (error) {
        toast.error(`Try again :  ${error.response?.data?.message || error.message}`, { theme: 'danger' });
      } finally {
        setLoading(false);
      }
    },
  });

  // التعامل مع "Forgot Password"
  const handleForgotPasswordClick = () => {
    navigate('/forgot-password'); // إعادة التوجيه إلى صفحة استعادة كلمة المرور
  };

  return (
    <div className="bg">
       <Helmet>
          <title>Login</title>
          <meta name="description" content="login to enter to our system" />
       </Helmet>
      <div className="login-background">
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: 'rgba(0,0,0,.2)', borderRadius: '10px' }}>
            <form onSubmit={formik.handleSubmit}>
              {/* حقل National ID */}
              <div className="mb-3">
                <div className="form-group">
                  <label htmlFor="nationalID" className="text-white py-2">National ID</label>
                  <input
                    id="nationalID"
                    name="nationalID"
                    type="text"
                    className={`form-control w-100 ${formik.touched.nationalID && formik.errors.nationalID ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nationalID}
                    placeholder="Enter your national ID"
                  />
                  {formik.touched.nationalID && formik.errors.nationalID ? <div className="invalid-feedback">{formik.errors.nationalID}</div> : null}
                </div>
              </div>

              {/* حقل Password */}
              <div className="mb-4">
                <div className="form-group">
                  <label htmlFor="password" className="text-white py-2">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control w-100 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Enter your password"
                  />
                  {formik.touched.password && formik.errors.password ? <div className="invalid-feedback">{formik.errors.password}</div> : null}
                </div>
              </div>

              {/* زر تسجيل الدخول */}
              <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: "50px" }} disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </button>

              {/* الروابط الإضافية */}
              <div className="text-center mt-3">
                <p className="text-white">
                  Forgot {' '}
                  <span onClick={handleForgotPasswordClick} className="text-decoration-none text-info" style={{ cursor: 'pointer' }}>
                    password?
                  </span>
                </p>
                <p className="text-white">
                  Don't have an account? <a href="/signup" className="text-info text-decoration-none">Sign up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
