"use client"

import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Shield, ArrowRight } from "lucide-react"

export default function VerifyEmail() {
  const router = useRouter()
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      otp: Yup.string().length(4, "OTP must be exactly 4 digits").required("OTP is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const response = await fetch("https://blockchainvoting-z1xf.onrender.com/api/user/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            otp: values.otp,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Verification failed")
        }

        setSuccessMessage("Email verified successfully!")

        setTimeout(() => {
          router.push("/voter/voterLogin")
        }, 2000)
      } catch (error) {
        console.error("Verification Error:", error)
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-logoBlue to-navBlue rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-bgBlue mb-2">Verify Your Email</h1>
            <p className="text-gray-600">Enter the verification code sent to your email</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-600 text-sm text-center">{successMessage}</p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-logoBlue focus:border-transparent transition-all ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* OTP Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 4-digit code"
                  maxLength={4}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-logoBlue focus:border-transparent transition-all text-center text-lg tracking-widest ${
                    formik.touched.otp && formik.errors.otp ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.otp && formik.errors.otp && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.otp}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-logoBlue text-white py-3 px-4 rounded-lg hover:bg-navBlue focus:ring-2 focus:ring-logoBlue focus:ring-offset-2 transition-all font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Verify Email</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {"Didn't receive the code? "}
              <button className="text-logoBlue hover:text-navBlue font-medium">Resend Code</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
