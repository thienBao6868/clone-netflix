import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/navigation";
import { BiChevronDown } from "react-icons/bi";
import useInfoModal from "@/hooks/useInfoModal";

interface MovieCardProps {
  data: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const {openModal} = useInfoModal()

  return (
    <div
      className="
        group
        bg-zinc-900
        col-span
        relative
        h-[12vw]
    "
    >
      <img
        className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        dalay-300
        w-full
        h-[12vw]
        "
        src={data.thumbnailUrl}
        alt="thumbnai"
      />
      <div
        className="
            opacity-0
            absolute
            top-0
            transition
            duration-200
            z-10
            invisible
            sm:visible
            delay-300
            w-full
            scale-0
            group-hover:scale-110
            group-hover:-translate-y-[6vw]
            group-hover:translate-x-[2vw]
            group-hover:opacity-100   
        "
      >
        <img
          src={data.thumbnailUrl}
          alt="Movie"
          className="
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-t-md
                w-full
                h-[12vw]
            "
        />
        <div
          className="
            z-10
            bg-zinc-800
            p-2
            lg:p-4
            absolute
            w-full
            transition
            shadow-md
            rounded-b-md
        "
        >
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="
                cursor-pointer
                w-6
                h-6
                lg:w-10
                lg:h-10
                bg-white
                rounded-full
                justify-center
                items-center
                transition
                hover:bg-neutral-300
                "
            >
              <AiFillPlayCircle className="w-6 h-6 lg:w-10 lg:h-10" />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
            onClick={()=>openModal(data?.id)}
            className="
            cursor-pointer 
            ml-auto
            group/item
            w-6
            h-6
            lg:w-10
            lg:h-10
           border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
           hover:border-neutral-300
           ">
            <BiChevronDown size={30} className="text-white group-hover/item:text-neutral-300"/>
           </div>
          </div>
          <p className="text-green-400 mt-4 font-semibold">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px]lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[10px] text-white lg:text-sm">
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
