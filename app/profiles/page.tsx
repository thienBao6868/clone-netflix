"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const Profiles = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth?callbackUrl=/profiles");
    },
  });
  const { data: user } = useCurrentUser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col ">
        <h1 className="text-3xl text-white md:text-6xl text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push('/')}>
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
                 w-44
                 h-44
                 rounded-md
                 flex
                 items-center
                 justify-center
                 border-2
                 border-transparent
                 group-hover: cursor-pointer
                 group-hover:border-white
                 overflow-hidden
                "
              >
                <img src="/images/default-blue.png" alt="profiles" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
