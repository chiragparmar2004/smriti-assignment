"use client";

import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";

import ImageModal from "./ImageModal";
import Image from "next/image";

interface ImageUploadProps {
  page: number;
  sendDataToParent: (image: File) => void;
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  page,
  sendDataToParent,
  uploadedImages,
  setUploadedImages,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setImage(null);
    setIsModalOpen(false);
  };

  const handleConfirm = (croppedImageData: string) => {
    setCroppedImage(croppedImageData);
    if (image) {
      sendDataToParent(image); // Pass the uploaded image to the parent
    } else {
      console.error("Selected image is null");
    }
  };

  const removeImageFromArray = (
    prevImages: File[],
    imageToRemove: File
  ): File[] => {
    const index = prevImages.indexOf(imageToRemove);
    if (index !== -1) {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    }
    return prevImages;
  };

  const removeCroppedImage = () => {
    console.log("Image:", image); // Log the value of image to check if it's null
    if (image) {
      const index = uploadedImages.findIndex((img) => img === image);
      if (index !== -1) {
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        console.log("New images");
        console.log(newImages);
        setUploadedImages(newImages);
      }
    } else {
      // Handle the case when image is null (optional)
      console.error("Selected image is null");
    }
    setCroppedImage("");
  };

  useEffect(() => {
    console.log("length", uploadedImages.length);
  }, [uploadedImages]);

  return (
    <div>
      <h2 className="text-center text-2xl font-normal  mb-2">Page {page}</h2>
      {isModalOpen && image && (
        <ImageModal
          imageUrl={URL.createObjectURL(image)}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}

      <div className="w-[180px] h-[280px] rounded-lg shadow-xl border flex justify-center items-center">
        {image ? (
          <button onClick={() => setIsModalOpen(true)}></button>
        ) : (
          <>
            {croppedImage ? (
              <div className="flex flex-col relative">
                <button
                  onClick={removeCroppedImage}
                  className="absolute left-[70%] top-[-10%]"
                >
                  <IoIosCloseCircle className="text-blue-500 text-5xl hover:cursor-pointer" />
                </button>
                <Image
                  src={croppedImage}
                  alt="Cropped Image"
                  className="mt-2  rounded"
                  width={150}
                  height={240}
                />
              </div>
            ) : (
              <label htmlFor="image-upload">
                <CiCirclePlus className="text-5xl text-blue-500 hover:cursor-pointer" />
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
