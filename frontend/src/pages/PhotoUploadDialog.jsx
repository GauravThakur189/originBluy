import { useState } from "react";

export default function PhotoUploadDialog({ onClose, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex justify-center items-center z-30">
      <div className="bg-[#111827] p-6 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-lg font-semibold mb-4 text-center">Upload Photo</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full text-sm text-gray-300 bg-gray-700 rounded-lg p-2"
        />

        {preview && (
          <img src={preview} alt="Preview" className="w-full rounded-lg mb-4" />
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
