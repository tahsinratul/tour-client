import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import Trip from "./Trip";
import { Motion, spring } from "react-motion";

const RecentListings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://tour-server-beta.vercel.app/trips")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);


  return (
    <Motion defaultStyle={{ x: -100, opacity: 0 }} style={{ x: spring(0), opacity: spring(1) }}>
      {(style) => (
        <div
          className="my-30 flex flex-col justify-center items-center"
          style={{
            transform: `translateX(${style.x}px)`,
            opacity: style.opacity,
          }}
        >
          <h1 className="text-6xl font-semibold text-center font-display">
            Recent Listings
          </h1>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-[90%] mx-auto my-10">
            {data.map((trip) => (
              <Trip trip={trip} key={trip._id} />
            ))}
          </div>

          <button
            onClick={() => navigate("/availabletrips")}
            className="btn btn-neutral btn-dash"
          >
            <span className="flex items-center justify-center">
              View All Trips <IoIosArrowForward />
            </span>
          </button>
        </div>
      )}
    </Motion>
  );
};

export default RecentListings;
