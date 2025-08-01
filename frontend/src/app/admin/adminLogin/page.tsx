"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserShield, FaArrowRight, FaShieldAlt } from "react-icons/fa";

const AdminLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage("");
      
      try {
        const response = await axios.post(
          "https://blockchainvoting-z1xf.onrender.com/api/admin/login",
          {
            email: values.email,
            password: values.password,
          }
        );

        const token = response.data.token;
        localStorage.setItem("adminToken", token);
        
        setIsLoading(false);
        router.push("/admin/adminPanel/candidate-details");
      } catch (error) {
        setIsLoading(false);
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || "Login failed");
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      }
    },
  });

  return (
    <>
      <Header />
      
      {/* Background with animated elements */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-logoBlue to-bgBlue pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-popBlue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-navBlue/10 rounded-full blur-2xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-5rem)] py-12 px-6">
          <div className="w-full max-w-md">
            {/* Admin Login Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-logoBlue via-bgBlue to-logoBlue px-8 py-12 text-center text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-45" />
                <div className="absolute top-4 right-4 w-6 h-6 bg-popBlue/30 rounded-full animate-pulse" />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full" />
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-popBlue to-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <FaUserShield className="text-3xl text-bgBlue" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Admin Portal</h2>
                  <p className="text-blue-100 text-lg">Secure administrative access</p>
                  
                  {/* Security badge */}
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mt-4 border border-white/20">
                    <FaShieldAlt className="text-popBlue text-sm" />
                    <span className="text-sm font-medium">Enhanced Security</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 space-y-8">
                {errorMessage && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl animate-pulse">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <FaEnvelope className="text-logoBlue" />
                      <span>Administrator Email</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter admin email address"
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

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <FaLock className="text-logoBlue" />
                      <span>Administrator Password</span>
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter admin password"
                        className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg pr-14 ${
                          formik.touched.password && formik.errors.password
                            ? "ring-2 ring-red-500 bg-red-50"
                            : "group-hover:bg-white group-hover:shadow-md"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
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
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 group">
                        <FaUserShield className="text-xl" />
                        <span>Access Admin Panel</span>
                        <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </button>
                </form>

                {/* Security Notice */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="bg-logoBlue/5 rounded-2xl p-4 border border-logoBlue/10">
                    <div className="flex items-start space-x-3">
                      <FaShieldAlt className="text-logoBlue mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-logoBlue text-sm mb-1">Security Notice</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          This is a secure administrative portal. All login attempts are monitored and logged. 
                          Unauthorized access is strictly prohibited and will be reported.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Admin Info */}
                <div className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-lg font-bold text-logoBlue">24/7</div>
                      <div className="text-xs text-gray-600">Monitoring</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-lg font-bold text-logoBlue">256-bit</div>
                      <div className="text-xs text-gray-600">Encryption</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Security Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                <div className="w-8 h-8 bg-popBlue rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FaShieldAlt className="text-bgBlue text-sm" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">Encrypted</h3>
                <p className="text-xs text-gray-300">End-to-end security</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                <div className="w-8 h-8 bg-popBlue rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FaUserShield className="text-bgBlue text-sm" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">Protected</h3>
                <p className="text-xs text-gray-300">Multi-layer defense</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                <div className="w-8 h-8 bg-popBlue rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FaShieldAlt className="text-bgBlue text-sm" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">Monitored</h3>
                <p className="text-xs text-gray-300">Real-time alerts</p>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <h3 className="font-semibold text-white mb-3">Need Help?</h3>
                <p className="text-sm text-gray-300 mb-4">
                  If you&apos;re having trouble accessing the admin panel, please contact the system administrator.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span className="text-gray-300">Emergency:</span>
                  <a href="tel:+977-9804030403" className="text-popBlue hover:text-white transition-colors duration-200">
                    +977-9800000000
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;