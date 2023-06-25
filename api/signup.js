import Test from "@/models/testModel";
import connectMongo from "@/utils/connectdb";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
const signup = async (req, res) => {
   const { name, email, password } = req.body;
   console.log(req.body);
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const tempUser = { name, email, password: hashedPassword };

   try {
      await connectMongo();
      console.log("CONNECTED TO MONGO");

      const test = await Test.create(req.body);
      console.log("CREATED DOCUMENT");
      const token = sign({ userId: test._id, name: test.name }, "jwt-secret", {
         expiresIn: "30d",
      });
      return res.status(200).json({ user: { name: test.name }, token });
   } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
   }
};

export default signup;
