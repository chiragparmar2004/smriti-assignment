"use client";

import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { MdCancel } from "react-icons/md";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  onConfirm: (croppedImage: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageUrl,
  onClose,
  onConfirm,
}) => {
  const [croppedImage, setCroppedImage] = useState<string>("");
  const cropperRef = useRef<Cropper>(null);

  const handleConfirm = () => {
    if (
      cropperRef.current &&
      typeof cropperRef.current.getCroppedCanvas === "function"
    ) {
      const canvas = cropperRef.current.getCroppedCanvas();
      if (canvas !== null) {
        const croppedImageData = canvas.toDataURL();
        setCroppedImage(croppedImageData);
        onConfirm(croppedImageData);
        // console.log("This is the Cropped Image", croppedImageData);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4">
        <Cropper
          className="h-[500px] min-w-[80%]"
          initialAspectRatio={1}
          src={imageUrl}
          background={false}
          responsive={true}
          zoomable={true}
          onInitialized={(instance) => {
            cropperRef.current = instance;
          }}
        />
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
        {croppedImage && (
          <img
            src={croppedImage}
            alt="Cropped Image"
            className="mt-2 max-h-60 w-auto rounded"
          />
        )}
      </div>
    </div>
  );
};

export default ImageModal;
