import React from "react";
import { Link } from "react-router";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";

const Trip = ({ trip }) => {
  const {
    tour_name,
    duration,
    image,
    price,
    destination,
    contact_no,
    _id
  } = trip;

  return (
      <div className='relative flex flex-col font-display bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer transform hover:scale-105'>
        {/* Image Container with Overlay */}
        <div className="relative overflow-hidden">
          <img 
            src={image} alt=""
            loading="lazy"
            className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Availability Badge */}
          <div className="absolute top-4 right-4">
            {duration ? (
              <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-[var(--primary-950)] bg-emerald-100 rounded-full border border-emerald-200 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                Available
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 rounded-full border border-red-200 shadow-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Unavailable
              </span>
            )}
          </div>

          {/* Booking Count Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-[var(--primary-950)] bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
              {tour_name}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col p-6 space-y-4">
          {/* Header */}
         
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1">
               <p className="text-sm text-gray-500 flex items-center">
                <CiLocationOn></CiLocationOn>
                {}
              </p>
              <h2 className="text-2xl font-bold text-[var(--primary-950)] mb-1 group-hover:text-[var(--primary-color)] transition-colors duration-300">
                {destination}
              </h2>
             
            </div>
            <div className="text-right flex">
              <div className="text-3xl font-bold text-[var(--primary-color)]">
                {price}
              </div>
            </div>
          </div>

          
          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Contact no:</span>
              <span className="font-mono text-[var(--primary-950)] bg-[var(--primary-50)] px-2 py-1 rounded-md text-xs">
                {contact_no}
              </span>
            </div>
          </div>

          {/* CTA Button */}
           <Link to={`/tripdetails/${_id}`}>
          <button className="btn btn-neutral btn-dash w-full">
            <span className="flex items-center justify-center">
              View Details
              <IoIosArrowForward></IoIosArrowForward>
            </span>
          </button></Link>
        </div>
      </div>

  );
};

export default Trip;