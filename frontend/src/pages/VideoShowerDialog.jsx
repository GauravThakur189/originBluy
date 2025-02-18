import React from "react";

export default function VideoViewerDialog({ onClose, videoSrc }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex justify-center items-center z-30">
      <div className="bg-[#111827] p-6 rounded-lg shadow-lg w-96 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">
          Video Preview
        </h2>

        {videoSrc ? (
          <video src={videoSrc} controls className="w-full rounded-lg" />
        ) : (
          <p className="text-gray-400 text-center">No video available</p>
        )}
      </div>
    </div>
  );
}
