"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaKey, FaCheckCircle, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

const VerifyEmail = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      setErrorMessage('');
      
      try {
        const response = await fetch('https://blockchainvoting-z1xf.onrender.com/api/user/verify-email', {
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

        setSuccessMessage('Email verified successfully! Redirecting to login...');
        
        setTimeout(() => {
          router.push('/voter/voterLogin');
        }, 2000);

      } catch (error) {
        console.error('Verification Error:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Verification failed');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-logoBlue via-bgBlue to-logoBlue">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-popBlue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-navBlue/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-orange/10 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-6">
        <div className="w-full max-w-md">
          {/* Verification Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-logoBlue to-bgBlue px-8 py-12 text-center text-white relative">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-45" />
              <div className="absolute top-4 right-4 w-6 h-6 bg-popBlue/30 rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
              
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-popBlue to-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <FaEnvelope className="text-3xl text-bgBlue" />
                </div>
                <h2 className="text-3xl font-bold mb-3">Verify Your Email</h2>
                <p className="text-blue-100 text-lg">Enter the verification code sent to your email</p>
                
                {/* Security badge */}
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mt-4 border border-white/20">
                  <FaShieldAlt className="text-popBlue text-sm" />
                  <span className="text-sm font-medium">Secure Verification</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 space-y-8">
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl animate-pulse">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaCheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700 font-medium">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FaEnvelope className="text-logoBlue" />
                    <span>Email Address</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your email address"
                      className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg ${
                        formik.touched.email && formik.errors.email
                          ? "ring-2 ring-red-500 bg-red-50"
                          : "group-hover:bg-white group-hover:shadow-md"
                      }`}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{formik.errors.email}</span>
                    </p>
                  )}
                </div>

                {/* OTP Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FaKey className="text-logoBlue" />
                    <span>Verification Code (OTP)</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="otp"
                      value={formik.values.otp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter 4-digit OTP"
                      maxLength={4}
                      className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg text-center tracking-widest font-bold${
                        formik.touched.otp && formik.errors.otp
                          ? "ring-2 ring-red-500 bg-red-50"
                          : "group-hover:bg-white group-hover:shadow-md"
                      }`}
                    />
                  </div>
                  {formik.touched.otp && formik.errors.otp && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{formik.errors.otp}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 bg-gradient-to-r from-logoBlue to-bgBlue text-white font-bold text-lg rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
                    isLoading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 group">
                      <FaCheckCircle />
                      <span>Verify Email</span>
                      <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </button>
              </form>

              {/* Help Text */}
              <div className="pt-6 border-t border-gray-100">
                <div className="bg-logoBlue/5 rounded-2xl p-4 border border-logoBlue/10">
                  <div className="flex items-start space-x-3">
                    <FaEnvelope className="text-logoBlue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-logoBlue text-sm mb-1">Didn&apos;t receive the code?</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Check your spam folder or wait a few minutes for the email to arrive. 
                        If you still don&apos;t receive it, please contact our support team.
                      </p>
                      <button className="text-logoBlue hover:text-bgBlue text-sm font-medium mt-2 hover:underline transition-colors duration-200">
                        Resend Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Security Info */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
              <div className="w-8 h-8 bg-popBlue rounded-lg flex items-center justify-center mx-auto mb-2">
                <FaShieldAlt className="text-bgBlue text-sm" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">Secure</h3>
              <p className="text-xs text-gray-300">End-to-end encrypted</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
              <div className="w-8 h-8 bg-popBlue rounded-lg flex items-center justify-center mx-auto mb-2">
                <FaCheckCircle className="text-bgBlue text-sm" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">Verified</h3>
              <p className="text-xs text-gray-300">Identity confirmed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;