import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import Loader from "../Components/Loader"; // adjust path if needed
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

const AddTrips = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate navigation load delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // 0.8s delay
    return () => clearTimeout(timer);
  }, []);

  const handleAddTrip = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newTrip = Object.fromEntries(formData.entries());

    newTrip.guide_name = user?.displayName || "Unknown Guide";
    newTrip.guide_email = user?.email || "";
    newTrip.guide_photo = user?.photoURL || "";

    fetch("https://tour-server-beta.vercel.app/trips", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTrip),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Trip added successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            form.reset();
            navigate("/mytrips"); // Navigate to MyTrips page after OK
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Trip could not be added.",
          icon: "error",
        });
        console.error("Trip add failed:", err);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <title>Tourista | AddTrip</title>
    <div className="w-11/12 lg:w-7/12 mx-auto my-10 p-6 mt-25 bg-white rounded-3xl">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-slate-800">
        Add a New Tour Package
      </h1>

      {/* Guide Info Section */}
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
        onSubmit={handleAddTrip}
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
          placeholder="Guide Contact No."
          className="border border-slate-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm md:col-span-2"
          required
        />

        {/* Submit Button (full width) */}
        <button
          type="submit"
          className="bg-slate-800 text-white py-2 rounded hover:bg-slate-700 transition md:col-span-2 font-semibold text-sm"
        >
          Add Trip
        </button>
      </form>
    </div></div>
  );
};

export default AddTrips;
