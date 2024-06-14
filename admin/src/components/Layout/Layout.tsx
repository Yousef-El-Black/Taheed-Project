import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
