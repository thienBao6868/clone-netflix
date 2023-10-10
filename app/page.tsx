"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";
import Billboard from "./components/Billboard";
import MovieList from "./components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "./components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export default function Home() {
  //const session = getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth?callbackUrl=/");
  // }
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth?callbackUrl=/");
    },
  });

  const { data: movies = [] } = useMovieList();
  const {data:myList = []} = useFavorites()
  const {isOpen,closeModal}= useInfoModal()

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={myList}/>
      </div>
    </>
  );
}
