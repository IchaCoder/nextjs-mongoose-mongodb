import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
   try {
      // faced errors using only "/api/test"
      const res = await axios.get("http://localhost:3000/api/test");
      return {
         props: { data: res.data },
      };
   } catch (error) {
      console.log({ error });
   }
};

export default function Home({ data }) {
   return (
      <main
         className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
         <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
            {data.test.map((item) => {
               return (
                  <a
                     href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
                     className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                     target="_blank"
                     rel="noopener noreferrer"
                     id="item._id"
                  >
                     <h2 className={`mb-3 text-2xl font-semibold`}>
                        {item.name}{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                           -&gt;
                        </span>
                     </h2>
                     <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        {item.email}
                     </p>
                  </a>
               );
            })}
         </div>
      </main>
   );
}
