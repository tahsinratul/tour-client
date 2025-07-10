import React, { Suspense, useState } from "react";
import { useLoaderData } from "react-router";
import BookingModal from "../Components/BookingModal";

const TripDetails = () => {
  const trip = useLoaderData();
  const {
    tour_name,
    image,
    destination,
    price,
    duration,
    package_details
  } = trip;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const detailsArray = Array.isArray(package_details)
    ? package_details
    : package_details?.split(",").map(item => item.trim());

  return (
    <Suspense fallback={<div className="text-center my-20 text-xl">Loading Trip details...</div>}>
      <title>{`Triphelp | ${tour_name}`}</title>
      <div className="w-[90%] mx-auto my-24 rounded-3xl overflow-hidden shadow-2xl relative font-display">
        <div className="relative h-[800px] w-full">
          <img src={image} alt={tour_name} className="w-full h-full object-fill md:object-cover" />

          <div className="absolute bottom-0 w-full bg-[var(--primary-50)]/50 backdrop-blur-md px-6 py-6 md:py-8 flex flex-col gap-4">
            <div>
              {duration ? (
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800">Available</span>
              ) : (
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-red-100 text-red-800">Unavailable</span>
              )}
            </div>

            <div className="flex items-center justify-between bg-[var(--primary-50)] rounded-full px-4 py-2">
              <h1 className="text-lg md:text-4xl font-medium text-gray-900">{tour_name}</h1>
              <span className="text-3xl font-bold text-[var(--primary-color)]">${price}</span>
            </div>

            <p className="text-[var(--primary-900)] text-sm md:text-base flex items-center gap-1">
              <span className="font-semibold text-lg text-[var(--primary-950)]">About the Trip:</span> {destination}
            </p>

            <div className="flex flex-wrap gap-2">
              {detailsArray?.map((detail, i) => (
                <span key={i} className="px-3 py-1 text-sm bg-[var(--primary-100)] text-[var(--primary-800)] rounded-full shadow-sm">
                  {detail.toUpperCase()}
                </span>
              ))}
            </div>

            {duration && (
              <button
                onClick={handleBooking}
                className="mt-4 w-max px-6 py-2 rounded-full bg-[var(--primary-color)] text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
              >
                Book Now
              </button>
            )}
          </div>
        </div>

        {isModalOpen && <BookingModal onClose={closeModal} Trip={trip} />}
      </div>
    </Suspense>
  );
};

export default TripDetails;
