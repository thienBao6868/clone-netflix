'use client'
import useSWR from "swr";
import { Movie } from "@prisma/client";
import axios from "axios";


const useMovie = (id?:string) => {
    const fetcher = async (url: string)  => {
        const res = await axios(url);
        return res.data;
      
      };
  const { data, isLoading, error } = useSWR<Movie>(id? `/api/movies/${id}`:null, fetcher,
  
  {
    revalidateIfStale:false,
    revalidateOnFocus:false,
    revalidateOnReconnect:false,

  });
  return {
    data,
    isLoading,
    error,
  };
};
export default useMovie;
