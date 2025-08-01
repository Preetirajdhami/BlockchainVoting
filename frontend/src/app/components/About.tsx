import { Shield, Users, Zap, Award } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Blockchain-powered security ensures every vote is protected and verifiable.",
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Intuitive interface designed for voters of all technical backgrounds.",
    },
    {
      icon: Zap,
      title: "Real-Time Results",
      description: "Instant vote counting and live result updates for complete transparency.",
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description: "Proven reliability for elections from local communities to large organizations.",
    },
  ]

  return (
    <div id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-bgBlue mb-4">About QuickVote</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering democracy through innovative technology and secure voting solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                Welcome to our Voting App, where technology meets democracy to empower every voice. We are dedicated to
                providing a secure, transparent, and user-friendly platform that simplifies the voting process, making
                it accessible to everyone.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to foster engagement, trust, and integrity in elections, whether it&apos;s for a community
                event, corporate decision-making, or large-scale governmental elections. We believe that every vote
                counts, and through innovation, we aim to strengthen the democratic process.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-bgBlue mb-3">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-4">Join thousands of organizations already using QuickVote.</p>
              <button className="bg-logoBlue text-white px-6 py-3 rounded-lg hover:bg-navBlue transition-colors font-medium">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-logoBlue to-navBlue rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-bgBlue mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
