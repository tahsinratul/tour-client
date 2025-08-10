import React from "react";
import { FiDownload, FiUserPlus, FiUserCheck } from "react-icons/fi";

const tooltipStyle = {
  position: "absolute",
  bottom: "100%",
  left: "50%",
  transform: "translateX(-50%) translateY(-8px)",
  backgroundColor: "#334155", // slate-700
  color: "white",
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
  pointerEvents: "none",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s ease, transform 0.3s ease",
  zIndex: 10,
};

const arrowStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  marginLeft: "-6px",
  width: 0,
  height: 0,
  borderLeft: "6px solid transparent",
  borderRight: "6px solid transparent",
  borderTop: "6px solid #334155", // same as tooltip bg
};

const StatItem = ({ icon, title, value, desc, tooltip }) => {
  return (
    <div
      className="relative flex flex-col items-center cursor-default group min-w-[120px]"
    >
      <div className="text-slate-700 mb-4 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div className="font-semibold text-slate-900 text-lg mb-1">{title}</div>
      <div className="font-extrabold text-4xl text-slate-900 mb-1">{value}</div>
      <div
        className={`font-semibold ${
          desc.includes("↗︎") ? "text-green-600" : desc.includes("↘︎") ? "text-red-600" : "text-slate-600"
        }`}
      >
        {desc}
      </div>

      {/* Tooltip */}
      <div className="tooltip" style={tooltipStyle}>
        {tooltip}
        <div style={arrowStyle}></div>
      </div>
    </div>
  );
};

const States = () => {
  return (
    <div className="mb-16  sm:px-10 rounded-3xl  w-[95%] mx-auto select-none">
      <style>{`
        /* Tooltip hover effect */
        .group:hover .tooltip {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateX(-50%) translateY(0) !important;
        }
      `}</style>

      <h1 className="text-center text-5xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-wide">
        Our States
      </h1>
      <p className="text-center text-lg sm:text-xl text-slate-700 mb-14 mx-auto max-w-3xl">
        People gave us their best response, and we are very much proud of it.
      </p>

      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center sm:justify-around gap-12 bg-white border-4 border-slate-900 rounded-3xl shadow-xl py-12 px-6 sm:px-10">
        <StatItem
          icon={<FiDownload size={48} />}
          title="Downloads"
          value="31K"
          desc="Jan 1st - Feb 1st"
          tooltip="Total number of downloads in the last month."
        />
        <StatItem
          icon={<FiUserPlus size={48} />}
          title="New Users"
          value="4,200"
          desc="↗︎ 400 (22%)"
          tooltip="New users joined in the last month, showing great growth."
        />
        <StatItem
          icon={<FiUserCheck size={48} />}
          title="New Registers"
          value="1,200"
          desc="↘︎ 90 (14%)"
          tooltip="Number of registrations decreased slightly compared to last period."
        />
      </div>
    </div>
  );
};

export default States;
