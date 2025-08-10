import React, { useState, useEffect } from "react";
 // adjust path if needed
import {
  FaPlane,
  FaMapMarkedAlt,
  FaHotel,
  FaCar,
  FaHiking,
  FaUmbrellaBeach,
} from "react-icons/fa";
import Loader from "../Components/Loader";

const cards = [
  {
    icon: <FaPlane size={40} className="text-slate-700" />,
    title: "Flight Booking",
    description: "Book flights with ease and find the best deals.",
    tooltip: "Choose from hundreds of airlines worldwide.",
  },
  {
    icon: <FaMapMarkedAlt size={40} className="text-slate-700" />,
    title: "Guided Tours",
    description: "Explore places with experienced tour guides.",
    tooltip: "Discover hidden gems and local secrets.",
  },
  {
    icon: <FaHotel size={40} className="text-slate-700" />,
    title: "Hotel Reservations",
    description: "Comfortable stays with great amenities.",
    tooltip: "Select hotels that suit your preferences.",
  },
  {
    icon: <FaCar size={40} className="text-slate-700" />,
    title: "Car Rentals",
    description: "Rent cars to explore destinations independently.",
    tooltip: "Wide range of vehicles available.",
  },
  {
    icon: <FaHiking size={40} className="text-slate-700" />,
    title: "Adventure Trips",
    description: "Experience thrilling outdoor adventures.",
    tooltip: "Hiking, rafting, and more exciting activities.",
  },
  {
    icon: <FaUmbrellaBeach size={40} className="text-slate-700" />,
    title: "Beach Holidays",
    description: "Relax on the best beaches worldwide.",
    tooltip: "Find your perfect sun and sand getaway.",
  },
];

const Card = ({ icon, title, description, tooltip }) => (
  <div
    tabIndex={0}
    className="relative group bg-white rounded-2xl shadow-md p-6 cursor-default hover:shadow-lg transition-shadow duration-300"
    aria-describedby={`tooltip-${title.replace(/\s+/g, "")}`}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-slate-900 font-semibold text-xl mb-2">{title}</h3>
    <p className="text-slate-700">{description}</p>

    <span
      id={`tooltip-${title.replace(/\s+/g, "")}`}
      role="tooltip"
      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible transition-opacity duration-300 select-none pointer-events-none whitespace-nowrap"
    >
      {tooltip}
    </span>
  </div>
);

const AboutCards = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay on page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader></Loader>;

  return (
    <section className="w-[90%] mx-auto py-20 mt-10">
      <h2 className="text-center text-4xl font-bold text-slate-900 mb-12">
        About Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map(({ icon, title, description, tooltip }, idx) => (
          <Card
            key={idx}
            icon={icon}
            title={title}
            description={description}
            tooltip={tooltip}
          />
        ))}
      </div>
    </section>
  );
};

export default AboutCards;
