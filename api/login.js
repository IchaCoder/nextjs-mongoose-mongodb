import Test from "@/models/testModel";
import connectMongo from "@/utils/connectdb";
const getUsers = async (req, res) => {
   console.log("CONNECTING TO MONGO");
   await connectMongo();
   try {
      console.log("CONNECTED TO MONGO");
      const test = await Test.find();
      console.log("DATA FETCHED");
      return res.status(200).json({ test });
      // Dont forget the await keyword
   } catch (error) {
      console.log(error);
      return res.status(404).json({ error });
   }
};

export default getUsers;
