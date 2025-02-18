import axios from "axios";
import React from "react";

export default function PhotoViewerDialog({ onClose, photoSrc, photoId }) {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    try {
      console.log(`Deleting photo with ID: ${photoId}`);
      const response = await axios.delete(`http://localhost:1000/api/v2/media/${photoId}`, { headers });
      console.log("Delete response", response.data);
      alert("File deleted successfully.");
      
      // Optionally trigger any refresh of file list in parent component
      // if (onDeleteSuccess) {
      //   onDeleteSuccess();
      // }
      
      // Close the preview dialog after deletion
      onClose();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error deleting file.");
    }
  };

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
          Photo Preview
        </h2>

        {photoSrc ? (
          <img src={photoSrc} alt="Preview" className="w-full rounded-lg" />
        ) : (
          <p className="text-gray-400 text-center">No photo available</p>
        )}

        {/* Delete button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}