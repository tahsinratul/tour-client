import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const AddTrips = () => {

 const handleAddTrip = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const newTrip = Object.fromEntries(formData.entries());

  // ✅ Add guide info from Firebase user
  newTrip.guide_name = user.displayName;
  newTrip.guide_email = user.email;
  newTrip.guide_photo = user.photoURL;

  // Send to backend
  fetch("https://tour-server-beta.vercel.app/trips", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
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
        });
        form.reset(); // Clear the form after success
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

  const { user } = useContext(AuthContext);
  return (
    <div className="w-11/12 lg:w-8/12 mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add a New Tour Package</h1>

      {/* ✅ Guide Info Section */}
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded mb-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/0Z1n3yK/default-avatar.png"}
          alt="Guide"
          className="w-16 h-16 rounded-full border-2"
        />
        <div>
          <p className="font-semibold">Guide: {user?.displayName}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleAddTrip}  className="grid gap-4">
        <input name="tour_name"   placeholder="Tour Name" className="border p-2 rounded" required />
        <input name="image"  placeholder="Image URL" className="border p-2 rounded" required />
        <input name="duration"  placeholder="Duration (e.g. 3 Days 2 Nights)" className="border p-2 rounded" required />
        <input name="departure_location"  placeholder="Departure Location" className="border p-2 rounded" required />
        <input name="destination"  placeholder="Destination" className="border p-2 rounded" required />
        <input name="price" type="text"   placeholder="Price (BDT/USD)" className="border p-2 rounded" required />
        <input name="departure_date" type="date"  className="border p-2 rounded" required />
        <textarea name="package_details"  placeholder="Package Details" rows="4" className="border p-2 rounded" required></textarea>
        <input name="contact_no" placeholder="Guide Contact No." className="border p-2 rounded" required />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Trip</button>
      </form>
    </div>
  );
};

export default AddTrips;
