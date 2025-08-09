import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import Trip from "../Components/Trip";
import Loader from "../Components/Loader";

const AvailableTrips = () => {
  const data = useLoaderData();

  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [allTrips, setAllTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setAllTrips(data);
      setFilteredTrips(data);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [data]);


  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.toLowerCase();
    const results = allTrips.filter((trip) =>
      trip.tour_name.toLowerCase().includes(query) ||
      trip.destination?.toLowerCase().includes(query) ||
      (Array.isArray(trip.package_details)
        ? trip.package_details.join(" ").toLowerCase().includes(query)
        : trip.package_details?.toLowerCase().includes(query))
    );
    setFilteredTrips(results);
    e.target.reset();
  };
  
   if (loading) return <Loader></Loader>;

  return (
    <div className="my-25 w-[90%] mx-auto font-display">
      <h1 className="text-6xl font-semibold text-center">Available trips</h1>
      <p className="text-center my-2 text-gray-500 ">
        All the available trips are listed below. You can book a trip by clicking
        on the View details button and then "Book Now" button.
      </p>
      <div className="my-8 w-full flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-md">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full md:w-1/2 gap-2">
          <input
            type="search"
            name="search"
            placeholder="Search by destination, name..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition duration-200"
          />
          <button
            type="submit"
            className="btn btn-neutral btn-dash rounded-3xl"
          >
            Search
          </button>
        </form>

    

        {/* Toggle Buttons */}
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-3 rounded-full border transition hover:bg-slate-300 ${
              viewMode === "grid" ? "bg-slate-800 text-white" : "text-black"
            }`}
            title="Grid View"
          >
            <IoGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-3 rounded-full border transition hover:bg-slate-300 ${
              viewMode === "list" ? "bg-slate-800 text-white" : "text-black"
            }`}
            title="List View"
          >
            <FaList size={16} />
          </button>
        </div>
      </div>

      {filteredTrips.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrips.map((trip) => (
              <Trip key={trip._id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredTrips.map((trip) => (
              <Trip key={trip._id} trip={trip} />
            ))}
          </div>
        )
      ) : (
        <h1 className="text-2xl font-semibold text-center">No trips Available</h1>
      )}
    </div>
  );
};

export default AvailableTrips;
