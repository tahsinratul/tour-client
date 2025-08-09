import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router"; // fixed import for react-router-dom
import Loader from "../Components/Loader";
import { FaPlusCircle, FaClipboardList, FaUserAlt } from "react-icons/fa";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email || !user?.accessToken) {
        setLoading(false);
        return;
      }

      const token = user.accessToken || user.stsTokenManager?.accessToken;

      try {
        setLoading(true);
        const res = await fetch(
          `https://tour-server-beta.vercel.app/bookings?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setMyBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    fetch(`https://tour-server-beta.vercel.app/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
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

  if (loading) return <Loader />;

  if (!myBookings.length)
    return (
  <div>
    <title>Tourista | Bookings</title>
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4">
        <FaClipboardList className="text-6xl text-slate-800 animate-bounce" />
        <h2 className="text-3xl font-extrabold text-slate-800">No Bookings Yet</h2>
        <p className="text-gray-600 max-w-md">
          You haven’t made any bookings yet. Browse available trips and start booking your adventures.
        </p>
        <button
          onClick={() => {
            setLoading(true); // Show loader during navigation
            navigate("/availabletrips");
          }}
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <FaPlusCircle size={20} />
          Add Booking
        </button>
      </div></div>
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
              <th className="p-3">Buyer</th>
              <th className="p-3">Booking Date</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{booking.tour_name}</td>
                <td className="p-3">
                  <p className="flex items-center gap-2">
                    <FaUserAlt className="text-gray-500" />
                    {booking.buyer_name}
                  </p>
                  <p className="text-xs text-gray-500">{booking.buyer_email}</p>
                </td>
                <td className="p-3">
                  {new Date(booking.booking_date).toLocaleDateString()}
                </td>
                <td className="p-3">{booking.notes || "None"}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status || "pending"}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-600 transition"
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
