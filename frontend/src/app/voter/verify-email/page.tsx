"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const VerifyEmail = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      otp: Yup.string()
        .length(4, 'OTP must be exactly 4 digits')
        .required('OTP is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://blockchainvoting-z1xf.onrender.com/api/user/verify-email',
          {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            otp: values.otp,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        setSuccessMessage('You have been verified successfully!');

        setTimeout(() => {
          router.push('/voter/voterLogin');
        }, 2000);

      } catch (error) {
        console.error('Verification Error:', error);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-logoBlue mb-6 text-center">Verify your account</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`appearance-none border ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              className={`appearance-none border ${
                formik.touched.otp && formik.errors.otp ? 'border-red-500' : 'border-gray-300'
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Enter OTP"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
            />
            {formik.touched.otp && formik.errors.otp ? (
              <p className="text-red-500 text-xs italic">{formik.errors.otp}</p>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-logoBlue hover:bg-popBlue text-white font-bold py-2 px-4 transition duration-300 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Verify
            </button>
          </div>

          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
