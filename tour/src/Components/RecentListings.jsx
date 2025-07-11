import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoIosArrowDropright, IoIosArrowForward } from "react-icons/io";
import Trip from "./Trip";

const RecentListings = () => {

    const[data,setData] = useState([]);
    const[loading,setLoading] = useState(true);

    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("http://localhost:3000/trips")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, Array.isArray(data));
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });  
    },
    []
    )

  return (
    <div className="my-30 flex flex-col justify-center items-center">
      <h1 className="text-6xl font-semibold text-center font-display">
        Recent Listings
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-[90%] mx-auto my-10">
        {data.map((trip) => (
          <Trip trip={trip} key={trip._id}></Trip>
        ))}
      </div>

      <button onClick={() => navigate("/availabletrips")} className="btn btn-neutral btn-dash">
                  <span className="flex items-center justify-center">
                    View All Trips
                    <IoIosArrowForward></IoIosArrowForward>
                  </span>
                </button>
    </div>
  );
};

export default RecentListings;
