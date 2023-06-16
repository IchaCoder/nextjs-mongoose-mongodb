import connectMongo from "@/utils/connectdb";
import Test from "@/models/testModel";
export default async function (req, res) {
   const { method } = req;

   // Dont forget the await keyword
   console.log("CONNECTING TO MONGO");
   await connectMongo();

   switch (method) {
      case "GET":
         try {
            console.log("CONNECTED TO MONGO");
            const test = await Test.find();
            console.log("DATA FETCHED");
            return res.json({ test });
            // Dont forget the await keyword
         } catch (error) {
            console.log(error);
            return res.json({ error });
         }

      case "POST":
         try {
            console.log("CONNECTING TO MONGO");
            await connectMongo();
            console.log("CONNECTED TO MONGO");

            console.log("CREATING DOCUMENT");
            const test = await Test.create(req.body);
            console.log("CREATED DOCUMENT");

            return res.json({ test });
         } catch (error) {
            console.log(error);
            return res.json({ error });
         }

      default:
         res.status(404).send({ error: "Method not configured" });
         break;
   }
}
