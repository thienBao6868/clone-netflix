'use client'
import useSWR from "swr";
import { Movie } from "@prisma/client";
import axios from "axios";
const useMovieList = () => {
    const fetcher = async (url: string)  => {
        const res = await axios(url);
        return res.data;
      
      };
  const { data, isLoading, error } = useSWR<Movie>("/api/movies", fetcher);
  return {
    data,
    isLoading,
    error,
  };
};
export default useMovieList;
