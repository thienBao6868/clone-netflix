"use client";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";
import React from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";

interface wathchProps {
  params: { movieId: string };
}

const Watch: React.FC<wathchProps> = ({ params }) => {
    const router = useRouter()
  const { data } = useMovie(params.movieId);

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="
        fixed
        w-full
        p-4
        z-10
        flex
        flex-row
        items-center
        gap-8
        bg-black
        bg-opacity-70
        "
      >
        <AiOutlineArrowLeft onClick={()=> router.push('/')} className="text-white cursor-pointer" size={40}  />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watch: </span>
          {data?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        src={data?.videoUrl}
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default Watch;