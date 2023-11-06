import { FaClipboardList } from "react-icons/fa";
import { MdDashboardCustomize, MdManageAccounts } from "react-icons/md";
import { TbTableOptions } from "react-icons/tb";
import { RiPlantFill } from "react-icons/ri";

export const sideNavLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    Icon: MdDashboardCustomize,
    chidren: null,
  },

  {
    name: "Account",
    path: "/dashboard/account",
    Icon: MdManageAccounts,
    chidren: null,
  },
  {
    name: "Investments",
    path: "#",
    Icon: RiPlantFill,
    chidren: null,
  },
  {
    name: "Packages",
    path: "#",
    Icon: TbTableOptions,
    chidren: null,
  },
  {
    name: "Transactions",
    path: "#",
    Icon: FaClipboardList,
    chidren: null,
  },
];
