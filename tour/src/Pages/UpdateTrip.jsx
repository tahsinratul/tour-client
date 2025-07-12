import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetch(`https://tour-server-beta.vercel.app/trips/${id}`)
      .then(res => res.json())
      .then(data => setTrip(data))
      .catch(err => console.error("Failed to load trip:", err));
  }, [id]);

  const handleUpdate = e => {
    e.preventDefault();
    const form = e.target;
    const updatedTrip = Object.fromEntries(new FormData(form).entries());

    fetch(`https://tour-server-beta.vercel.app/trips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTrip),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Trip updated successfully.",
            icon: "success",
            confirmButtonText: "OK"
          }).then(() => navigate("/mytrips"));
        } else {
          Swal.fire({
            title: "No Change!",
            text: "Nothing was updated.",
            icon: "info"
          });
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to update trip.",
          icon: "error"
        });
      });
  };

  if (!trip) return <p className="text-center my-10">Loading trip data...</p>;

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Tour Package</h1>

      <form onSubmit={handleUpdate} className="grid gap-4">
        <input name="tour_name" defaultValue={trip.tour_name} className="border p-2 rounded" required />
        <input name="image" defaultValue={trip.image} className="border p-2 rounded" required />
        <input name="duration" defaultValue={trip.duration} className="border p-2 rounded" required />
        <input name="departure_location" defaultValue={trip.departure_location} className="border p-2 rounded" required />
        <input name="destination" defaultValue={trip.destination} className="border p-2 rounded" required />
        <input name="price" defaultValue={trip.price} type="text" className="border p-2 rounded" required />
        <input name="departure_date" defaultValue={trip.departure_date} type="date" className="border p-2 rounded" required />
        <textarea name="package_details" defaultValue={trip.package_details} rows="4" className="border p-2 rounded" required />
        <input name="contact_no" defaultValue={trip.contact_no} className="border p-2 rounded" required />

        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Update Package
        </button>
      </form>
    </div>
  );
};

export default UpdateTrip;
