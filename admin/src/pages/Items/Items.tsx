import { useEffect, useState } from "react";
import styles from "./items.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { bigNumberFormater } from "../../utils/formater";

const Items = () => {
  const [contracts, setContracts] = useState<any>([]);
  const [motocycles, setMotocycles] = useState(0);

  const { currentAdmin } = useSelector((state: any) => state.admin);

  const getContracts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}contract/`,
        { headers: { Authorization: "bearer " + currentAdmin.accessToken } }
      );
      setContracts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMotocycles = async () => {
    try {
      let i = 0;
      contracts.forEach((item: any) => {
        i += item.motocycles;
      });
      setMotocycles(i);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getContracts();
  }, []);

  useEffect(() => {
    getMotocycles();
  }, [contracts]);

  return (
    <div className={styles.items}>
      <div>
        <h4>عدد الدراجات النارية المتاحة للشراء</h4>
        <p>{bigNumberFormater(motocycles)}</p>
      </div>
      <div>
        <h4>اجمالي ايجارات الدراجات النارية الشهرية</h4>
        <p>{bigNumberFormater(motocycles * 500)}</p>
      </div>
    </div>
  );
};

export default Items;
