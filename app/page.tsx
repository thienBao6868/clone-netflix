"use client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Button from "./components/Button";

import useCurrentUser from "@/hooks/useCurrentUser";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import severAuth from "@/lib/serverAuth";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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

  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-6xl text-green-500">Next JS</h1>
      <p className="text-6xl text-green-500">{user?.email}</p>
      <Button />
    </>
  );
}
