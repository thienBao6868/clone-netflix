"use client";
import fetcher from "@/lib/fetcher";
import { User } from "@prisma/client";

import useSWR from "swr";

function useFavorites() {
  //const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data, error, isLoading, mutate } = useSWR<User>(
    "/api/favorites",
    fetcher,
    {
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

export default useFavorites;
