import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    await serverAuth(req);
    const movies = await prismadb.movie.findMany()
    
    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return NextResponse.json('No sign In',{ status: 500 });
  }
}
