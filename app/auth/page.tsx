"use client";
import React, { useCallback, useState } from "react";
import { Input } from "../components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((Variant) => (Variant === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        password,
        name,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, name, login]);

  return (
    <div className="h-full w-full bg-[url(/images/hero.jpeg)] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50 ">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Create an account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  label="Name"
                  onchange={(ev: any) => setName(ev.target.value)}
                  type="name"
                  value={name}
                />
              )}
              <Input
                id="email"
                label="Email"
                onchange={(ev: any) => setEmail(ev.target.value)}
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="Password"
                onchange={(ev: any) => setPassword(ev.target.value)}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row item-center justify-center gap-4 mt-8">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="bg-white w-10 h-10 rounded-full items-center justify-center flex cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="bg-white w-10 h-10 rounded-full items-center justify-center flex cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12 text-sm">
              {variant === "login"
                ? " First time using Netflix?"
                : "Already have an account?"}

              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer "
              >
                {variant === "login" ? " Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
