import { User, Search, House, LogOut, Plus } from "lucide-react";
import { ElementType } from "react";

export interface INavbarItems {
  id?: number;
  path: string;
  icon: ElementType;
  text: string;
  strokeWidth?: number;
  filled?: boolean;
}

export const navbar_items: INavbarItems[] = [
  {
    id: 1,
    path: "/",
    icon: House,
    text: "home",
    strokeWidth: 2.5,
  },
  {
    id: 2,
    path: "/search",
    icon: Search,
    text: "search",
  },
  {
    id: 3,
    path: "/create-recipe",
    icon: Plus,
    text: "create recipe",
  },
  {
    id: 6,
    path: "/account",
    icon: User,
    text: "account",
  },
  {
    id: 7,
    path: "/logout",
    icon: LogOut,
    text: "logout",
  },
];
