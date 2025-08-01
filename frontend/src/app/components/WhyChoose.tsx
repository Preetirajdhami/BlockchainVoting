import Link from "next/link";
import { FaRegUser, FaShieldAlt, FaHeadset } from "react-icons/fa";
import Image from "next/image";
import security from "../../../public/security.png";
import easeofuse from "../../../public/easeofuse.png";
import customerservice from "../../../public/customerservice.png";

const WhyChoose = () => {
  const features = [
    {
      image: security,
      title: "Advanced Security",
      description:
        "QuickVote leverages cutting-edge blockchain technology to guarantee the safety of your votes. Each vote is encrypted and securely recorded, preventing tampering or unauthorized access.",
      icon: <FaShieldAlt className="text-4xl text-white" />,
      stats: "256-bit Encryption"
    },
    {
      image: easeofuse, 
      title: "Ease of Use",
      description:
        "Our intuitive interface makes online voting accessible to everyone, regardless of their technical expertise. Simple, clean design ensures a smooth voting experience for all users.",
      icon: <FaRegUser className="text-4xl text-white" />,
      stats: "3-Step Process"
    },
    {
      image: customerservice,
      title: "24/7 Customer Service",
      description:
        "We provide exceptional customer support around the clock. Our dedicated team is always available to resolve issues and ensure a hassle-free voting experience.",
      icon: <FaHeadset className="text-4xl text-white" />,
      stats: "Quick Response",
      button: (
        <div className="mt-6">
          <Link href="/contactus">
            <button className="inline-flex items-center px-6 py-3 bg-logoBlue text-white font-semibold rounded-xl hover:bg-bgBlue hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <FaRegUser className="mr-2" />
              Contact Us
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
            <FaShieldAlt className="text-logoBlue" />
            <span className="text-logoBlue font-semibold">Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-logoBlue mb-6">
            Why Choose QuickVote?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience the next-generation voting platform that prioritizes security, 
            accessibility, and efficiency for organizations of all sizes.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-logoBlue rounded-2xl flex items-center justify-center shadow-lg">
                    {feature.icon}
                  </div>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={500}
                    height={300}
                    className="w-full h-auto rounded-2xl"
                  />
                  {feature.stats && (
                    <div className="absolute -bottom-4 -right-4 bg-popBlue text-bgBlue px-4 py-2 rounded-xl font-bold shadow-lg">
                      {feature.stats}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-logoBlue">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {feature.button && feature.button}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;