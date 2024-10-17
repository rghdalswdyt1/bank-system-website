import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Formik لإعادة تعيين كلمة المرور
  const formik = useFormik({
    initialValues: {
      nationalID: '',
      password: '',
      repassword: '',
    },
    validationSchema: Yup.object({
      nationalID: Yup.string().required('National ID is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
      repassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('enter your repassword'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // إرسال البيانات إلى API
        const response = await axios.put('https://bank-system-backend.vercel.app/apis/customer/change-password', {
          nationalID: values.nationalID,
          password: values.password,
          repassword: values.repassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
            console.log('====================================');
            console.log(response);
            console.log('====================================');
        toast.success('Password changed successfully!', { theme: 'success' });
        setTimeout(() => {
          navigate('/login'); // إعادة التوجيه إلى صفحة تسجيل الدخول
        }, 2000);
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        //  
        toast.error(`Failed to change password: ${error?.response?.data?.message}`, { theme: 'danger' });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg">
        <Helmet>
                <title>Forget password</title>
                <meta name="description" content="you can change your password if you forget it" />
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

              {/* حقل New Password */}
              <div className="mb-4">
                <div className="form-group">
                  <label htmlFor="password" className="text-white py-2">New Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control w-100 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Enter your new password"
                  />
                  {formik.touched.password && formik.errors.password ? <div className="invalid-feedback">{formik.errors.password}</div> : null}
                </div>
              </div>

              {/* حقل Confirm Password */}
              <div className="mb-4">
                <div className="form-group">
                  <label htmlFor="repassword" className="text-white py-2">Confirm Password</label>
                  <input
                    id="repassword"
                    name="repassword"
                    type="password"
                    className={`form-control w-100 ${formik.touched.repassword && formik.errors.repassword ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.repassword}
                    placeholder="enter your new repassword"
                  />
                  {formik.touched.repassword && formik.errors.repassword ? <div className="invalid-feedback">{formik.errors.repassword}</div> : null}
                </div>
              </div>

              {/* زر إعادة تعيين كلمة المرور */}
              <button type="submit" className="btn btn-primary w-100" style={{borderRadius:"50px"}} disabled={loading}>
                {loading ? 'Loading...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
}
