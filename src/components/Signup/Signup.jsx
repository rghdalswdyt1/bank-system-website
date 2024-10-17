import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { Helmet } from 'react-helmet';

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      nationalID: '',
      password: '',
      repassword: '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      address: Yup.string().required('Address is required'),
      dateOfBirth: Yup.date().required('Date of birth is required'),
      nationalID: Yup.string().required('National ID is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
      repassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Confirm password must match password')
        .required('Confirm password is required'),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          'https://bank-system-backend.vercel.app/apis/customer/register',
          values,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 3000, // Set a timeout
          }
        );

        console.log('Signup response:', response);

        toast.success("Sign up successful! Please check your email for the OTP.", { theme: "colored" });
        
        setTimeout(() => {
          navigate('/otp-verification');
        }, 2000);
      } catch (error) {
        console.error("Signup error: ", error);

        if (error.response) {
          toast.error(`Registration failed: ${error.response.data.message}`, {
            theme: "colored",
          });
        } else if (error.request) {
          toast.error('Network error: Please try again later.', { theme: "colored" });
        } else {
          toast.error(`Error: ${error.message}`, { theme: "colored" });
        }
      } finally {
        setIsLoading(false);
      }
    },
  });


  return (
    <div className="bg">
      <Helmet>
        <title>Sign up</title>
        <meta name="description" content="Enter your data to sign up." />
      </Helmet>
      <div className="signup-background">
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="card p-4 shadow-lg" style={{ width: '500px', backgroundColor: 'rgba(0,0,0,.2)', borderRadius: '10px' }}>
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                {/* Name */}
                <div className="mb-3 col-md-6">
                  <div className="form-group">
                    <label htmlFor="name" className="text-white">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={`form-control w-100 ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      placeholder="Enter your name"
                    />
                    {formik.touched.name && formik.errors.name ? <div className="invalid-feedback">{formik.errors.name}</div> : null}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3 col-md-6">
                  <div className="form-group">
                    <label htmlFor="email" className="text-white">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-control w-100 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email ? <div className="invalid-feedback">{formik.errors.email}</div> : null}
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Phone */}
                <div className="mb-3 col-md-6">
                  <div className="form-group">
                    <label htmlFor="phone" className="text-white">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      className={`form-control w-100 ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      placeholder="Enter your phone number"
                    />
                    {formik.touched.phone && formik.errors.phone ? <div className="invalid-feedback">{formik.errors.phone}</div> : null}
                  </div>
                </div>

                {/* Address */}
                <div className="mb-3 col-md-6">
                  <div className="form-group">
                    <label htmlFor="address" className="text-white">Address</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className={`form-control w-100 ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                      placeholder="Enter your address"
                    />
                    {formik.touched.address && formik.errors.address ? <div className="invalid-feedback">{formik.errors.address}</div> : null}
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Date of Birth */}
                <div className="mb-3 col-md-6">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth" className="text-white">Date of Birth</label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      className={`form-control w-100 ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'is-invalid' : ''}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dateOfBirth}
                    />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? <div className="invalid-feedback">{formik.errors.dateOfBirth}</div> : null}
                  </div>
                </div>

                {/* National ID */}
                <div className="mb-3 col-md-6">
                  <div className="form-group">
                    <label htmlFor="nationalID" className="text-white">National ID</label>
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
              </div>

              <div className="row">
                {/* Password */}
                <div className="mb-3 col-md-6">
                  <div className="form-group">
                    <label htmlFor="password" className="text-white">Password</label>
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

                {/* Confirm Password */}
                <div className="mb-3 col-md-6">
                  <div className="form-group">
                    <label htmlFor="repassword" className="text-white">Confirm Password</label>
                    <input
                      id="repassword"
                      name="repassword"
                      type="password"
                      className={`form-control w-100 ${formik.touched.repassword && formik.errors.repassword ? 'is-invalid' : ''}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.repassword}
                      placeholder="Confirm your password"
                    />
                    {formik.touched.repassword && formik.errors.repassword ? <div className="invalid-feedback">{formik.errors.repassword}</div> : null}
                  </div>
                </div>
              </div>

              <button type="submit" className={`btn btn-primary w-100 ${isLoading ? 'disabled' : ''}`} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign Up'}
              </button>

              <div className="mt-3 text-center text-white">
                Already have an account? <a href="/login" className="text-primary">Log in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
