"use client";

import React, { useState } from "react";
import ImageUpload from "@/components/ImageUploader";
import { useRouter } from "next/navigation";
import { convertImageToText } from "@/app/api/DemoApi/route";

const IeltsEssayChecker: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChildData = (image: File) => {
    setUploadedImages((prevImages) => [...prevImages, image]);
  };

  const handleConvertButtonClick = async () => {
    try {
      setLoading(true);
      const imageData = new FormData();
      uploadedImages.forEach((image, index) => {
        imageData.append(`image${index + 1}`, image);
      });
      const response = await convertImageToText(imageData);
      // router.push(`/result?text=${response}`); // Pass query parameters directly
      router.push(`/result?text=${encodeURIComponent(response)}`);
    } catch (error) {
      console.error("Error converting images to text:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log("Uploaded Images");
  console.log(uploadedImages);

  console.log(uploadedImages.length);
  return (
    <div className="flex flex-col mx-auto p-4 items-center">
      <h1 className="text-2xl  font-bold text-center  mt-3 mb-4">
        Upload Essay Image
      </h1>
      <div className="flex flex-col sm:flex-row sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center">
        <ImageUpload
          page={1}
          sendDataToParent={handleChildData}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
        <ImageUpload
          page={2}
          sendDataToParent={handleChildData}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
        <ImageUpload
          page={3}
          sendDataToParent={handleChildData}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
      </div>

      <button
        className={`w-[220px] mt-7 ${
          uploadedImages.length > 0
            ? "bg-blue-500 hover:bg-blue-400 transition-all duration-200 "
            : "bg-gray-400 hover:bg-gray-300 transition-all duration-200 "
        }   text-white py-1 px-3 rounded-lg`}
        onClick={handleConvertButtonClick}
        disabled={loading}
      >
        {loading ? "Converting..." : "Convert Image to Text"}
      </button>
    </div>
  );
};

export default IeltsEssayChecker;
