import { INavbarItems } from "@/static/navbar_items";

import { usePathname } from "next/navigation";

import Tooltip from "@/components/tooltip";

export const NavbarItems = ({
  path,
  icon: Icon,
  text,
  filled,
}: INavbarItems) => {
  const pathName = usePathname();

  return (
    <Tooltip text={text} side="right">
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-2xl ${
          pathName === path ? "bg-dark-shade" : "hover:bg-dark-shade"
        }`}
      >
        <Icon fill={filled ? "#fff" : "none"} className="w-6 h-6" />
      </div>
    </Tooltip>
  );
};
