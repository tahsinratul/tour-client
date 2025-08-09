import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loader from "../components/Loader"; // adjust path if needed
import { AuthContext } from "../Context/AuthContext";
import {
  FaHiking,
  FaImage,
  FaClock,
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaDollarSign,
  FaCalendarAlt,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

const UpdateTrip = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://tour-server-beta.vercel.app/trips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTrip(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load trip:", err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedTrip = Object.fromEntries(new FormData(form).entries());

    fetch(`https://tour-server-beta.vercel.app/trips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTrip),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Trip updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/mytrips"));
        } else {
          Swal.fire({
            title: "No Change!",
            text: "Nothing was updated.",
            icon: "info",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to update trip.",
          icon: "error",
        });
      });
  };

  if (loading) {
    return <Loader />;
  }

  if (!trip) {
    return <p className="text-center my-10 text-red-600">Failed to load trip data.</p>;
  }

  return (
    <div className="w-11/12 lg:w-7/12 mx-auto my-10 p-6 mt-22">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-slate-800">
        Update Tour Package
      </h1>

      {/* Guide Info Section (Optional) */}
      <div className="flex items-center gap-4 bg-slate-100 p-4 rounded mb-8 border border-slate-300 shadow-inner">
        <img
          src={user?.photoURL || "https://i.ibb.co/0Z1n3yK/default-avatar.png"}
          alt="Guide"
          className="w-14 h-14 rounded-full border-2 border-slate-400"
          title={user?.displayName || "Guide"}
        />
        <div>
          <p className="font-semibold text-slate-900">
            Guide: {user?.displayName || "Unknown"}
          </p>
          <p className="text-sm text-slate-600">{user?.email || "No Email"}</p>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-800"
      >
        {/* Tour Name */}
        <label className="flex items-center gap-2 font-semibold">
          <FaHiking className="text-slate-600" />
          Tour Name
          <FaInfoCircle
            className="text-slate-400 cursor-help"
            title="Enter the name of the tour package"
          />
        </label>
        <input
          name="tour_name"
          defaultValue={trip.tour_name}
          placeholder="Tour Name"
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
          required
        />

        {/* Image URL */}
        <label className="flex items-center gap-2 font-semibold">
          <FaImage className="text-slate-600" />
          Image URL
          <FaInfoCircle
            className="text-slate-400 cursor-help"
            title="Provide a URL for the tour image"
          />
        </label>
        <input
          name="image"
          defaultValue={trip.image}
          placeholder="Image URL"
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
          required
        />

        {/* Duration */}
        <label className="flex items-center gap-2 font-semibold">
          <FaClock className="text-slate-600" />
          Duration
          <FaInfoCircle
            className="text-slate-400 cursor-help"
            title="Example: 3 Days 2 Nights"
          />
        </label>
        <input
          name="duration"
          defaultValue={trip.duration}
          placeholder="Duration (e.g. 3 Days 2 Nights)"
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
          required
        />

        {/* Departure Location */}
        <label className="flex items-center gap-2 font-semibold">
          <FaMapMarkerAlt className="text-slate-600" />
          Departure Location
          <FaInfoCircle
            className="text-slate-400 cursor-help"
            title="Where does the tour start?"
          />
        </label>
        <input
          name="departure_location"
          defaultValue={trip.departure_location}
          placeholder="Departure Location"
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
          required
        />

        {/* Destination */}
        <label className="flex items-center gap-2 font-semibold">
          <FaGlobeAmericas className="text-slate-600" />
          Destination
          <FaInfoCircle
            className="text-slate-400 cursor-help"
            title="Final destination of the tour"
          />
        </label>
        <input
          name="destination"
          defaultValue={trip.destination}
          placeholder="Destination"
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
          required
        />

        {/* Price */}
        <label className="flex items-center gap-2 font-semibold">
          <FaDollarSign className="text-slate-600" />
          Price
          <FaInfoCircle
            className="text-slate-400 cursor-help"
            title="Price in BDT or USD"
          />
        </label>
        <input
          name="price"
          type="text"
          defaultValue={trip.price}
          placeholder="Price (BDT/USD)"
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
          required
        />

        {/* Departure Date */}
        <label className="flex items-center gap-2 font-semibold">
          <FaCalendarAlt className="text-slate-600" />
          Departure Date
          <FaInfoCircle
            className="text-slate-400 cursor-help"
            title="Select the departure date"
          />
        </label>
        <input
          name="departure_date"
          type="date"
          defaultValue={trip.departure_date}
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
          required
        />

        {/* Package Details (full width) */}
        <label className="flex items-center gap-2 font-semibold md:col-span-2">
          <FaInfoCircle className="text-slate-600" />
          Package Details
          <FaInfoCircle
            className="text-slate-400 cursor-help"
            title="Describe the details of the package"
          />
        </label>
        <textarea
          name="package_details"
          defaultValue={trip.package_details}
          placeholder="Package Details"
          rows="4"
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm md:col-span-2"
          required
        ></textarea>

        {/* Guide Contact No. (full width) */}
        <label className="flex items-center gap-2 font-semibold md:col-span-2">
          <FaPhoneAlt className="text-slate-600" />
          Guide Contact No.
          <FaInfoCircle
            className="text-slate-400 cursor-help"
            title="Contact number for the guide"
          />
        </label>
        <input
          name="contact_no"
          defaultValue={trip.contact_no}
          placeholder="Guide Contact No."
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm md:col-span-2"
          required
        />

        {/* Submit Button (full width) */}
        <button
          type="submit"
          className="bg-slate-800 text-white py-2 rounded hover:bg-slate-700 transition md:col-span-2 font-semibold text-sm"
        >
          Update Package
        </button>
      </form>
    </div>
  );
};

export default UpdateTrip;
