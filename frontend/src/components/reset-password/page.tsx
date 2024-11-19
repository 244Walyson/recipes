"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import bottomWave from "../../assets/bottomWave.svg";
import topWave from "../../assets/topWave.svg";
import { resetPassword } from "@/services/passwordService";

const ResetPasswordContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      await resetPassword(email, token, password);
      alert("Password reset successfully!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full bg-background h-screen justify-center items-center">
      <div className="w-11/12 h-[400px] p-3 z-40">
        <h1 className="text-4xl pb-3">Resetar senha</h1>
        <Input
          placeholder="Nova senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 pt-2">{error}</p>}
        <div className="flex w-full justify-end pt-3">
          <Button onClick={handleResetPassword} disabled={loading}>
            {loading ? "Resetando..." : "Resetar"}
          </Button>
        </div>
      </div>
      <Image src={topWave} alt="top wave" className="absolute top-0 w-full" />
      <Image
        src={bottomWave}
        alt="bottom wave"
        className="absolute bottom-0 w-full"
      />
    </div>
  );
};

const ResetPassword = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <ResetPasswordContent />
  </Suspense>
);

export default ResetPassword;
