"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Link from "next/link"
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation"
import { User, Mail, Lock, Calendar, MapPin, Phone, Upload, ArrowRight } from "lucide-react"

interface FormValues {
  name: string
  email: string
  password: string
  password_confirmation: string
  dob: string
  address: string
  mobile: string
  photo: File | null
}

export default function VoterRegister() {
  const router = useRouter()
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      photo: Yup.mixed().required("Photo is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true)
        setFormError(null)

        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("email", values.email)
        formData.append("password", values.password)
        formData.append("password_confirmation", values.password_confirmation)
        formData.append("dob", values.dob)
        formData.append("address", values.address)
        formData.append("mobile", values.mobile)
        if (values.photo) formData.append("photo", values.photo)

        // Replace with your actual API call
        const response = await fetch("/api/register", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Registration failed")
        }

        setFormSuccess("Registration successful!")
        resetForm()
        setTimeout(() => {
          router.push("/voter/verify-email")
        }, 2000)
      } catch (error) {
        console.error(error)
        setFormError("Failed to register. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
  })

  const formFields = [
    { name: "name", label: "Full Name", type: "text", icon: User, placeholder: "Enter your full name" },
    { name: "email", label: "Email Address", type: "email", icon: Mail, placeholder: "Enter your email" },
    { name: "password", label: "Password", type: "password", icon: Lock, placeholder: "Create a password" },
    {
      name: "password_confirmation",
      label: "Confirm Password",
      type: "password",
      icon: Lock,
      placeholder: "Confirm your password",
    },
    { name: "dob", label: "Date of Birth", type: "date", icon: Calendar },
    { name: "address", label: "Address", type: "text", icon: MapPin, placeholder: "Enter your address" },
    { name: "mobile", label: "Mobile Number", type: "tel", icon: Phone, placeholder: "Enter 10-digit mobile number" },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-bgBlue mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join the secure voting platform</p>
          </div>

          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            {/* Status Messages */}
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600 text-sm text-center">{formError}</p>
              </div>
            )}
            {formSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-600 text-sm text-center">{formSuccess}</p>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Form Fields */}
              {formFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  <div className="relative">
                    <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-logoBlue focus:border-transparent transition-all ${
                        formik.touched[field.name as keyof FormValues] && formik.errors[field.name as keyof FormValues]
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white"
                      }`}
                      value={formik.values[field.name as keyof FormValues] as string}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched[field.name as keyof FormValues] && formik.errors[field.name as keyof FormValues] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors[field.name as keyof FormValues] as string}
                    </p>
                  )}
                </div>
              ))}

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-logoBlue focus:border-transparent transition-all"
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        formik.setFieldValue("photo", event.currentTarget.files[0])
                      }
                    }}
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
                className="w-full bg-logoBlue text-white py-3 px-4 rounded-lg hover:bg-navBlue focus:ring-2 focus:ring-logoBlue focus:ring-offset-2 transition-all font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/voter/voterLogin" className="text-logoBlue hover:text-navBlue font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
