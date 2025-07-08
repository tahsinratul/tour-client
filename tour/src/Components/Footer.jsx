import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, } from "react-icons/fa";
import Logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 md:px-12 font-display">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4 text-sm">

        {/* Logo & Tagline */}
        <div>
          <img loading="lazy" src={Logo} alt="logo" className="w-24"/>
          <h2 className="text-2xl font-bold text-white mb-2">Tourista</h2>
          <p className="text-white">Reliable. Affordable. Fast.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-white">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
          <ul className="space-y-2 text-white">
            <li><a href="#" className="hover:text-white transition">Tour Package</a></li>
            <li><a href="#" className="hover:text-white transition">Luxury Tour</a></li>
            <li><a href="#" className="hover:text-white transition">Airport Pickup</a></li>
            <li><a href="#" className="hover:text-white transition">Deals & Offers</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://www.facebook.com/tahsinfahim.ratul/" target="_blank" className="bg-[#00BFFF] hover:bg-[#0099CC] p-2 rounded-full transition">
              <FaFacebookF />
            </a>
            <a href="https://x.com/?lang=en" target="_blank" className="bg-[#00BFFF] hover:bg-[#0099CC] p-2 rounded-full transition">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/tahsin-fahim-ratul/" target="_blank" className="bg-[#00BFFF] hover:bg-[#0099CC] p-2 rounded-full transition">
              <FaLinkedinIn />
            </a>
          </div>
          <p className="text-white">Email: support@tourista.com</p>
          <p className="text-white">Phone: +1 800 123 456</p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-[#004C66] mt-10 pt-6 text-center text-white text-xs">
        &copy; {new Date().getFullYear()} Tourista. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
