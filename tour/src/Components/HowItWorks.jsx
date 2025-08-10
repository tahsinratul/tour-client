import React, { useState } from "react";
import { FiSearch, FiCalendar, FiKey } from "react-icons/fi";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Browse Trips",
    description:
      "Explore a wide variety of packages that suit your needs and style.",
    icon: FiSearch,
    tooltip: "Search through all available trips and packages.",
  },
  {
    title: "Pick Your Dates",
    description:
      "Choose your pickup and return dates to see availability instantly.",
    icon: FiCalendar,
    tooltip: "Select your preferred dates easily and quickly.",
  },
  {
    title: "Fly Away",
    description:
      "Confirm your booking and enjoy the trip with full peace of mind.",
    icon: FiKey,
    tooltip: "Complete booking and get ready for your journey.",
  },
];

const Tooltip = ({ children, visible }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
    transition={{ duration: 0.3 }}
    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-slate-900 text-white text-sm rounded-md px-3 py-1 select-none whitespace-nowrap shadow-lg pointer-events-none z-20"
  >
    {children}
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
  </motion.div>
);

const StatCard = ({ step, index }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      className="relative bg-white rounded-3xl p-8 flex flex-col items-center border-4 border-slate-900 cursor-pointer shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.07, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
      whileFocus={{ scale: 1.07, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
      tabIndex={0}
      aria-labelledby={`step-title-${index}`}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      onFocus={() => setTooltipVisible(true)}
      onBlur={() => setTooltipVisible(false)}
    >
      <div className="relative bg-slate-200 rounded-full p-5 mb-6 flex items-center justify-center w-20 h-20 text-slate-800">
        <div className="absolute -top-3 -left-3 bg-slate-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-lg select-none">
          {index + 1}
        </div>
        <Icon className="text-5xl" aria-hidden="true" />
        <Tooltip visible={tooltipVisible}>{step.tooltip}</Tooltip>
      </div>
      <h3
        id={`step-title-${index}`}
        className="text-xl font-semibold mb-3 text-slate-900"
      >
        {step.title}
      </h3>
      <p className="text-slate-700 text-center max-w-xs">{step.description}</p>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <section className="my-30 px-6 md:px-0 font-display">
      <div className="max-w-[90%] mx-auto text-center">
        <h2 className="text-6xl font-bold mb-4">How It Works</h2>
        <p className="mb-12 text-xl text-slate-700 max-w-2xl mx-auto">
          Renting a car has never been this easy. Follow three simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <StatCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
