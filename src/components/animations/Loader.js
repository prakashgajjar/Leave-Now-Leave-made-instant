import React from "react";
const Loader = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-[80vh] text-gray-700 font-medium">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-700 mr-3"></div>
      Loading...
    </div>
  );
};

export default Loader;
