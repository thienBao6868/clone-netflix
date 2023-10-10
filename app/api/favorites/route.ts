import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
