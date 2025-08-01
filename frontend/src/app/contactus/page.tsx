"use client"

import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import emailjs from '@emailjs/browser'
import Image from "next/image"
import Link from "next/link"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [isEmailJSReady, setIsEmailJSReady] = useState(false)

  // EmailJS configuration from environment variables
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY)
        setIsEmailJSReady(true)
        console.log('EmailJS initialized successfully')
      } catch (error) {
        console.error('EmailJS initialization failed:', error)
        setIsEmailJSReady(false)
        setSubmitStatus('error')
        setStatusMessage('Email service initialization failed. Please contact us directly.')
      }
    } else {
      console.error('EmailJS configuration missing. Please check your environment variables.')
      console.log('Available env vars:', {
        SERVICE_ID: EMAILJS_SERVICE_ID ? 'Set' : 'Missing',
        TEMPLATE_ID: EMAILJS_TEMPLATE_ID ? 'Set' : 'Missing',
        PUBLIC_KEY: EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing'
      })
      setSubmitStatus('error')
      setStatusMessage('Email service is not configured properly. Please contact us directly.')
    }
  }, [EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
        .required('Name is required'),
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
      subject: Yup.string()
        .min(3, 'Subject must be at least 3 characters')
        .max(100, 'Subject must be less than 100 characters')
        .required('Subject is required'),
      message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters')
        .required('Message is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      // Check if EmailJS is ready
      if (!isEmailJSReady || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        setSubmitStatus('error')
        setStatusMessage('Email service is not available. Please contact us directly.')
        return
      }

      setIsSubmitting(true)
      setSubmitStatus('idle')
      setStatusMessage('')

      try {
        console.log('Attempting to send email...')
        console.log('Service ID:', EMAILJS_SERVICE_ID)
        console.log('Template ID:', EMAILJS_TEMPLATE_ID)
        console.log('Public Key:', EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing')

        // Prepare template parameters
        const templateParams = {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          to_name: 'QuickVote Team',
          reply_to: values.email.trim(),
          timestamp: new Date().toLocaleString(),
        }

        console.log('Template params:', templateParams)

        // Send email using EmailJS
        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        )

        console.log('EmailJS Success:', result)

        if (result.status === 200) {
          setSubmitStatus('success')
          setStatusMessage('Thank you for your message! We\'ll get back to you within 24 hours.')
          resetForm()
          
          // Auto-hide success message after 10 seconds
          setTimeout(() => {
            setSubmitStatus('idle')
            setStatusMessage('')
          }, 10000)
        } else {
          throw new Error(`EmailJS returned status: ${result.status}`)
        }
      } catch (error) {
        console.error('EmailJS Error Details:', error)
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
        
        setSubmitStatus('error')
        
        // Provide more specific error messages
        if (error instanceof Error) {
          const errorMessage = error.message.toLowerCase()
          
          if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('cors')) {
            setStatusMessage('Network error. Please check your internet connection and try again.')
          } else if (errorMessage.includes('429') || errorMessage.includes('rate')) {
            setStatusMessage('Too many requests. Please wait a moment before trying again.')
          } else if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
            setStatusMessage('Authentication error. Please contact us directly at quickvote450@gmail.com')
          } else if (errorMessage.includes('400') || errorMessage.includes('bad request')) {
            setStatusMessage('Invalid form data. Please check your entries and try again.')
          } else if (errorMessage.includes('404') || errorMessage.includes('not found')) {
            setStatusMessage('Email service configuration error. Please contact us directly.')
          } else {
            setStatusMessage(`Email service error: ${error.message}. Please contact us directly at quickvote450@gmail.com`)
          }
        } else {
          setStatusMessage('An unexpected error occurred. Please contact us directly at quickvote450@gmail.com')
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  })

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-logoBlue via-bgBlue to-logoBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <Mail className="text-popBlue" />
            <span className="font-semibold">Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We&apos;re here to help you with any questions or support you need. Reach out to the QuickVote team 
            and let&apos;s make your voting experience seamless and secure.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Form and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-logoBlue mb-4">Send us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-xl animate-fade-in">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
                      <p className="text-green-700 text-sm mt-1">{statusMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl animate-fade-in">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800">Message Failed to Send</h4>
                      <p className="text-red-700 text-sm mt-1">{statusMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`block w-full border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-logoBlue transition-all p-4 text-lg ${
                      formik.touched.name && formik.errors.name
                        ? 'bg-red-50 ring-2 ring-red-500'
                        : 'bg-gray-50 hover:bg-white focus:bg-white'
                    }`}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    disabled={isSubmitting}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{formik.errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`block w-full border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-logoBlue transition-all p-4 text-lg ${
                      formik.touched.email && formik.errors.email
                        ? 'bg-red-50 ring-2 ring-red-500'
                        : 'bg-gray-50 hover:bg-white focus:bg-white'
                    }`}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    disabled={isSubmitting}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{formik.errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`block w-full border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-logoBlue transition-all p-4 text-lg ${
                      formik.touched.subject && formik.errors.subject
                        ? 'bg-red-50 ring-2 ring-red-500'
                        : 'bg-gray-50 hover:bg-white focus:bg-white'
                    }`}
                    placeholder="What is your message about?"
                    disabled={isSubmitting}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{formik.errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`block w-full border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-logoBlue transition-all p-4 text-lg resize-vertical ${
                      formik.touched.message && formik.errors.message
                        ? 'bg-red-50 ring-2 ring-red-500'
                        : 'bg-gray-50 hover:bg-white focus:bg-white'
                    }`}
                    placeholder="Enter your message here..."
                    disabled={isSubmitting}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{formik.errors.message}</span>
                    </p>
                  )}
                  <p className="text-gray-500 text-sm mt-2">
                    {formik.values.message.length}/1000 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-logoBlue to-bgBlue text-white hover:shadow-xl transform hover:-translate-y-1 hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Form Footer */}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    * Required fields. We respect your privacy and will never share your information.
                  </p>
                </div>
              </form>
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              {/* Contact Information Card */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                <h2 className="text-3xl font-bold text-logoBlue mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-logoBlue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-logoBlue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">Itahari, Sunsari, Nepal</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-logoBlue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-logoBlue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <a href="tel:+977-9800000000" className="text-gray-600 hover:text-logoBlue transition-colors">
                        +977-9800000000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-logoBlue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-logoBlue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:quickvote450@gmail.com" className="text-gray-600 hover:text-logoBlue transition-colors">
                        quickvote450@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-logoBlue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-logoBlue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Sunday - Friday: 10 AM - 5 PM</p>
                        <p>Saturday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Guarantee */}
              <div className="bg-gradient-to-r from-logoBlue to-bgBlue text-white p-8 rounded-3xl shadow-xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-popBlue rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-bgBlue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Quick Response Guarantee</h3>
                  <p className="text-blue-100 leading-relaxed">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-logoBlue mb-8 text-center">Our Location</h2>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d222.84554277973342!2d87.27622909019581!3d26.663568989271592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1732724285986!5m2!1sen!2snp"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="QuickVote Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}