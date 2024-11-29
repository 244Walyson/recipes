import React from "react";
import Image from "next/image";
import LoginContainer from "@/components/login/LoginContainer";

export default function Login() {
  return (
    <div className="w-full h-full flex">
      <Image
        src="/wave.svg"
        alt="Globe icon"
        layout="responsive"
        width={100}
        height={100}
        aria-hidden
        className="opacity-40 dark:opacity-30 absolute top-0 left-0 -z-10"
      />
      <div className="w-full h-full">
        <LoginContainer />
      </div>
    </div>
  );
}
