"use client"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import Header from '../../components/Header';
import { useRouter } from 'next/navigation';

const VoterLogin = () => {
    const router = useRouter(); 
  // Formik Hook for form handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Form Data', values);
      router.push('/voter/voterPanel/profile')
      // Add your login logic here
    },
  });

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Left Column with Image */}
        <div className="w-full md:w-1/2 bg-gray-200 flex items-center justify-center">
          <img
            src="/path-to-your-image.jpg"
            alt="Voting"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Column with Login Form */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-semibold text-center mb-8">Voter Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                  }`}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
                ) : null}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                  }`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
                ) : null}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-navBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center text-gray-600 text-sm mt-4">
              Forgot your password?{' '}
              <a href="/reset-password" className="text-navBlue hover:text-blue-700">
                Reset it here
              </a>
            </p>
            <p className="text-center text-gray-600 text-sm mt-4">
              Not Registered?{' '}
              <a href="/voter/voterRegister" className="text-navBlue hover:text-blue-700">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoterLogin;
