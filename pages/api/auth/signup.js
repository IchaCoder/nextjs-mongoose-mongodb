import connectMongo from "@/utils/connectdb";
import getUsers from "@/api/login";
import signup from "@/api/signup";

export default async function (req, res) {
   const { method } = req;

   switch (method) {
      case "POST":
         signup(req, res);
         break;

      default:
         res.status(404).send({ error: "Method not configured" });
         break;
   }
}
