import React from "react";
import { FaBolt, FaCarSide, FaMoneyBillWave } from "react-icons/fa";
import Image1 from "../assets/247.png"
import Image2 from "../assets/caricon.png"
import Image3 from "../assets/bolticon.png"
import Image4 from "../assets/moneyicon.png"

const WhyUS = () => {
    return ( <div className="flex flex-col items-center gap-8 my-20 font-display"> 
        <h1 className="h1 text-6xl font-bold">Why Us?</h1>
        <p className="text-center text-xl">Discover what makes us the go-to choice for car rentals. Whether you're planning a quick weekend getaway or a long road trip, we’ve got you covered.</p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-[90%] mx-auto">
            <div className=" flex flex-col items-center gap-4 inset-ring-[var(--primary-color)] inset-ring-2 rounded-2xl py-8 px-4 bg-slate-800 hover:scale-105 hover:transform duration-300 border-4 border-slate-400">
                <div className="">
                    <img src={Image2} alt="" className="w-20 h-24"/>
                </div>
                <h1 className="text-2xl font-bold text-white">Variety of Tours </h1>
                <p className="text-center text-sm text-white">Choose from compact package — all maintained to the highest standards.</p>
            </div>
            <div className="flex flex-col items-center gap-4 inset-ring-[var(--primary-color)] inset-ring-2 rounded-2xl py-8 px-4 bg-white hover:scale-105 hover:transform duration-300 border-4">
                <div>
                    <img src={Image4} alt="" className="w-20 h-24"/>
                </div>
                <h1 className="text-2xl font-bold"> Affordable Prices </h1>
                <p className="text-center text-sm">Enjoy competitive daily rates with no hidden fees. Quality and value go hand in hand here.</p>
            </div>
            <div className="flex flex-col items-center gap-4 inset-ring-[var(--primary-color)] inset-ring-2 rounded-2xl py-8 px-4 bg-slate-800 hover:scale-105 hover:transform duration-300 border-4 border-slate-400">
                <div>
                   <img src={Image3} alt="" className="w-20 h-24"/>
                </div>
                <h1 className="text-2xl font-bold text-white"> Easy Booking Process </h1>
                <p className="text-center text-sm text-white">Book your package in minutes with our user-friendly platform. Just a few clicks and you're on the trip.</p>
            </div>
            <div className="flex flex-col items-center gap-4 inset-ring-[var(--primary-color)] inset-ring-2 rounded-2xl py-8 px-4 bg-white hover:scale-105 hover:transform duration-300 border-4">
                <div>
                    <img src={Image1} alt="" className="w-20 h-24" />
                </div>
                <h1 className="text-2xl font-bold"> 24/7 Customer Support </h1>
                <p className="text-center text-sm">Questions? Last-minute changes? Our support team is always ready to help — day or night.</p>
            </div>
        </div>
    </div>);
};

export default WhyUS;