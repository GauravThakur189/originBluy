import React, { useState, useEffect } from "react";
import Sidebar from "../components/home/Sidebar";
import { Outlet } from "react-router-dom";
import UploadDialog from "./UploadDialog";
import VideoUploadDialog from "./VideoUploadDialog";
import PhotoUploadDialog from "./PhotoUploadDialog";
import PhotoViewerDialog from "./PhotoShowerDialog";
import VideoViewerDialog from "./VideoShowerDialog";
import axios from "axios";

const AllPhotos = () => {
  const [photoUploadDialog, setPhotoUploadDialog] = useState(false);
  const [videoUploadDialog, setVideoUploadDialog] = useState(false);
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [photoSrc, setPhotoSrc] = useState("https://via.placeholder.com/300");
  const [photoId, setPhotoId] = useState(null); // Add state for photo ID
  const [videoSrc, setVideoSrc] = useState(
    "https://www.w3schools.com/html/mov_bbb.mp4"
  );
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handlePhotoUpload = async (file) => {
    console.log("Uploaded file:", file);
    const formData = new FormData();
    formData.append("media", file);
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v2/media/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleVideoUpload = async (file) => {
    console.log("Uploaded file:", file);
    const formData = new FormData();
    formData.append("media", file);
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v2/media/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v2/media", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("fetch response", response.data);
      const mediaFiles = response.data.mediaFiles;
      const images = mediaFiles.filter((file) => file.type === "image");
      const videos = mediaFiles.filter((file) => file.type === "video");
      setImages(images);
      setVideos(videos);
    } catch (error) {
      console.error("Error in fetching file:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (images.length > 0 && images[0].url) {
      console.log("fetch response images array ", images[0].url);
    }
  }, [images]);

  useEffect(() => {
    if (videos.length > 0 && videos[0].url) {
      console.log("fetch response videos array ", videos[0].url);
    }
  }, [videos]);

  return (
    <div className="flex h-[98vh] gap-4">
      {photoUploadDialog && (
        <PhotoUploadDialog
          onClose={() => setPhotoUploadDialog(false)}
          onUpload={handlePhotoUpload}
        />
      )}

      {videoUploadDialog && (
        <VideoUploadDialog
          onClose={() => setVideoUploadDialog(false)}
          onUpload={handleVideoUpload}
        />
      )}
      {photoDialogOpen && (
        <PhotoViewerDialog
          onClose={() => setPhotoDialogOpen(false)}
          photoSrc={photoSrc}
          photoId={photoId} // Pass the photo ID to the dialog
        />
      )}

      {videoDialogOpen && (
        <VideoViewerDialog
          onClose={() => setVideoDialogOpen(false)}
          videoSrc={videoSrc}
        />
      )}
      <div className="w-1/6 border border-gray-500 rounded-lg p-4 flex flex-col justify-around">
        <Sidebar />
      </div>
      <div className="w-5/6 border border-gray-500 rounded-lg flex flex-col h-full">
        <div className="flex-1 p-3">
          <div className="flex gap-4">
            <div className="text-3xl tracking-wider font-light mb-4">Photos</div>
            <div
              onClick={() => setPhotoUploadDialog(true)}
              className="rounded-3xl h-10 w-10 bg-gray-800 flex justify-center items-center text-4xl pb-2 text-gray-400 cursor-pointer active:scale-110"
            >
              +
            </div>
          </div>
          <div className="flex flex-1 flex-row justify-start border border-gray-500 rounded-lg p-4 gap-4 h-[250px] overflow-x-auto">
            {images.map((src, index) => (
              <div
                onClick={() => {
                  setPhotoDialogOpen(true);
                  setPhotoSrc(src.url);
                  setPhotoId(src._id); // Set the photo ID
                }}
                key={index}
                className="h-full min-w-[200px] border border-gray-500 rounded-lg flex justify-center items-center overflow-hidden"
              >
                <img
                  src={src.url}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-2">
          <div className="flex gap-4">
            <div className="text-3xl tracking-wider font-light mb-4">Videos</div>
            <div
              onClick={() => setVideoUploadDialog(true)}
              className="rounded-3xl h-10 w-10 bg-gray-800 flex justify-center items-center text-4xl pb-2 text-gray-400 cursor-pointer active:scale-110"
            >
              +
            </div>
          </div>
          <div className="flex flex-1 flex-row justify-start border border-gray-500 rounded-lg p-4 gap-4 h-[250px] overflow-x-auto">
            {videos.map((src, index) => (
              <div
                onClick={() => {
                  setVideoDialogOpen(true);
                  setVideoSrc(src.url);
                }}
                key={index}
                className="h-full relative min-w-[200px] border border-gray-500 rounded-lg flex justify-center items-center overflow-hidden"
              >
                <div className="flex active:scale-110 justify-center items-center absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <img
                  src={src.url}
                  alt={`Video ${index + 1}`}
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

export default AllPhotos;