import React from "react";

export default function Toaster({ show, text }) {
  if (!show) return null;
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-lg animate-pulse backdrop-blur-md">
        {text}
      </div>
    </div>
  );
}
