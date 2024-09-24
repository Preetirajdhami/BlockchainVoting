"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';

const ResetPasswordConfirm = () => {
  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
        .required('Confirm new password is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log('New Password:', values.newPassword);
      console.log('Confirm New Password:', values.confirmNewPassword);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className={`appearance-none border ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Enter your new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <p className="text-red-500 text-xs italic">{formik.errors.newPassword}</p>
            ) : null}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              className={`appearance-none border ${
                formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Confirm your new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmNewPassword}
            />
            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
              <p className="text-red-500 text-xs italic">{formik.errors.confirmNewPassword}</p>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-navBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
