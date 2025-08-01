"use client"

import { useFormik } from "formik"
import * as Yup from "yup"
import VoterLayout from "../voterPanel/VoterLayout";
import { Lock, Save, Shield } from "lucide-react"

export default function VoterPasswordChange() {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(8, "Password must be at least 8 characters").required("New Password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
        .required("Confirm New Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Password Changed:", values)
      // Add your password change logic here
    },
  })

  return (
    <VoterLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-bgBlue mb-2">Account Settings</h1>
            <p className="text-gray-600">Manage your account security and preferences</p>
          </div>

          {/* Password Change Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-logoBlue rounded-lg flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-bgBlue">Change Password</h2>
                <p className="text-gray-600">Update your account password for better security</p>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-logoBlue focus:border-transparent transition-all ${
                      formik.touched.newPassword && formik.errors.newPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-logoBlue focus:border-transparent transition-all ${
                      formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    value={formik.values.confirmNewPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.confirmNewPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-logoBlue text-white py-3 px-4 rounded-lg hover:bg-navBlue focus:ring-2 focus:ring-logoBlue focus:ring-offset-2 transition-all font-medium flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Update Password</span>
              </button>
            </form>
          </div>

          {/* Additional Settings */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-bgBlue mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Two-Factor Authentication</span>
                  <button className="text-logoBlue hover:text-navBlue font-medium">Enable</button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Login Notifications</span>
                  <button className="text-logoBlue hover:text-navBlue font-medium">On</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-bgBlue mb-4">Privacy</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Profile Visibility</span>
                  <button className="text-logoBlue hover:text-navBlue font-medium">Private</button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Data Export</span>
                  <button className="text-logoBlue hover:text-navBlue font-medium">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VoterLayout>
  )
}
