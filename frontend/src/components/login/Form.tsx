"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getAccessToken,
  getRecoverPasswordToken,
} from "@/services/auth.service";
import { createUser } from "@/services/user.service";
import { IUserRequest } from "@/interfaces/user/user-request.interface";

const FormLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      const credentials = { email, password };
      const accessToken = await getAccessToken(credentials);
      console.log("accessToken", accessToken);
      router.push("/");
    } catch (error) {
      console.error("Login falhou:", error);
      setError("Erro ao tentar logar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const user = { name, username, email, password };
      await createUser(user as IUserRequest);
      setSuccess("Usuário criado com sucesso!");
      setIsRegistering(false);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setError("Erro ao tentar criar usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecoverPassword = async () => {
    try {
      setLoading(true);
      await getRecoverPasswordToken(email);
      setSuccess("Email enviado com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error("Login falhou:", error);
      setError("Erro ao enviar Email. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 5000);
  }, [error, success]);

  const handleSubmit = () => {
    if (isRegistering) {
      handleRegister();
      return;
    }
    if (isRecoveringPassword) {
      handleRecoverPassword();
      return;
    }
    handleLogin();
  };

  const buttonText = () => {
    if (loading) {
      return "Carregando...";
    }
    if (isRegistering) {
      return "Cadastrar";
    }
    if (isRecoveringPassword) {
      return "Enviar Email de Recuperação";
    }
    return "Entrar";
  };

  return (
    <div className="flex flex-col w-[400px] py-12">
      {isRegistering && (
        <>
          <div className="pt-6">
            <span className="text-base">Name</span>
            <Input
              className="h-10"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="pt-6">
            <span className="text-base">Username</span>
            <Input
              className="h-10"
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="pt-6">
        <span className="text-base">Email</span>
        <Input
          className="h-10"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {!isRecoveringPassword && (
        <div className="pt-6">
          <span className="text-base">Password</span>
          <Input
            className="h-10"
            type="password"
            placeholder="mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}

      {error && <p className="text-red-500 pt-2">{error}</p>}
      {success && <p className="text-green-500 pt-2">{success}</p>}

      {!isRegistering && (
        <div className="pt-6 w-full text-end">
          <button
            onClick={() => setIsRecoveringPassword(!isRecoveringPassword)}
            className="text-base"
          >
            {isRecoveringPassword ? "Voltar para login" : "Esqueci minha senha"}
          </button>
        </div>
      )}

      <Button className="mt-6" onClick={handleSubmit} disabled={loading}>
        {buttonText()}
      </Button>

      <div className="pt-6 text-center">
        <button
          className="text-base cursor-pointer text-primary bg-transparent border-none p-0"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Já tem uma conta? Entrar"
            : "Não tem uma conta? Cadastre-se"}
        </button>
      </div>

      <div className="w-full pt-12 flex justify-center items-center">
        <div className="w-full h-[1px] bg-primary"></div>
        <p className="px-2">ou</p>
        <div className="w-full h-[1px] bg-primary"></div>
      </div>

      <div className="w-full flex justify-center items-center mt-6 border rounded-lg h-10 border-input">
        <Image src="/Google.svg" alt="Google icon" width={30} height={30} />
        <p className="px-2">Entrar com Google</p>
      </div>
      <div className="w-full flex justify-center items-center mt-6 border rounded-lg h-10 border-input">
        <Image src="/github.svg" alt="Github icon" width={30} height={30} />
        <p className="px-2">Entrar com Github</p>
      </div>
    </div>
  );
};

export default FormLogin;
