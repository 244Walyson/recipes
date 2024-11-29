import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const Grettings = () => {
  return (
    <div className="flex bg-card w-full rounded-3xl">
      <div className="p-10">
        <h1 className="text-3xl">Bem Vindo de volta Fulano!</h1>
        <h2 className="text-2xl">Encontre as melhores receitas</h2>
        <p className="text-base mt-5">
          Aproveite para descobrir novas receitas e compartilhar com seus amigos
        </p>

        <Button className="mt-6">Ver Todas </Button>
      </div>
      <div className="h-full mt-auto mb-0">
        <div className="w-80">
          <Image
            src="/cookImage.png"
            alt="Cook Image"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Grettings;
