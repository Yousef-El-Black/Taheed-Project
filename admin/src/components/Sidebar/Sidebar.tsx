import { Link } from "react-router-dom";
import styles from "./sidebar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("");

  // Toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close Menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Active Page
  const href = useLocation();

  useEffect(() => {
    setActivePage(href.pathname.split("/")[1]);
  }, [href, activePage]);

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <MenuIcon fontSize="large" />
          <img src="/assets/images/Logo.png" alt="Logo Shadow" />
        </div>
        <ul>
          <li>
            <div
              className={`${styles.activeSign} ${
                activePage === "" ? styles.active : ""
              }`}
            ></div>
            <Link to={"/"}>الرئيسية</Link>
          </li>
          <li>
            <div
              className={`${styles.activeSign} ${
                activePage === "members" ? styles.active : ""
              }`}
            ></div>
            <Link to={"/members"}>العملاء</Link>
          </li>
          <li>
            <div
              className={`${styles.activeSign} ${
                activePage === "items" ? styles.active : ""
              }`}
            ></div>
            <Link to={"/items"}>الدراجات النارية</Link>
          </li>
          <li>
            <div
              className={`${styles.activeSign} ${
                activePage === "settings" ? styles.active : ""
              }`}
            ></div>
            <Link to={"/settings"}>اعدادات</Link>
          </li>
          <li>
            <Link to={""}></Link>
          </li>
          <li>
            <Link to={""}></Link>
          </li>
        </ul>
      </div>
      <div className={styles.mobileSidebar}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <MenuIcon fontSize="large" />
        </div>
        <div
          className={styles.sidebarContent}
          style={{ transform: `translateX(${isMenuOpen ? "0" : "100"}%)` }}
        >
          <div className={styles.mobileHeader}>
            <img src="/assets/images/Logo.png" alt="Logo Shadow" />
          </div>
          <ul>
            <li>
              <div
                className={`${styles.activeSign} ${
                  activePage === "" ? styles.active : ""
                }`}
              ></div>
              <Link to={"/"}>الرئيسية</Link>
            </li>
            <li>
              <div
                className={`${styles.activeSign} ${
                  activePage === "members" ? styles.active : ""
                }`}
              ></div>
              <Link to={"/members"}>العملاء</Link>
            </li>
            <li>
              <div
                className={`${styles.activeSign} ${
                  activePage === "items" ? styles.active : ""
                }`}
              ></div>
              <Link to={"/items"}>الدراجات النارية</Link>
            </li>
            <li>
              <div
                className={`${styles.activeSign} ${
                  activePage === "settings" ? styles.active : ""
                }`}
              ></div>
              <Link to={"/settings"}>اعدادات</Link>
            </li>
            <li>
              <Link to={""}></Link>
            </li>
            <li>
              <Link to={""}></Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={styles.overlay}
        onClick={closeMenu}
        style={{ display: `${isMenuOpen ? "block" : "none"}` }}
      ></div>
    </>
  );
};

export default Sidebar;
