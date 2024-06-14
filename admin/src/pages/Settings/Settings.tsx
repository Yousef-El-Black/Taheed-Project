import styles from "./settings.module.scss";

const Settings = () => {
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
        <div className={styles.row}>
          <div className={styles.item}>احمد سعد</div>
          <div className={styles.item}>ahmedda@gmail.com</div>
          <div className={styles.item}>نعم</div>
          <div className={styles.deleteItem}>حذف المستخدم</div>
        </div>
        <div className={styles.row}>
          <div className={styles.item}>احمد سعد</div>
          <div className={styles.item}>ahmedda@gmail.com</div>
          <div className={styles.item}>نعم</div>
          <div className={styles.deleteItem}>حذف المستخدم</div>
        </div>
      </div>
      <h1 className={styles.warning}>
        Use Your Desktop To get Full Access to this Page
      </h1>
    </div>
  );
};

export default Settings;
