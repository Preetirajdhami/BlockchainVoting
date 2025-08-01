"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaArrowRight } from "react-icons/fa";
import Header from "../../components/Header";
import { useRouter } from "next/navigation";

const VoterLogin = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage("");
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://blockchainvoting-z1xf.onrender.com/api/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setErrorMessage(data.message || "Login failed. Please try again.");
          return;
        }

        setIsLoading(false);
        router.push("/voter/voterPanel/profile");
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("Unable to login, please try again");
        console.error("Login Error:", error);
      }
    },
  });

  return (
    <>
      <Header />
      
      {/* Background with animated elements */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-logoBlue/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-popBlue/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-navBlue/5 rounded-full blur-2xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-5rem)] py-12 px-6">
          <div className="w-full max-w-md">
            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-logoBlue to-bgBlue px-8 py-12 text-center text-white relative">
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-45" />
                <div className="absolute top-4 right-4 w-6 h-6 bg-popBlue/30 rounded-full" />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
                
                <div className="relative">
                  <div className="w-20 h-20 bg-popBlue rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <FaUser className="text-3xl text-bgBlue" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Welcome Back</h2>
                  <p className="text-blue-100 text-lg">Sign in to your voter account</p>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 space-y-8">
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
                            : "group-hover:bg-white"
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

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <FaLock className="text-logoBlue" />
                      <span>Password</span>
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your password"
                        className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg pr-14 ${
                          formik.touched.password && formik.errors.password
                            ? "ring-2 ring-red-500 bg-red-50"
                            : "group-hover:bg-white"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-logoBlue transition-colors duration-200 p-2"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                        <span>⚠</span>
                        <span>{formik.errors.password}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 bg-gradient-to-r from-logoBlue to-bgBlue text-white font-bold text-lg rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ${
                      isLoading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Sign In</span>
                        <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </button>
                </form>

                {/* Footer Links */}
                <div className="pt-6 space-y-4 text-center border-t border-gray-100">
                  <div className="text-gray-600">
                    Don&apos;t have an account?{" "}
                    <a
                      href="/voter/voterRegister"
                      className="text-logoBlue hover:text-bgBlue font-semibold transition-colors duration-200 hover:underline"
                    >
                      Sign up here
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="font-semibold text-logoBlue mb-2">Secure Login</h3>
                <p className="text-sm text-gray-600">
                  Your login is protected by advanced encryption and blockchain security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoterLogin;