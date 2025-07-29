import React from 'react';

const About = () => {
  return (
    <div id="about" className="lg:px-32 px-6 md:px-8 mx-auto py-12">
      <div className="text-center text-4xl font-semibold mb-8">
        About Us
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/2 text-lg leading-relaxed mb-8 md:mb-0 md:pr-8 px-4 md:px-0">
          <p className="text-justify">Welcome to our Voting App, where technology meets democracy to empower every voice. We are dedicated to providing a secure, transparent, and user-friendly platform that simplifies the voting process, making it accessible to everyone.</p>
          <br></br>
          <p className="text-justify">Our mission is to foster engagement, trust, and integrity in elections, whether it&apos;s for a community event, corporate decision-making, or large-scale governmental elections. We believe that every vote counts, and through innovation, we aim to strengthen the democratic process by ensuring that it remains fair, easy, and trustworthy for all participants.</p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="bg-gray-200 h-64 w-64 flex items-center justify-center text-2xl font-bold text-gray-600">
            Media Content
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
