// route.ts
import { NextApiRequest, NextApiResponse } from "next";

const convertImageToText = async (imageData: string): Promise<string> => {
  // Here you can implement your logic to convert the image data to text
  // For demonstration purposes, let's just return a dummy text
  return "This is a dummy text extracted from the image.";
};
export { convertImageToText };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       // Extract image data from the request body
//       const { imageData } = req.body;

//       // Perform image to text conversion
//       const textData = await convertImageToText(imageData);

//       return res.status(200).json({ textData });
//     } catch (error) {
//       console.error("Error converting image to text:", error);
//       res.status(500).json({ error: "Error converting image to text" });
//     }
//   } else {
//     // Method not allowed
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
