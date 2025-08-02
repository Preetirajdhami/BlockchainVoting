import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';
import Image from "next/image";
import mobile from "../../../public/mobile.png"

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const textAnimation = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000 },
  });

  const imageAnimation = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? 'translateX(0px) scale(1)' : 'translateX(50px) scale(0.9)',
    config: { duration: 1200, delay: 300 },
  });

  if (!isMounted) return null;

  return (
    <section className="relative min-h-screen bg-bgBlue overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-popBlue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-navBlue/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-orange/10 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <animated.div style={textAnimation} className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="w-3 h-3 bg-popBlue rounded-full animate-pulse" />
              <span className="text-white font-medium text-sm tracking-wide">
                BLOCKCHAIN POWERED VOTING
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Quick Vote
              </h1>
              <h2 className="text-2xl lg:text-4xl font-semibold text-popBlue">
                Your Vote, Your Power
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
                Experience the future of democracy with our secure, transparent, and 
                seamless blockchain-powered voting platform. Empowering every voice 
                in the democratic process.
              </p>
            </div>

            {/* CTA Buttons - Modified for mobile side-by-side layout */}
            <div className="flex flex-row gap-4 pt-8">
              <Link href="/voter/voterLogin" className="flex-1">
                <button className="group w-full px-6 sm:px-8 py-4 bg-popBlue text-bgBlue font-bold text-base sm:text-lg rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                  <span className="flex items-center justify-center">
                    <span className="hidden sm:inline">Voter Login</span>
                    <span className="sm:hidden">Voter</span>
                    <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </Link>
              
              <Link href="/admin/adminLogin" className="flex-1">
                <button className="group w-full px-6 sm:px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-2xl hover:bg-white hover:text-bgBlue transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                  <span className="flex items-center justify-center">
                    <span className="hidden sm:inline">Admin Login</span>
                    <span className="sm:hidden">Admin</span>
                    <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-popBlue">8+</div>
                <div className="text-sm text-gray-300 font-medium">Features</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-popBlue">100%</div>
                <div className="text-sm text-gray-300 font-medium">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-popBlue">24/7</div>
                <div className="text-sm text-gray-300 font-medium">Available</div>
              </div>
            </div>
          </animated.div>

          {/* Right Content (Image) - Hidden on mobile */}
          <animated.div style={imageAnimation} className="relative hidden lg:block">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-popBlue/20 rounded-3xl blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-navBlue/20 rounded-3xl blur-xl" />
              
              {/* Main Image */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <Image
                  src={mobile}
                  alt="Voting Platform Illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl animate-bounce delay-1000">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-800">Secure Vote</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl animate-bounce delay-2000">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-800">Real-time Results</span>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden lg:block absolute bottom-8 right-8 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-white/60 text-sm font-medium">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;