import SideNavLink from "./SideNavLink";
import { sideNavLinks } from "./list";

function SideNav() {
  return (
    <div className=" md:p-5 md:pl-10">
      {sideNavLinks.map((item, index) => (
        <SideNavLink
          key={index}
          Icon={item.Icon}
          name={item.name}
          path={item.path}
        />
      ))}
    </div>
  );
}

export default SideNav;
