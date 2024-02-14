// import { useState } from "react";
// // import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
// import { Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// const PDFViewer: React.FC = () => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   const previousPage = () => {
//     if (pageNumber > 1) {
//       setPageNumber(pageNumber - 1);
//     }
//   };

//   const nextPage = () => {
//     if (pageNumber < numPages) {
//       setPageNumber(pageNumber + 1);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <Document
//         file="../public/YOUR_IELTS_WRITING_BAND.pdf"
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//         ))}
//       </Document>
//     </div>
//   );
// };

// export default PDFViewer;

"use client";
import React from "react";

const PDFViewer = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <iframe
        title="PDF Viewer"
        style={{ width: "100%", height: "100%" }}
        src="../public/YOUR_IELTS_WRITING_BAND.pdf"
      />
    </div>
  );
};

export default PDFViewer;
