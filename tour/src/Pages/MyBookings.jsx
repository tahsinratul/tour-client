import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router"; // ✅ correct import

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email || !user?.accessToken) return;

      const token = user.accessToken || user.stsTokenManager?.accessToken;

      try {
        setLoading(true);
        const res = await fetch(`https://tour-server-beta.vercel.app/bookings?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Firebase token header
          },
        });

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
        Authorization: `Bearer ${user.accessToken}`, // ✅ include token here too if backend verifies it
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

  if (loading)
    return <p className="text-center mt-10">Loading your bookings...</p>;

  if (!myBookings.length)
    return (
      <div className="text-center mt-10 space-y-5">
        <p className="text-blue-600 font-bold text-2xl pb-5">
          You have no bookings yet.
        </p>
        <button
          onClick={() => navigate("/availabletrips")}
          className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition my-10"
        >
          Add Booking
        </button>
      </div>
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
    <th className="p-3">Status</th> {/* ✅ Added */}
    <th className="p-3">Actions</th>
  </tr>
</thead>
<tbody>
  {myBookings.map((booking) => (
    <tr key={booking._id} className="border-b hover:bg-gray-50">
      <td className="p-3 font-medium">{booking.tour_name}</td>
      <td className="p-3">
        <p>{booking.buyer_name}</p>
        <p className="text-xs text-gray-500">{booking.buyer_email}</p>
      </td>
      <td className="p-3">{new Date(booking.booking_date).toLocaleDateString()}</td>
      <td className="p-3">{booking.notes || "None"}</td>

      {/* ✅ Status column */}
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
