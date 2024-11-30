"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { resetPassword } from "@/services/auth.service";

const ResetPasswordContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleResetPassword = async () => {
    if (!token) {
      setError("Invalid or missing token.");
      return;
    }
    if (!email) {
      setError("Invalid or missing email.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await resetPassword(email, token, password);
      setSuccess("Password reset successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-background justify-center py-12">
      <div className="w-[400px] p-6 md:bg-background rounded-lg shadow-md z-50">
        <h1 className="text-3xl font-semibold text-foreground pb-6">
          Resetar senha
        </h1>
        <div className="pt-6">
          <span className="text-base">Nova Senha</span>
          <Input
            className="h-10"
            type="password"
            placeholder="Digite sua nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 pt-2">{error}</p>}
        {success && <p className="text-green-500 pt-2">{success}</p>}
        <div className="pt-6">
          <Button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full h-10"
          >
            {loading ? "Resetando..." : "Resetar Senha"}
          </Button>
        </div>
      </div>

      <div className="absolute top-0 w-full md:hidden">
        <Image
          src="topWave.svg"
          alt="top wave"
          width={100}
          height={100}
          className="object-cover w-full"
        />
      </div>
      <div className="absolute bottom-0 w-full md:hidden">
        <Image
          src="bottomWave.svg"
          alt="bottom wave"
          width={100}
          height={100}
          className="object-cover w-full"
        />
      </div>
    </div>
  );
};

const ResetPassword = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <ResetPasswordContent />
  </Suspense>
);

export default ResetPassword;
