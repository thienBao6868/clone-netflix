import { signOut } from "next-auth/react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Button from "./components/Button";
import { redirect } from "next/navigation";

export async function checkSession() {
  const session = await getServerSession(authOptions);
  console.log(session, "test");
  if (!session) {
    return false;
  }

  return {
    props: {},
  };
}

export default async function Home() {
  const check = await checkSession();
  if (!check) {
    redirect("/auth");
  }
  return (
    <>
      <h1 className="text-6xl text-green-500">Next JS</h1>
      <Button />
    </>
  );
}
