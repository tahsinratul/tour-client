import React, { useState, useEffect } from "react";
import { FaUsers, FaGlobe, FaLeaf, FaHandshake } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import Loader from "../Components/Loader";  // <-- Import your Loader component

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay of 1.5 seconds (adjust as needed)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-slate-50 text-slate-900 mt-20 font-sans">
      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto py-16 px-8 grid md:grid-cols-2 gap-16">
        <div className="relative group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-default">
          <FaHandshake
            className="text-slate-700 text-6xl mb-6 animate-pulse-slow"
            title="Our Commitment"
          />
          <h2 className="text-3xl font-extrabold mb-4 tracking-wide bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="leading-relaxed text-slate-700 text-lg">
            At Tourista, our mission is simple – to make travel seamless, exciting, and affordable.
            We believe every journey should be a story worth telling.
          </p>
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all bg-slate-800 text-white text-sm rounded-lg px-3 py-1.5 shadow-lg pointer-events-none select-none">
            Learn what drives us
          </span>
        </div>

        <div className="relative group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-default">
          <FaGlobe
            className="text-slate-700 text-6xl mb-6 animate-pulse-slow"
            title="Global Vision"
          />
          <h2 className="text-3xl font-extrabold mb-4 tracking-wide bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">
            Our Vision
          </h2>
          <p className="leading-relaxed text-slate-700 text-lg">
            We envision a world where exploring new places is accessible to everyone, inspiring people to
            discover the beauty of our planet.
          </p>
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all bg-slate-800 text-white text-sm rounded-lg px-3 py-1.5 shadow-lg pointer-events-none select-none">
            Our future goals
          </span>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-tr from-slate-100 to-slate-200 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide text-slate-800">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <FaUsers />,
                title: "Customer First",
                desc: "We prioritize our travelers’ comfort, safety, and happiness above all else.",
                tip: "We care about you",
              },
              {
                icon: <MdOutlineTravelExplore />,
                title: "Quality Experiences",
                desc: "Every trip is designed to offer the highest quality experiences and services.",
                tip: "Top-class service",
              },
              {
                icon: <FaLeaf />,
                title: "Sustainability",
                desc: "We promote eco-friendly tourism that respects nature and local communities.",
                tip: "Eco-friendly travel",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-shadow duration-500 relative group cursor-default border border-slate-300"
              >
                <div className="text-slate-700 text-5xl mb-5 animate-bounce-slow">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-wide text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">{item.desc}</p>
                <span className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 transition-all bg-slate-900 text-white text-sm rounded-lg px-3 py-1.5 shadow-lg pointer-events-none select-none">
                  {item.tip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12 tracking-wide text-slate-900">
            Meet Our Team
          </h2>
          <p className="max-w-3xl mx-auto mb-12 text-slate-700 text-lg leading-relaxed">
            Our dedicated team of travel experts, guides, and support staff work tirelessly to make
            your adventures smooth and memorable.
          </p>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                name: "Alex Johnson",
                role: "CEO & Founder",
                tip: "Leader & visionary",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Sophia Lee",
                role: "Travel Coordinator",
                tip: "Organizes your trips",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Michael Brown",
                role: "Tour Guide",
                tip: "Your friendly guide",
                img: "https://randomuser.me/api/portraits/men/54.jpg",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500 relative group cursor-default border border-slate-300"
              >
                <div className="overflow-hidden rounded-full w-40 h-40 mx-auto mb-6 shadow-lg hover:scale-105 transition-transform duration-500">
                  <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-900">{member.name}</h3>
                <p className="text-slate-600 mb-4">{member.role}</p>
                <span className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 transition-all bg-slate-900 text-white text-sm rounded-lg px-3 py-1.5 shadow-lg pointer-events-none select-none">
                  {member.tip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .animate-bounce-slow {
            animation: bounce 3.5s infinite;
          }
          @keyframes pulse {
            0%, 100% {opacity: 1;}
            50% {opacity: 0.6;}
          }
          @keyframes bounce {
            0%, 100% {transform: translateY(0);}
            50% {transform: translateY(-10%);}
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;
