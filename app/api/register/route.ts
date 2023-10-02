import bcrypt from "bcrypt";
// import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//     console.log('hello')
//   if (req.method !== "POST") {
//     return res.status(405).end();
//   }
//   try {
//     const { email, password, name } = req.body;

//     const existingUser = await prismadb.user.findUnique({
//       where: {
//         email,
//       },
//     });
//     if (existingUser) {
//       return res.status(422).json({ error: "Email taken" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const user = prismadb.user.create({
//       data: {
//         email,
//         name,
//         hashedPassword,
//         image: "",
//         emailVerified: new Date(),
//       },
//     });
//     return res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).end();
//   }
// }

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Email taken" }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400 });
  }
}
