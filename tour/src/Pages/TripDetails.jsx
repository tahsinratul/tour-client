import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import BookingModal from "../Components/BookingModal";
import Loader from "../Components/Loader";
import { FiMapPin } from "react-icons/fi";

const TripDetails = () => {
  const trip = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading delay to show loader on navigation
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [trip]);

  if (loading) {
    return <Loader />;
  }

  const {
    tour_name,
    image,
    destination,
    price,
    duration,
    package_details,
  } = trip;

  const handleBooking = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const detailsArray = Array.isArray(package_details)
    ? package_details
    : package_details?.split(",").map((item) => item.trim());

  return (
    <>
      <title>Tourista | Details</title>

      <main className="w-[90%] mx-auto mt-30 mb-10 rounded-3xl overflow-hidden shadow-lg font-display bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12">
          {/* Image Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-md h-80 md:h-auto">
            <img
              src={image}
              alt={`Tour image for ${tour_name}`}
              className="w-300 h-120 object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4">
              {duration ? (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold shadow-sm">
                  Available
                </span>
              ) : (
                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold shadow-sm">
                  Currently Unavailable
                </span>
              )}
            </div>
          </div>

          {/* Details Section */}
          <section className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 truncate max-w-full mb-2">
                {tour_name}
              </h1>

              {destination && (
                <p className="flex items-center text-gray-600 mb-2 text-lg font-medium">
                  <FiMapPin className="mr-2 text-[var(--primary-color)]" />
                  {destination}
                </p>
              )}

              <div className="flex items-center justify-between bg-[var(--primary-50)] rounded-full mb-2 ">
                <span className="text-xl md:text-2xl font-extrabold text-[var(--primary-color)]">
                  {price}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="font-semibold text-gray-800 mb-3 text-xl">
                  About the Trip:
                </h2>
                {detailsArray?.length ? (
                  <ul className="list-disc list-inside text-gray-700 text-base max-h-48 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {detailsArray.map((detail, idx) => (
                      <li key={idx} className="mb-1">
                        {detail}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-base">No details available.</p>
                )}
              </div>
            </div>

            {duration ? (
              <button
                onClick={handleBooking}
                className="btn btn-neutral btn-dash"
                aria-label={`Book tour: ${tour_name}`}
              >
                Book Now
              </button>
            ) : (
              <p className="mt-auto text-yellow-700 font-semibold italic">
                This tour is currently unavailable for booking.
              </p>
            )}
          </section>
        </div>

        {isModalOpen && <BookingModal onClose={closeModal} Trip={trip} />}
      </main>
    </>
  );
};

export default TripDetails;
