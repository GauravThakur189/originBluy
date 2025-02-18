import React, { useEffect, useState } from "react";
import Card from "../components/home/Card";
import axios from "axios";
import PhotoViewerDialog from "./PhotoShowerDialog";
import VideoViewerDialog from "./VideoShowerDialog";
import Sidebar from "../components/home/Sidebar";

const FavoritePhotos = () => {
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [photoSrc, setPhotoSrc] = useState("https://via.placeholder.com/300");
  const [videoSrc, setVideoSrc] = useState(
    "https://www.w3schools.com/html/mov_bbb.mp4"
  );
  const images = [
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5",
    "https://picsum.photos/200/300?random=9",
    "https://picsum.photos/200/300?random=10",
    "https://picsum.photos/200/300?random=11",
    "https://picsum.photos/200/300?random=12",
  ];
  return (
    <div className=" flex h-[98vh] gap-4">
      {photoDialogOpen && (
        <PhotoViewerDialog
          onClose={() => setPhotoDialogOpen(false)}
          photoSrc={photoSrc}
        />
      )}

      {videoDialogOpen && (
        <VideoViewerDialog
          onClose={() => setVideoDialogOpen(false)}
          videoSrc={videoSrc}
        />
      )}
      <div className=" w-1/6 border border-gray-500 rounded-lg p-4 flex flex-col justify-around ">
        <Sidebar />
      </div>
      <div className=" w-5/6 border border-gray-500 rounded-lg p-4 flex flex-col h-full">
        {/* <Outlet/> */}
        <div className="flex-1 p-6">
          <div className="flex gap-4">
            <div className="text-3xl tracking-wider font-light mb-4">
              Favorite Photos
            </div>
          </div>
          {/* Outer flex container must have h-full */}
          <div className="flex flex-1 flex-row justify-start border border-gray-500 rounded-lg p-4 gap-4 h-[300px] overflow-x-auto">
            {images.map((src, index) => (
              <div
                onClick={() => {
                  setPhotoDialogOpen(true);
                  setPhotoSrc(src);
                }}
                key={index}
                className="h-full min-w-[200px] border border-gray-500 rounded-lg flex justify-center items-center overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex gap-4">
            <div className="text-3xl tracking-wider font-light mb-4">
              Favoritev Videos
            </div>
          </div>
          {/* Outer flex container must have h-full */}
          <div className="flex flex-1 flex-row justify-start border border-gray-500 rounded-lg p-4 gap-4 h-[300px] overflow-x-auto">
            {images.map((src, index) => (
              <div
                key={index}
                className="h-full relative min-w-[200px] border border-gray-500 rounded-lg flex justify-center items-center overflow-hidden"
              >
                {/* Play Button */}
                <div
                  onClick={() => {
                    setVideoDialogOpen(true);
                    // setPhotoSrc(src);
                  }}
                  className="flex active:scale-110 justify-center items-center absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Image */}
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePhotos;
