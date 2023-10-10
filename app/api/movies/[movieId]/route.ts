import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request:Request,{ params }: { params: { movieId: string } },req: NextApiRequest) {
  try {
    await serverAuth(req);
    const movieId = params.movieId
    
    if(typeof movieId !== 'string'){
      throw new Error('Invalid Id')
    }
    const movie = await prismadb.movie.findUnique({
      where:{
        id:movieId
      }
    })

    return NextResponse.json(movie);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
