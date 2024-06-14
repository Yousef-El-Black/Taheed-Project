import styles from "./items.module.scss";

const Items = () => {
  return (
    <div className={styles.items}>
      <div>
        <h4>عدد الدراجات النارية المتاحة للشراء</h4>
        <p>{"1890"}</p>
      </div>
      <div>
        <h4>اجمالي ايجارات الدراجات النارية الشهرية</h4>
        <p>{"582.000"}</p>
      </div>
    </div>
  );
};

export default Items;
