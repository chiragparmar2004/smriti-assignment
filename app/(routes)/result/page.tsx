"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Result: React.FC = () => {
  const pathname = usePathname(); // Use useNavigation instead of useRouter
  const search = useSearchParams();
  const router = useRouter();
  // Extract the text from the query parameter
  const text = `${search}`;
  console.log(search);

  return (
    <div className="flex flex-col mx-auto p-4 items-center">
      <h1 className="text-2xl font-bold text-center mt-3 mb-4">
        Converted Text
      </h1>
      <div className="w-10/12 h-[400px] bg-white border mt-3 rounded-xl shadow-xl">
        <p className="px-5 py-5">{text}</p> {/* Display the text */}
      </div>
      <button
        className="w-[220px] mt-7 bg-blue-500 hover:bg-blue-400 transition-all duration-200 text-white py-1 px-3 rounded-lg"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default Result;
