import React from "react";
import { useNavigate } from "react-router-dom";

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      
      {/* 404 NUMBER */}
      <h1 className="text-[15rem] font-extrabold text-gray-300">404</h1>

      {/* MESSAGE */}
      <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2 text-center max-w-md">
        Sorry, the page you are looking for is currently under construction
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Error;
