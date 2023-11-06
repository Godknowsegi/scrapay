import { MouseEvent } from "react";
import { IconType } from "react-icons";
import { useNavigate, useLocation } from "react-router-dom";

const SideNavLink = ({
  name,
  path,
  Icon,
}: {
  name: string;
  path: string;
  Icon: IconType;
}) => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const handleClick = (
    evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    href: string
  ) => {
    evt.preventDefault();
    evt.stopPropagation();

    navigate(href);
  };

  return (
    <div className="mb-3">
      <div
        className={`transition duration-1000 rounded-lg ${
          pathname.pathname === path
            ? "hover:cursor-pointer   p-2 md:p-1   md:block bg-white shadow-sm border border-slate-100 "
            : "hover:cursor-pointer  p-2 md:p-1   md:block   hover:bg-gray-100 font-light"
        }`}
        onClick={(e) => {
          handleClick(e, path);
        }}
      >
        <div className="flex space-x-2 items-center  ">
          <div
            className={` transition duration-700 rounded-full
             ${
               pathname.pathname == path
                 ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500  p-1.5 text-lg text-[#ffffff]"
                 : "text-secondary  text-xl  p-1.5 "
             }`}
          >
            <Icon />
          </div>
          <div
            className={
              pathname.pathname == path
                ? "capitalize text-xs font-semibold   text-[#00023D]"
                : "capitalize text-sm font-medium   text-[#00023D]/50"
            }
          >
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavLink;
