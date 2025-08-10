import React, { useState } from "react";
import {
  FaCarSide,
  FaMoneyBillWave,
  FaBolt,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    title: "Variety of Tours",
    description:
      "Choose from compact packages — all maintained to the highest standards.",
    icon: FaCarSide,
    bg: "bg-slate-800",
    textColor: "text-white",
    borderColor: "border-slate-400",
    tooltip: "Wide selection of tour packages to match your preferences.",
  },
  {
    title: "Affordable Prices",
    description:
      "Enjoy competitive daily rates with no hidden fees. Quality and value go hand in hand here.",
    icon: FaMoneyBillWave,
    bg: "bg-white",
    textColor: "text-slate-900",
    borderColor: "border-slate-300",
    tooltip: "Transparent pricing with no surprises or hidden fees.",
  },
  {
    title: "Easy Booking Process",
    description:
      "Book your package in minutes with our user-friendly platform. Just a few clicks and you're on the trip.",
    icon: FaBolt,
    bg: "bg-slate-800",
    textColor: "text-white",
    borderColor: "border-slate-400",
    tooltip: "Quick and simple booking experience for everyone.",
  },
  {
    title: "24/7 Customer Support",
    description:
      "Questions? Last-minute changes? Our support team is always ready to help — day or night.",
    icon: FaHeadset,
    bg: "bg-white",
    textColor: "text-slate-900",
    borderColor: "border-slate-300",
    tooltip: "Always available support whenever you need assistance.",
  },
];

const Tooltip = ({ children, visible }) => (
  <div
    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 rounded-md text-sm text-white bg-slate-900 shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-300 ${
      visible ? "opacity-100" : "opacity-0"
    }`}
    style={{ zIndex: 999 }}
  >
    {children}
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
  </div>
);

const FeatureCard = ({ feature }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const Icon = feature.icon;

  return (
    <div
      className={`relative flex flex-col items-center gap-4 py-8 px-6 rounded-2xl cursor-pointer transform transition-transform duration-300 hover:scale-105 ${feature.bg} shadow-lg`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      aria-describedby={`tooltip-${feature.title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="relative">
        <Icon
          className={`text-6xl ${feature.textColor}`}
          aria-hidden="true"
        />
        <Tooltip visible={showTooltip}>
          {feature.tooltip}
        </Tooltip>
      </div>
      <h2 className={`text-2xl font-bold ${feature.textColor}`}>
        {feature.title}
      </h2>
      <p className={`text-center text-sm max-w-xs ${feature.textColor === "text-white" ? "text-white/90" : "text-slate-700"}`}>
        {feature.description}
      </p>
    </div>
  );
};

const WhyUS = () => {
  return (
    <section className="my-20 font-display flex flex-col items-center gap-8">
      <h1 className="text-6xl font-bold text-slate-900">Why Us?</h1>
      <p className="text-center text-xl max-w-3xl text-slate-700 px-4">
        Discover what makes us the go-to choice for car rentals. Whether you're planning a quick weekend getaway or a long road trip, we’ve got you covered.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-[90%] mx-auto">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyUS;
