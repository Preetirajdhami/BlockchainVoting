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
  dob: string;
  address: string;
  mobile: string;
  photo: File | null;
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

          {/* Date of Birth Field */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className={`w-full p-2 border border-gray-300 rounded ${
                formik.touched.dob && formik.errors.dob ? "border-red-500" : ""
              }`}
              {...formik.getFieldProps("dob")}
            />
            {formik.touched.dob && formik.errors.dob && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.dob}</div>
            )}
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              className={`w-full p-2 border border-gray-300 rounded ${
                formik.touched.address && formik.errors.address ? "border-red-500" : ""
              }`}
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
            )}
          </div>

          {/* Mobile Field */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium mb-1">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              className={`w-full p-2 border border-gray-300 rounded ${
                formik.touched.mobile && formik.errors.mobile ? "border-red-500" : ""
              }`}
              {...formik.getFieldProps("mobile")}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.mobile}</div>
            )}
          </div>

          {/* Upload Photo Field */}
          <div className="mb-4">
            <label htmlFor="photo" className="block text-sm font-medium mb-1">
              Upload Photo
            </label>
            <input
              type="file"
              id="photo"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  formik.setFieldValue("photo", event.currentTarget.files[0]);
                }
              }}
            />
            {formik.touched.photo && formik.errors.photo && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.photo}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded mt-4"
            disabled={formik.isSubmitting}
          >
            Register
          </button>

          {/* Display form error or success messages */}
          {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}
          {formSuccess && <div className="text-green-500 text-sm mt-2">{formSuccess}</div>}
        </form>

        <div className="mt-4">
          Already have an account?{" "}
          <Link href="/voter/voterLogin" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
