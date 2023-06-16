import connectMongo from "@/utils/connectdb";
import Test from "@/models/testModel";

export default async function addTest(req, res) {
   //    const { name, email } = req.body;

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
}
