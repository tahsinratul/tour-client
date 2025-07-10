import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const BookingModal = ({ onClose, Trip }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const specialNote = form.notes.value;

    const bookingData = {
      tour_id: Trip._id,
      tour_name: Trip.tour_name,
      guide_name: Trip.guide_name,
      guide_email: Trip.guide_email,
      buyer_name: user.displayName,
      buyer_email: user.email,
      booking_date: new Date(),
      departure_date: Trip.departure_date,
      notes: specialNote,
      status: "pending"
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Success!", "Booking placed successfully!", "success").then(() => {
            onClose(); // Close modal
            navigate("/mybookings"); // Go to MyBookings page
          });
        } else {
          Swal.fire("Error", "Failed to place booking.", "error");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Book: {Trip.tour_name}</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <input type="text" value={user.displayName} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
          <input type="email" value={user.email} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
          <input type="text" value={Trip.price} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
          <textarea name="notes" placeholder="Special Note (optional)" className="w-full border px-3 py-2 rounded" />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
