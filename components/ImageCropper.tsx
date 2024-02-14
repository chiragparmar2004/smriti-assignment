// import React, { useState, useRef } from "react";
// import ReactCrop, { Crop } from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";

// const MIN_DIMENSION = 150;

// interface ImageCropperProps {
//   closeModal: () => void;
//   updateAvatar: (imgSrc: string) => void;
// }

// const ImageCropper: React.FC<ImageCropperProps> = ({
//   closeModal,
//   updateAvatar,
// }) => {
//   const imgRef = useRef<HTMLImageElement>(null);
//   const [imgSrc, setImgSrc] = useState<string>("");
//   const [crop, setCrop] = useState<Crop>({ unit: "%", width: 100, aspect: 1 });
//   const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

//   const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const imageUrl = reader.result?.toString() || "";
//       setImgSrc(imageUrl);
//     };
//     reader.readAsDataURL(file);
//   };

//   const onImageLoaded = (image: HTMLImageElement) => {
//     if (image.width < MIN_DIMENSION || image.height < MIN_DIMENSION) {
//       setImgSrc("");
//     } else {
//       const minSize = Math.min(image.width, image.height);
//       const x = (image.width - minSize) / 2;
//       const y = (image.height - minSize) / 2;
//       setCrop({ unit: "px", width: minSize, height: minSize, x, y });
//     }
//   };

//   const onCropChange = (crop: Crop) => {
//     setCrop(crop);
//   };

//   const handleConfirm = () => {
//     if (imgRef.current && crop.width && crop.height) {
//       const canvas = document.createElement("canvas");
//       const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
//       const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
//       canvas.width = crop.width;
//       canvas.height = crop.height;
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.drawImage(
//           imgRef.current,
//           crop.x * scaleX,
//           crop.y * scaleY,
//           crop.width * scaleX,
//           crop.height * scaleY,
//           0,
//           0,
//           crop.width,
//           crop.height
//         );
//         const croppedImageUrl = canvas.toDataURL("image/jpeg");
//         setCroppedImageUrl(croppedImageUrl);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setImgSrc("");
//     setCroppedImageUrl(null);
//     closeModal();
//   };

//   return (
//     <div>
//       <label className="block mb-3 w-fit">
//         <span className="sr-only">Choose profile photo</span>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={onSelectFile}
//           className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
//         />
//       </label>
//       {imgSrc && (
//         <div className="flex flex-col items-center">
//           <ReactCrop
//             src={imgSrc}
//             crop={crop}
//             onImageLoaded={onImageLoaded}
//             onChange={onCropChange}
//             circularCrop
//             keepSelection
//             minWidth={MIN_DIMENSION}
//             minHeight={MIN_DIMENSION}
//             ref={imgRef}
//           />
//           <div className="flex mt-4">
//             <button
//               className="text-white font-mono text-xs py-2 px-4 rounded-2xl mr-2 bg-sky-500 hover:bg-sky-600"
//               onClick={handleConfirm}
//             >
//               Confirm
//             </button>
//             <button
//               className="text-white font-mono text-xs py-2 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//       {croppedImageUrl && (
//         <div className="mt-4">
//           <img src={croppedImageUrl} alt="Cropped" className="w-32 h-32" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageCropper;

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const IndexPage = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropChange = (event) => {
    const { name, value } = event.target;
    setCrop({ ...crop, [name]: value });
  };

  return (
    <>
      <Head>
        <title>Select and Crop Image in Next.js</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Select and Crop Image in Next.js
          </h1>
          <div className="mt-8">
            <input type="file" onChange={handleFileChange} />
          </div>
          {image && (
            <div className="mt-8">
              <div className="relative h-0" style={{ paddingBottom: "56.25%" }}>
                <Image
                  src={image}
                  alt="Selected Image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  onDragStart={(e) => e.preventDefault()}
                  onDrop={(e) => e.preventDefault()}
                />
              </div>
              <div className="mt-8">
                <label htmlFor="aspectRatio">Aspect Ratio:</label>
                <select
                  id="aspectRatio"
                  name="aspect"
                  value={crop.aspect}
                  onChange={handleCropChange}
                >
                  <option value="16/9">16:9</option>
                  <option value="4/3">4:3</option>
                  <option value="1/1">1:1</option>
                </select>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => {
                    console.log("Crop:", crop);
                  }}
                >
                  Crop Image
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default IndexPage;
