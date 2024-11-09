import React, { useState } from "react";
import api from "@/app/utils/axios";

interface ImageUploaderProps {
  onUploadComplete: (images: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadComplete }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(files);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image) => formData.append("images", image));

    try {
      await api.post("/upload-endpoint", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploadComplete(selectedImages);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-right mb-2">آپلود تصاویر:</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        آپلود
      </button>
    </div>
  );
};

export default ImageUploader;
