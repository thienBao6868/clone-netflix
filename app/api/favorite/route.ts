import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { without } from "lodash";

export async function POST(request: Request,req: NextApiRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    
    const {movieId}= await request.json();
   
   

    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      throw new Error("Invalid Id");
    }

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function DELETE(request:Request,req: NextApiRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    
    const {movieId}= await request.json();

    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      throw new Error("Invalid Id");
    }

    const updateFavoriteIds = without(currentUser.favoriteIds, movieId);
    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: updateFavoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
