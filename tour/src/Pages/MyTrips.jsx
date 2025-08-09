import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Loader from "../Components/Loader";
import { FaPlusCircle, FaMapMarkedAlt } from "react-icons/fa";
import { div } from "framer-motion/client";

const MyTrips = () => {
  const { user } = useContext(AuthContext);
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setMyTrips([]);
      setLoading(false);
      return;
    }

    fetch("https://tour-server-beta.vercel.app/trips")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (trip) => trip.guide_email === user.email
        );
        setMyTrips(filtered);
      })
      .catch(() => toast.error("Failed to load your trips."))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    fetch(`https://tour-server-beta.vercel.app/trips/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Trip deleted successfully!");
          setMyTrips((prev) => prev.filter((trip) => trip._id !== id));
        } else {
          toast.error("Failed to delete trip.");
        }
      })
      .catch(() => toast.error("Error deleting trip."));
  };

  if (loading) return <Loader />;

  if (!myTrips.length)
    return (
  <div>
    <title>Tourista | MyTrip</title>
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4">
        <FaMapMarkedAlt className="text-6xl text-slate-800 animate-bounce" />
        <h2 className="text-3xl font-extrabold text-slate-800">
          No Trips Found
        </h2>
        <p className="text-gray-600 max-w-md">
          You haven’t added any tour packages yet. Start by adding your first
          trip to attract travelers.
        </p>
        <Link to="/addtrips">
          <button className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105">
            <FaPlusCircle size={20} />
            Add Your First Trip
          </button>
        </Link>
      </div></div>
    );

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-center text-4xl font-bold text-[#14A800] mb-6">
        My Tour Packages
      </h1>
      <div className="overflow-x-auto rounded-md shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Tour Name</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Departure</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myTrips.map((trip) => (
              <tr key={trip._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={trip.image}
                    alt={trip.tour_name}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{trip.tour_name}</td>
                <td className="p-3">{trip.destination}</td>
                <td className="p-3">{trip.departure_location}</td>
                <td className="p-3 font-semibold">
                  ${Number(trip.price).toLocaleString()}
                </td>
                <td className="p-3 space-x-2">
                  <Link to={`/update/${trip._id}`}>
                    <button className="bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-600 transition">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-slate-800 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTrips;
