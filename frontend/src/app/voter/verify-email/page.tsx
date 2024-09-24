"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';

const VerifyEmail = () => {
  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, 'OTP must be exactly 6 digits')
        .required('OTP is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log('OTP:', values.otp);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify your account</h2>
        <form onSubmit={formik.handleSubmit}>
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
              className="bg-navBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Verify
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
