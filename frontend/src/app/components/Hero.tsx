import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted on the client side

  useEffect(() => {
    setIsMounted(true); // Set state to true when the component is mounted
  }, []); // Only runs once on initial mount

  const textAnimation = useSpring({
    opacity: isMounted ? 1 : 0, // Animate opacity after mount
    transform: isMounted ? 'translateY(0)' : 'translateY(20px)', // Animate transform after mount
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { duration: 1000 }, // Animation duration (1 second)
  });

  if (!isMounted) return null; // Prevent SSR from rendering the animation

  return (
    <div className="lg:px-32 sm:px-6 md:px-8 mx-auto bg-bgBlue h-screen">
      <div className="px-4 mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-left mb-8 md:mb-0">
            {/* Apply the animation to the text using animated.div */}
            <animated.h1 style={textAnimation} className="text-4xl md:text-5xl font-bold text-white">
              Quick Vote
            </animated.h1>
            <animated.h2 style={textAnimation} className="text-xl text-popBlue md:text-2xl font-semibold mt-4">
              Your Vote, Your Power
            </animated.h2>
            <animated.p style={textAnimation} className="mt-4 text-base md:text-lg text-white w-full text-left">
              At Quick Vote, we ensure a secure and seamless voting experience, empowering democracy across various elections from student councils to corporate boards.
            </animated.p>

            {/* Buttons on the Same Line */}
            <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
              <div className="w-full md:w-1/2">
                <Link href="/voter/voterLogin">
                  <button className="w-full border-[2px] border-popBlue bg-bgBlue text-white text-2xl font-semibold py-2 rounded-full hover:bg-popBlue transition duration-300">
                    Voter Login
                  </button>
                </Link>
              </div>
              <div className="w-full md:w-1/2">
                <Link href="/admin/adminLogin">
                  <button className="w-full border-[2px] border-popBlue bg-bgBlue text-white text-2xl font-semibold py-2 rounded-full hover:bg-popBlue transition duration-300">
                    Admin Login
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content (Image) */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
            {/* Image placed here */}
            <img
              src="/mobile.png" // Replace with the actual path to your image
              alt="Voting Illustration"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
