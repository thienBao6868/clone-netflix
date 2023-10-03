
import { NextApiRequest, NextApiResponse } from "next";


import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const severAuth = async (req: NextApiRequest) => {
  
  const session = await getServerSession(authOptions)
  console.log(session,"test")
  if (!session?.user?.email) {
    throw new Error("Not Signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });
  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return { currentUser };
};
export default severAuth;
