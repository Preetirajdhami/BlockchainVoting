import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <div className="lg:px-32 sm:px-6 md:px-8 mx-auto bg-gray-100 h-auto">
            {/* Section with background color */}
            <div className="bg-gray-100 px-4 mx-auto py-8">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
                    {/* Left Content */}
                    <div className="w-full md:w-1/2 text-left mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-black">Quick Vote</h1>
                        <h2 className="text-xl text-red-400 md:text-2xl font-semibold mt-4">Your Vote, Your Power</h2>
                        <p className="mt-4 text-base md:text-lg text-gray-700 w-full text-left">
                            At Quick Vote, we ensure a secure and seamless voting experience, empowering democracy across various elections from student councils to corporate boards.
                        </p>

                        {/* Buttons on the Same Line */}
                        <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
                            <div className="w-full md:w-1/2">
                                <Link href="/voter/voterLogin">
                                    <button className="w-full border border-black bg-blue-400 text-white text-2xl py-2 rounded-full hover:bg-gray-100 hover:text-black transition duration-300">
                                        Voter Login
                                    </button>
                                </Link>
                            </div>
                            <div className="w-full md:w-1/2">
                                <Link href="/admin/adminLogin">
                                    <button className="w-full border border-black bg-red-400 text-white text-2xl py-2 rounded-full hover:bg-gray-100 hover:text-black transition duration-300">
                                        Admin Login
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Content (Empty space or image, if needed) */}
                    <div className="w-full md:w-1/2"></div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
