// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
   console.log(req.method);
   try {
      if (req.method === "GET") {
         // If the request method is POST, parse the request body as JSON
         //  const requestBody = JSON.parse(req.body);
         console.log(req.body);

         // Now, you can work with the parsed request body as needed
         console.log("Received request body:");

         // Respond with a success message or perform other actions
         res.status(200).json({
            message: "Request body received successfully"
         });
      } else {
         // Handle other HTTP methods (GET, PUT, DELETE, etc.) if needed
         res.status(405).json({ message: "Method Not Allowed" });
      }
   } catch (error) {
      console.error("Error handling request:", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
}
