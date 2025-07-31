"use client"

import { useEffect, useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Shield, Users } from "lucide-react"

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const textAnimation = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(20px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { duration: 1000 },
  })

  const imageAnimation = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateX(0)" : "translateX(20px)",
    from: { opacity: 0, transform: "translateX(20px)" },
    config: { duration: 1200, delay: 200 },
  })

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgBlue via-bgBlue to-logoBlue relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-popBlue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-navBlue rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <animated.div style={textAnimation} className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-popBlue text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Secure • Transparent • Democratic</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Quick
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-popBlue to-navBlue"> Vote</span>
              </h1>

              <h2 className="text-2xl lg:text-3xl font-semibold text-popBlue">Your Vote, Your Power</h2>

              <p className="text-lg text-gray-200 leading-relaxed max-w-xl">
                At Quick Vote, we ensure a secure and seamless voting experience, empowering democracy across various
                elections from student councils to corporate boards.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/voter/voterLogin" className="group">
                  <button className="w-full sm:w-auto bg-white text-bgBlue px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl">
                    <Users className="h-5 w-5" />
                    <span>Voter Login</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link href="/admin/adminLogin" className="group">
                  <button className="w-full sm:w-auto border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Admin Login</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row gap-8 pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-popBlue text-sm">Secure</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-popBlue text-sm">Available</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-white">∞</div>
                  <div className="text-popBlue text-sm">Transparent</div>
                </div>
              </div>
            </animated.div>
          </div>

          {/* Right Content (Image) */}
          <div className="flex justify-center lg:justify-end">
            <animated.div style={imageAnimation} className="relative">
              <Image
                src="/mobile.png"
                alt="Voting Platform Illustration"
                width={600}
                height={700}
                className="relative z-10 max-w-full h-auto rounded-2xl"
                priority
              />
            </animated.div>
          </div>
        </div>
      </div>
    </div>
  )
}
