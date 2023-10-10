'use client'
import useSWR from "swr";

import { Movie } from "@prisma/client";
import axios from "axios";
const useBillboard = () => {
    const fetcher = async (url: string)  => {
        const res = await axios(url);
        return res.data;
      
      };
  const { data, isLoading, error } = useSWR<Movie>("/api/random", fetcher);
  return {
    data,
    isLoading,
    error,
  };
};
export default useBillboard;
