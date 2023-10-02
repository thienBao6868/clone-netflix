import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400 });
  }
}
