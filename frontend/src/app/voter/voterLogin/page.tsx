"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; 
import Header from "../../components/Header";
import { useRouter } from "next/navigation";

const VoterLogin = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Formik Hook for form handling
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
      // Clear previous error message
      setErrorMessage("");
      setIsLoading(true); // Set loading state to true while waiting for response

      try {
        const response = await fetch("http://localhost:8000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure credentials are included with the request
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const data = await response.json();
          setIsLoading(false); 

          // Handle specific error messages from the backend
          setErrorMessage(data.message || "Login failed. Please try again.");
          return; // Exit the function if there's an error
        }

        // Successful login, redirect to voter panel profile
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
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-8">
        {/* Form Container */}
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl text-logoBlue font-semibold text-center mb-8">Voter Login</h2>

          {errorMessage && (
            <p className="text-red-500 text-xs italic mb-4 text-center">{errorMessage}</p>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400" />
                <input
                  className={`appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
              ) : null}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400" />
                <input
                  className={`appearance-none border rounded w-full py-2 pl-10 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
              ) : null}
            </div>

            <div>
              <button
                className={`bg-logoBlue hover:bg-popBlue text-white transition duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Forgot your password?{" "}
            <a
              href="/reset-password"
              className="text-navBlue hover:text-popBlue"
            >
              Reset it here
            </a>
          </p>
          <p className="text-center text-gray-600 text-sm mt-4">
            Not Registered?{" "}
            <a
              href="/voter/voterRegister"
              className="text-navBlue hover:text-popBlue"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default VoterLogin;
