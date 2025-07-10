import React from 'react';
import Hero from '../Components/Hero';
import WhyUS from '../Components/WhyUs';
import HowItWorks from '../Components/HowItWorks';
import States from '../Components/States';
import RecentListings from '../Components/RecentListings';

const HomePage = () => {
    return (
        <div>
          <Hero></Hero>
          <WhyUS></WhyUS>
          <RecentListings></RecentListings>
          <HowItWorks></HowItWorks>
          <States></States>
        </div>
    );
};

export default HomePage;