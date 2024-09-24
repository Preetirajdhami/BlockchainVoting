"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Header from "@/app/components/Header";
import { useCreateUserMutation } from "@/app/lib/services/auth";
import { useRouter } from "next/navigation";

// Define form values types
interface FormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Register = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Formik form handler
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await createUser(values);
        console.log(response);

        // Clear error and set success message on successful registration
        setFormError(null);
        setFormSuccess("Registration successful!");
        resetForm(); // Reset form fields after success
        router.push('/voter/verify-email');

        setTimeout(() => {
          setFormSuccess(null); // Clear success message after a delay
        }, 3000);
      } catch (error) {
        console.error(error); // Log the error for debugging
        setFormError("Failed to register. Please try again.");
      }
    },
  });

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full p-2 border border-gray-300 rounded ${
                formik.touched.name && formik.errors.name ? "border-red-500" : ""
              }`}
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-2 border border-gray-300 rounded ${
                formik.touched.email && formik.errors.email ? "border-red-500" : ""
              }`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full p-2 border border-gray-300 rounded ${
                formik.touched.password && formik.errors.password ? "border-red-500" : ""
              }`}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Password Confirmation Field */}
          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              className={`w-full p-2 border border-gray-300 rounded ${
                formik.touched.password_confirmation && formik.errors.password_confirmation
                  ? "border-red-500"
                  : ""
              }`}
              {...formik.getFieldProps("password_confirmation")}
            />
            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password_confirmation}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>

          {/* Success Message */}
          {formSuccess && (
            <div className="mt-4 text-green-500 text-center">{formSuccess}</div>
          )}

          {/* Error Handling */}
          {formError && (
            <div className="mt-4 text-red-500 text-center">{formError}</div>
          )}

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/voterLogin" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
