import "./Header.scss";
import MenuIcon from "../ui/icons/menuIcon/MenuIcon";
import NavBackIcon from "../ui/icons/navBackIcon/NavBackIcon";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <MenuIcon />
      <NavBackIcon />
      <NavLink
        to={"#"}
        className={({ isActive }) =>
          isActive
            ? "header__link header__link_active"
            : "header__link header__link_default"
        }
      >
        Просмотр
      </NavLink>
      <NavLink
        to={"/Управление"}
        className={({ isActive }) =>
          isActive
            ? "header__link header__link_active"
            : "header__link header__link_default"
        }
      >
        Управление
      </NavLink>
    </header>
  );
}
