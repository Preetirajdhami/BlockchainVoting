"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Header from "../components/Header";
import { useCreateUserMutation } from "../lib/services/auth";
import { useRouter } from "next/navigation";

// Define form values types
interface FormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  mobile: string;
  dob: string;
  address: string;
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
      mobile: "",
      dob: "",
      address: "",
      photo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
      mobile: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
      dob: Yup.date().required("Date of birth is required"),
      address: Yup.string().required("Address is required"),
      photo: Yup.mixed().required("Photo is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("password_confirmation", values.password_confirmation);
        formData.append("mobile", values.mobile);
        formData.append("dob", values.dob);
        formData.append("address", values.address);
        if (values.photo) formData.append("photo", values.photo);

        const response = await createUser(formData);
        console.log(response);

        setFormError(null);
        setFormSuccess("Registration successful!");
        resetForm();
        router.push('/verify-email');

        setTimeout(() => {
          setFormSuccess(null);
        }, 3000);
      } catch (error) {
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
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              className={`w-full p-2 border border-gray-300 rounded ${formik.touched.name && formik.errors.name ? "border-red-500" : ""}`}
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className={`w-full p-2 border border-gray-300 rounded ${formik.touched.email && formik.errors.email ? "border-red-500" : ""}`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Mobile Number Field */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium mb-1">Mobile</label>
            <input
              type="text"
              id="mobile"
              className={`w-full p-2 border border-gray-300 rounded ${formik.touched.mobile && formik.errors.mobile ? "border-red-500" : ""}`}
              {...formik.getFieldProps("mobile")}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.mobile}</div>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className={`w-full p-2 border border-gray-300 rounded ${formik.touched.dob && formik.errors.dob ? "border-red-500" : ""}`}
              {...formik.getFieldProps("dob")}
            />
            {formik.touched.dob && formik.errors.dob && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.dob}</div>
            )}
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
            <textarea
              id="address"
              className={`w-full p-2 border border-gray-300 rounded ${formik.touched.address && formik.errors.address ? "border-red-500" : ""}`}
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
            )}
          </div>

          {/* Upload Photo Field */}
          <div className="mb-4">
            <label htmlFor="photo" className="block text-sm font-medium mb-1">Upload Photo</label>
            <input
              type="file"
              id="photo"
              className={`w-full p-2 border border-gray-300 rounded ${formik.touched.photo && formik.errors.photo ? "border-red-500" : ""}`}
              onChange={(event) => formik.setFieldValue("photo", event.currentTarget.files ? event.currentTarget.files[0] : null)}
            />
            {formik.touched.photo && formik.errors.photo && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.photo}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>

          {/* Success Message */}
          {formSuccess && <div className="mt-4 text-green-500 text-center">{formSuccess}</div>}

          {/* Error Handling */}
          {formError && <div className="mt-4 text-red-500 text-center">{formError}</div>}

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/voterLogin" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
