import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <div className="lg:px-32 sm:px-6 ms:px-8 mx-auto  bg-slate-300 h-auto">
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 py-12 md:py-24">
                {/* Left Content */}
                <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-orange-500">Quick Vote</h1>
                    <h2 className="text-xl md:text-2xl font-semibold mt-4">Your Vote, Your Power</h2>
                    <p className="mt-4 text-base md:text-lg text-gray-700">
                        At Quick Vote, we ensure a secure and seamless voting experience, empowering democracy across various elections from student councils to corporate boards.
                    </p>
                </div>

                {/* Right Content */}
             

<div className="w-full md:w-1/2 flex flex-col md:flex-row justify-center items-center gap-4">
  <div className="w-full max-w-xs">
    <Link href="/voter/voterLogin">
      <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300">
        Voter Login
      </button>
    </Link>
  </div>
  <div className="w-full max-w-xs">
    <Link href="/admin/adminLogin">
      <button className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition duration-300">
        Admin Login
      </button>
    </Link>
  </div>
</div>

            </div>
        </div>
    );
}

export default Hero;
