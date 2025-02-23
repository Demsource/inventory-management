import { NavLink, useLocation } from "react-router-dom";
import "./AppHeader.css";

const AppHeader = () => {
  const location = useLocation();
  const activePage = location.pathname;

  return (
    <div className="app-header">
      <nav>
        <NavLink
          to={activePage === "/add-inventory" ? "#" : "/"}
          className={
            activePage === "/" || activePage === "/add-inventory"
              ? "active-page"
              : ""
          }
        >
          Inventories
        </NavLink>
        <NavLink
          to={
            activePage === "/add-location" ||
            activePage.includes("/edit-location")
              ? "#"
              : "/locations"
          }
          className={
            activePage === "/locations" ||
            activePage === "/add-location" ||
            activePage.includes("/edit-location")
              ? "active-page"
              : ""
          }
        >
          Locations
        </NavLink>
      </nav>
    </div>
  );
};

export default AppHeader;
