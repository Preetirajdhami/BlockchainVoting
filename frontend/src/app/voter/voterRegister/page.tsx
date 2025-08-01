"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Header from "@/app/components/Header";
import { useCreateUserMutation } from "@/app/lib/services/auth";
import { useRouter } from "next/navigation";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaCamera,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaShieldAlt
} from "react-icons/fa";

interface FormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  dob: string;
  address: string;
  mobile: string;
  photo: File | null;
}

const VoterRegister = () => {
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      dob: "",
      address: "",
      mobile: "",
      photo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
      dob: Yup.date().required("Date of birth is required"),
      address: Yup.string().required("Address is required"),
      mobile: Yup.string().matches(/^\d{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
      photo: Yup.mixed().required("Photo is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      setFormError(null);
      
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("password_confirmation", values.password_confirmation);
        formData.append("dob", values.dob);
        formData.append("address", values.address);
        formData.append("mobile", values.mobile);
        if (values.photo) formData.append("photo", values.photo);

        const response = await createUser(formData);

        setFormError(null);
        setFormSuccess("Registration successful! Please check your email for verification.");
        resetForm();
        
        setTimeout(() => {
          router.push('/voter/verify-email');
        }, 2000);

      } catch (error) {
        console.error(error);
        setFormError("Failed to register. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Header />
      
      {/* Background with animated elements */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-logoBlue/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-popBlue/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-navBlue/5 rounded-full blur-2xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 py-12 px-6">
          <div className="max-w-2xl mx-auto">
            {/* Registration Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-logoBlue to-bgBlue px-8 py-12 text-center text-white relative">
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-45" />
                <div className="absolute top-4 right-4 w-6 h-6 bg-popBlue/30 rounded-full animate-pulse" />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
                
                <div className="relative">
                  <div className="w-20 h-20 bg-popBlue rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <FaUserPlus className="text-3xl text-bgBlue" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Create Your Account</h2>
                  <p className="text-blue-100 text-lg">Join the future of secure voting</p>
                  
                  {/* Security badge */}
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mt-4 border border-white/20">
                    <FaShieldAlt className="text-popBlue text-sm" />
                    <span className="text-sm font-medium">Secure Registration</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 space-y-6">
                {/* Success Message */}
                {formSuccess && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700 font-medium">{formSuccess}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {formError && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{formError}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <FaUser className="text-logoBlue" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your full name"
                      className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg ${
                        formik.touched.name && formik.errors.name ? "ring-2 ring-red-500 bg-red-50" : ""
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <FaEnvelope className="text-logoBlue" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your email address"
                      className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg ${
                        formik.touched.email && formik.errors.email ? "ring-2 ring-red-500 bg-red-50" : ""
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    )}
                  </div>

                  {/* Password Fields Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                        <FaLock className="text-logoBlue" />
                        <span>Password</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Create password"
                          className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg pr-14 ${
                            formik.touched.password && formik.errors.password ? "ring-2 ring-red-500 bg-red-50" : ""
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
                        <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                        <FaLock className="text-logoBlue" />
                        <span>Confirm Password</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="password_confirmation"
                          value={formik.values.password_confirmation}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Confirm password"
                          className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg pr-14 ${
                            formik.touched.password_confirmation && formik.errors.password_confirmation ? "ring-2 ring-red-500 bg-red-50" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-logoBlue transition-colors duration-200 p-2"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.password_confirmation}</p>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <FaCalendarAlt className="text-logoBlue" />
                      <span>Date of Birth</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formik.values.dob}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg ${
                        formik.touched.dob && formik.errors.dob ? "ring-2 ring-red-500 bg-red-50" : ""
                      }`}
                    />
                    {formik.touched.dob && formik.errors.dob && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.dob}</p>
                    )}
                  </div>

                  {/* Address and Mobile Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Address Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-logoBlue" />
                        <span>Address</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your address"
                        className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg ${
                          formik.touched.address && formik.errors.address ? "ring-2 ring-red-500 bg-red-50" : ""
                        }`}
                      />
                      {formik.touched.address && formik.errors.address && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
                      )}
                    </div>

                    {/* Mobile Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                        <FaPhone className="text-logoBlue" />
                        <span>Mobile Number</span>
                      </label>
                      <input
                        type="text"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter mobile number"
                        className={`w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg ${
                          formik.touched.mobile && formik.errors.mobile ? "ring-2 ring-red-500 bg-red-50" : ""
                        }`}
                      />
                      {formik.touched.mobile && formik.errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
                      )}
                    </div>
                  </div>

                  {/* Photo Upload Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <FaCamera className="text-logoBlue" />
                      <span>Profile Photo</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            formik.setFieldValue("photo", event.currentTarget.files[0]);
                          }
                        }}
                        className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-logoBlue file:text-white hover:file:bg-bgBlue"
                      />
                    </div>
                    {formik.touched.photo && formik.errors.photo && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.photo}</p>
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
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <FaUserPlus />
                        <span>Create Account</span>
                      </div>
                    )}
                  </button>
                </form>

                {/* Footer Links */}
                <div className="pt-6 text-center border-t border-gray-100">
                  <div className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/voter/voterLogin"
                      className="text-logoBlue hover:text-bgBlue font-semibold transition-colors duration-200 hover:underline"
                    >
                      Sign in here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoterRegister;