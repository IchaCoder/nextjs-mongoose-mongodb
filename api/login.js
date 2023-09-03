import User from "@/models/User";
import connectMongo from "@/utils/connectdb";
import { sign } from "jsonwebtoken";

const login = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res
         .status(400)
         .json({ message: "Please provide email and password" });
   }

   try {
      // await connectMongo();
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(401).json({ message: "Email not found" });
      }

      const token = sign({ userId: user._id, name: user.name }, "jwt-secret", {
         expiresIn: "30d"
      });

      return res.status(200).json({ user: { name: user.name }, token });
   } catch (error) {}
};

export default login;
