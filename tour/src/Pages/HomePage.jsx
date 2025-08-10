import React, { useState, useEffect } from 'react';
import Hero from '../Components/Hero';
import WhyUS from '../Components/WhyUs';
import HowItWorks from '../Components/HowItWorks';
import States from '../Components/States';
import RecentListings from '../Components/RecentListings';
import Loader from '../Components/Loader';


const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader></Loader>;

  return (
    <div>
      <Hero />
      <RecentListings />
      <WhyUS />
      <HowItWorks />
      <States />
    </div>
  );
};

export default HomePage;
