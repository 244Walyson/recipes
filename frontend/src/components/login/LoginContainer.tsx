import React from "react";
import FormLogin from "./Form";
import { ThemeToggle } from "../ThemeToggle";

const LoginContainer = () => {
  return (
    <div className="flex h-full items-center justify-center ">
      <div className="flex flex-col text-start justify-center h-full">
        <h1 className="text-4xl flex pb-7">Bem vindo de volta!</h1>

        <p className="text-sm max-w-[400px]">
          Hoje é um novo dia, e ele começa na sua cozinha. Faça suas receitas
          com amor. Entre e comece a criar!
        </p>
        <FormLogin />
      </div>
      <div className="absolute bottom-10 left-10">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default LoginContainer;
