"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission, e.g., sending password reset email
      console.log('Email:', values.email);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`w-full p-3 border rounded focus:outline-none focus:shadow-outline ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          ) : null}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
