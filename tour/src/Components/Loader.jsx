import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 gap-6">
      <div className="flex space-x-4">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    </div>
  );
};

export default Loader;