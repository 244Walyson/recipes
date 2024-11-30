import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IUserResponse } from "@/interfaces/user/user-response.interface";
import { getStoredUserID, getUser } from "@/services/user.service";

const Grettings = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUserResponse>();

  const handleSeeAllClick = () => {
    router.push("/search");
  };

  useEffect(() => {
    try {
      const userId = getStoredUserID();
      if (userId) {
        getUser(userId).then((user) => setUser(user));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex bg-card w-full rounded-3xl">
      <div className="p-10">
        <h1 className="text-3xl">Bem Vindo de volta {user?.name}!</h1>
        <h2 className="text-2xl">Encontre as melhores receitas</h2>
        <p className="text-base mt-5">
          Aproveite para descobrir novas receitas e compartilhar com seus amigos
        </p>

        <Button onClick={handleSeeAllClick} className="mt-6">
          Ver Todas{" "}
        </Button>
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
