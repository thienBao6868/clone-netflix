import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
interface FavoriteButtonProps {
  movieId: string ;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorite } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updateFavoriteIds = response?.data.favorriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updateFavoriteIds,
    });
    mutateFavorite();
  }, [mutate, mutateFavorite, movieId, currentUser, isFavorite]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
      className="
     cursor-pointer
     group/item
     w-6
     h-6
     lg:h-10
     lg:w-10
     border-white
     border-2
     rounded-full
     flex
     justify-center
     items-center
     transition
     hover:border-netural-300
    "
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
