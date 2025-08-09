import { div } from 'framer-motion/client';
import React from 'react';

const States = () => {
    return (<div className='mb-30'>
    <h1 className='text-center text-6xl font-bold'>Our States</h1>
    <p className='text-center text-xl my-5'>People gave us their best response, and we are very much proud of it.</p>
    
        <div className='flex justify-center w-10/12 my-10 border-4 mx-auto border-slate-900 bg-white rounded-2xl'>
            <div className="stats shadow w-full h-50">
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </div>
    <div className="stat-title font-bold">Downloads</div>
    <div className="stat-value font-bold">31K</div>
    <div className="stat-desc font-bold">Jan 1st - Feb 1st</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        ></path>
      </svg>
    </div>
    <div className="stat-title font-bold">New Users</div>
    <div className="stat-value font-bold">4,200</div>
    <div className="stat-desc font-bold">↗︎ 400 (22%)</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        ></path>
      </svg>
    </div>
    <div className="stat-title font-bold">New Registers</div>
    <div className="stat-value font-bold">1,200</div>
    <div className="stat-desc font-bold">↘︎ 90 (14%)</div>
  </div>
</div>
        </div></div>
    );
};

export default States;