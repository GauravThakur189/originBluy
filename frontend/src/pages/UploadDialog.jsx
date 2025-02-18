import { useState } from "react";

export default function UploadDialog({ onClose, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle upload action
  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      onClose(); // Close dialog after upload
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Upload Photo/Video</h2>

        {/* File Input */}
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        {/* Preview Section */}
        {preview && (
          <div className="mb-4">
            {selectedFile.type.startsWith("video") ? (
              <video src={preview} controls className="w-full rounded-lg" />
            ) : (
              <img src={preview} alt="Preview" className="w-full rounded-lg" />
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
