"use client";
import fetcher from "@/lib/fetcher";
import { User } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

function useCurrentUser() {
  //const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data, error, isLoading, mutate } = useSWR<User>(
    "/api/current",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

export default useCurrentUser;
