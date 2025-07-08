import React from "react";
import { FiSearch, FiCalendar, FiKey } from "react-icons/fi";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Browse Trips",
    description:
      "Explore a wide variety of packages that suit your needs and style.",
    icon: <FiSearch className="text-4xl " />,
  },
  {
    title: "Pick Your Dates",
    description:
      "Choose your pickup and return dates to see availability instantly.",
    icon: <FiCalendar className="text-4xl" />,
  },
  {
    title: "Fly Away",
    description:
      "Confirm your booking and enjoy the trip with full peace of mind.",
    icon: <FiKey className="text-4xl" />,
  },
];

const HowItWorks = () => {
  return (
    <section className=" py-16 px-6 md:px-0 font-display">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-6xl font-bold mb-4">How It Works</h2>
        <p className=" mb-12 text-xl">
          Renting a car has never been this easy. Follow three simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300 border-4 border-slate-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="bg-slate-300 rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
