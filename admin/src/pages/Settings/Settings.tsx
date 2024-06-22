import styles from "./settings.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Settings = () => {
  const [admins, setAdmins] = useState<any>([]);

  const { currentAdmin } = useSelector((state: any) => state.admin);

  const navigate = useNavigate();

  const getAdmins = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}admin/`, {
        headers: { Authorization: "bearer " + currentAdmin.accessToken },
      });
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAdmin = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}admin/${id}`, {
        headers: { Authorization: "bearer " + currentAdmin.accessToken },
        data: { editorID: currentAdmin._id },
      });
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div className={styles.settingsPage}>
      <ul>
        <li className={styles.navItemActive}>الـمستخدمين</li>
        <li>نص الإتفاقية</li>
        <li>اعتماد ايصال التحويل</li>
        <li>اعدادات عامة</li>
      </ul>
      <div className={styles.table}>
        <div className={styles.headingRow}>
          <div className={styles.headingItem}>الـمستخدم</div>
          <div className={styles.headingItem}>البريد الالكتروني</div>
          <div className={styles.headingItem}>صلاحية الدخول</div>
          <div className={styles.headingItem}></div>
        </div>
        {admins &&
          admins.map((admin: any) => {
            return (
              <div className={styles.row} key={admin._id}>
                <div className={styles.item}>{admin.fullName}</div>
                <div className={styles.item}>{admin.email}</div>
                <div className={styles.item}>
                  {admin.fullAccess ? "نعم" : "لا"}
                </div>
                <div
                  className={styles.deleteItem}
                  onClick={() => deleteAdmin(admin._id)}
                >
                  حذف المستخدم
                </div>
              </div>
            );
          })}
      </div>
      <Link className={styles.btn} to={"/addadmin"}>
        <button>اضف مستخدم جديد</button>
      </Link>
      <h1 className={styles.warning}>
        Use Your Desktop To get Full Access to this Page
      </h1>
    </div>
  );
};

export default Settings;
