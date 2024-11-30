"use client";

import { NavbarItems } from "@/components/navbar/navbarItems";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navbar_items } from "@/static/navbar_items";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import Dialog from "../alertDialog";
import {
  getStoredUserID,
  getUser,
  removeStoredUserID,
} from "@/services/user.service";
import { removeTokens } from "@/services/token.service";
import { IUserResponse } from "@/interfaces/user/user-response.interface";

const Navbar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<IUserResponse>();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    removeStoredUserID();
    removeTokens();
    router.push("/login");
  };

  useEffect(() => {
    const getAvatarUrl = async () => {
      const userId = await getStoredUserID();
      if (userId) {
        const user = await getUser(userId);
        setUser(user);
      }
    };
    getAvatarUrl();
  }, []);

  return (
    <div className="flex w-full h-full">
      <nav
        className={`${
          open ? "w-80 p-4" : "w-20 p-4"
        } h-screen bg-navbar fixed flex flex-col justify-between items-center transition-all duration-300 ease-in-out text-navbar-foreground`}
      >
        <div className="w-full">
          <div className="flex items-center justify-center p-4 h-24">
            <div className="flex w-full">
              <Avatar>
                <AvatarImage src={user?.imgUrl} />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>

              {open && (
                <div className="ml-4 text-navbar-foreground h-full w-full flex flex-col">
                  <span className="text-lg">{user?.name}</span>
                  <span className="text-xs">{user?.username}</span>
                </div>
              )}
            </div>
          </div>

          <div className="items-center mt-4 flex justify-center">
            <ChevronRight
              className={`w-6 h-6 hover:bg-dark-shade rounded-full cursor-pointer top-4 transition-transform duration-300 ease-in-out ${
                open ? "rotate-180" : ""
              }`}
              onClick={handleOpen}
            />
          </div>

          <ul
            className={`w-full space-y-11 mt-12 transition-opacity duration-300`}
          >
            {navbar_items?.map((item) => (
              <li
                key={item.id}
                className={`w-full my-2 cursor-pointer rounded-2xl flex items-center hover:bg-dark-shade ${
                  pathName === item.path ? "bg-dark-shade" : ""
                }`}
              >
                {item.path === "/logout" ? (
                  <Dialog
                    title="Terminar sessão?"
                    description="Você terá de fazer login novamente"
                    btnOpen={
                      <NavbarItems
                        path={item.path}
                        icon={item.icon}
                        text={item.text}
                        filled={item.filled}
                      />
                    }
                    confirm="Confirmar"
                    cancel="Cancelar"
                    onCancel={() => setOpen(false)}
                    onConfirm={handleLogout}
                  />
                ) : (
                  <Link href={item.path}>
                    <NavbarItems
                      path={item.path}
                      icon={item.icon}
                      text={item.text}
                      filled={item.filled}
                    />
                  </Link>
                )}

                {open &&
                  (item.path !== "/logout" ? (
                    <Link href={item.path}>
                      <span className="ml-4">{item.text}</span>
                    </Link>
                  ) : (
                    <span className="ml-4">{item.text}</span>
                  ))}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full">
          <div className="flex items-center p-2">
            <div className="w-10 h-10">
              <ThemeToggle />
            </div>
            {open && <span className="w-full ml-4">Tema</span>}
          </div>
        </div>
      </nav>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          open ? "ml-80" : "ml-20"
        } h-full`}
      >
        {children}
      </div>
    </div>
  );
};

export default Navbar;
