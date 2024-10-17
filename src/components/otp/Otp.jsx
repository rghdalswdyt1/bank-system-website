import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './OTPVerification.css'; // Create a separate CSS file or use inline styles
import { useNavigate } from 'react-router-dom';

export default function Otp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Formik for handling form state and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      otp: Yup.string().required('OTP is required').length(6, 'OTP must be exactly 6 digits'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Send OTP verification request to the server
        const response = await axios.post('https://bank-system-backend.vercel.app/apis/customer/verify-otp', values, {
          withCredentials: true
        });
          console.log("response", response.data);
        // On success, display a success message and navigate to dashboard or relevant page
        toast.success('OTP verified successfully!');
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to dashboard
        }, 2000);
      } catch (error) {
        // Show error message if OTP verification fails
        toast.error(error.response?.data?.message || 'Error verifying OTP');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="otp-bg">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow-lg otp-card" style={{ width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
          <h2 className="text-center mb-4">Verify OTP</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email ? <div className="invalid-feedback">{formik.errors.email}</div> : null}
            </div>

            {/* OTP Field */}
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">OTP</label>
              <input
                id="otp"
                name="otp"
                type="text"
                className={`form-control ${formik.touched.otp && formik.errors.otp ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
                placeholder="Enter the 6-digit OTP"
              />
              {formik.touched.otp && formik.errors.otp ? <div className="invalid-feedback">{formik.errors.otp}</div> : null}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
