import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <div>
        <p className={styles.itemKey}>عدد العملاء المسجلين</p>
        <p className={styles.itemValue}>{"890"}</p>
      </div>
      <div>
        <p className={styles.itemKey}>عدد العملاء الذين اشتروا</p>
        <p className={styles.itemValue}>{"118"}</p>
      </div>
      <div>
        <p className={styles.itemKey}>عدد الدراجات النارية</p>
        <p className={styles.itemValue}>{"590"}</p>
      </div>
      <div>
        <p className={styles.itemKey}>اجمالي قيمة الدراجات النارية</p>
        <p className={styles.itemValue}>{"3.510.500"}</p>
      </div>
    </div>
  );
};

export default Home;
