import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import Image from "next/image";
import team from "../../../public/team.jpeg";

const WhoWeAre = () => {
  return (
    <section className="py-24 bg-logoBlue">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3">
                <FaUsers className="text-popBlue" />
                <span className="text-white font-semibold">Our Story</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Who We Are?
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed">
                At <strong className="text-popBlue">QuickVote</strong>, we are a team of passionate 
                innovators committed to transforming the voting process through blockchain technology, 
                cybersecurity, and user experience design.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed pb-3">
                Our mission is to empower voters and uphold the integrity of democratic systems worldwide 
                through secure, transparent, and inclusive voting solutions.
              </p>
            </div>
            
            <Link href="/aboutus">
              <button className="inline-flex items-center px-4 py-2 bg-popBlue text-bgBlue font-bold text-lg rounded-xl hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <FaUsers className="mr-3" />
                Meet Our Team
              </button>
            </Link>
          </div>

          {/* Team Image */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <Image
                src={team}
                alt="QuickVote Team"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-popBlue text-bgBlue px-4 py-2 rounded-xl font-bold shadow-lg">
                Innovation Team
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-logoBlue px-4 py-2 rounded-xl font-bold shadow-lg">
                Est. 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;