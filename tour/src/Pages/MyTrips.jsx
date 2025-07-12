import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router"; // ✅ Correct import

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
        const filtered = data.filter((trip) => trip.guide_email === user.email);
        setMyTrips(filtered);
      })
      .catch((err) => {
        toast.error("Failed to load your trips.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
    if (!confirmDelete) return;

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
      .catch((error) => {
        toast.error("Error deleting trip.");
        console.error(error);
      });
  };

  if (loading)
    return <p className="text-center mt-10">Loading your trips...</p>;

  if (!myTrips.length)
    return (
      <div className="text-center mt-50">
        <p className="text-slate-800 font-bold text-2xl mb-6">
          You have not added any trips yet.
        </p>
        <Link to="/addtrips">
          <button className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition my-10">
            Add Your First Trip
          </button>
        </Link>
      </div>
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
                <td className="p-3">{trip.price}</td>
                <td className="p-3 space-x-2">
                  <Link to={`/update/${trip._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
