import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import ArrowIcon from "../ui/icons/arrowIcon/ArrowIcon";
import { navigationList } from "../../utils/constants";
import NavLinkIcon from "../ui/icons/navLinkIcon/NavLinkIcon";
export default function Navbar() {
  return (
    <aside className="navbar">
      <div className="navbar__header">
        <div className="navbar__title-container">
          <h5 className="navbar__title">Название проекта</h5>
          <p className="navbar__subtile">Аббревиатура</p>
        </div>
        <ArrowIcon />
      </div>

      {navigationList.map((item) => {
        return (
          <NavLink
            key={item}
            to={item === "СМР" ? "#" : `/${item}`}
            className={({ isActive }) =>
              isActive
                ? "navbar__link navbar__link_active"
                : "navbar__link navbar__link_default"
            }
          >
            <NavLinkIcon />
            <p>{item}</p>
          </NavLink>
        );
      })}
    </aside>
  );
}
