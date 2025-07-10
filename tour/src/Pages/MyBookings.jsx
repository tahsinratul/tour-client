import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyBookings(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load your bookings.");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    fetch(`http://localhost:3000/bookings/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Booking canceled!");
          setMyBookings((prev) => prev.filter((b) => b._id !== id));
        } else {
          toast.error("Failed to cancel booking.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error canceling booking.");
      });
  };

  if (loading)
    return <p className="text-center mt-10">Loading your bookings...</p>;

  if (!myBookings.length)
    return (
      <p className="text-center mt-10 text-blue-600 font-bold text-2xl pb-5">
        You have no bookings yet.
      </p>
    );

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-center text-4xl font-bold text-[#3B82F6] mb-6">
        My Bookings
      </h1>

      <div className="overflow-x-auto rounded-md shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-3">Tour Name</th>
              <th className="p-3">Guide</th>
              <th className="p-3">Departure</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{booking.tour_name}</td>
                <td className="p-3">
                  <p>{booking.guide_name}</p>
                  <p className="text-xs text-gray-500">{booking.guide_email}</p>
                </td>
                <td className="p-3">{booking.departure_date}</td>
                <td className="p-3">{booking.destination || "N/A"}</td>
                <td className="p-3">{booking.notes || "None"}</td>
                <td className="p-3 space-x-2">
                  {/* Show Modify & Delete buttons for all bookings */}
      <button
                    onClick={() => handleDelete(booking._id)}
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

export default MyBookings;
