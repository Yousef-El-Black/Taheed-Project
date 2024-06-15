import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import axios from "axios";
import { removeDuplicateIds } from "../../utils/array";

const Home = () => {
  const [usersCounter, setUserCounter] = useState<number>(0);
  const [acceptedContracts, setAcceptedContracts] = useState<any>([]);
  // const [contracts, setContracts] = useState<any>([]);
  const [buyers, setBuyers] = useState<any>([]);

  const getUsersCount = async () => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}user/`
      );
      setUserCounter(res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const getAcceptedContracts = async () => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}contract/accepted/`
      );
      setAcceptedContracts(res.data);
      setBuyers(removeDuplicateIds(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  // const getAllContracts = async () => {
  //   try {
  //     const res: any = await axios.get(
  //       `${process.env.REACT_APP_SERVER_URL}contract/`
  //     );
  //     setContracts(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const countMotocycles = () => {
    let i = 0;
    if (Array.isArray(acceptedContracts)) {
      acceptedContracts.forEach((item: any) => {
        i += parseInt(item.motocycles);
      });
    }
    return i;
  };

  useEffect(() => {
    getUsersCount();
    getAcceptedContracts();
    // getAllContracts();
  }, []);

  return (
    <div className={styles.home}>
      <div>
        <p className={styles.itemKey}>عدد العملاء المسجلين</p>
        <p className={styles.itemValue}>{usersCounter}</p>
      </div>
      <div>
        <p className={styles.itemKey}>عدد العملاء الذين اشتروا</p>
        <p className={styles.itemValue}>{buyers ? buyers.length : 0}</p>
      </div>
      <div>
        <p className={styles.itemKey}>عدد الدراجات النارية</p>
        <p className={styles.itemValue}>
          {acceptedContracts ? countMotocycles() : 0}
        </p>
      </div>
      <div>
        <p className={styles.itemKey}>اجمالي قيمة الدراجات النارية</p>
        <p className={styles.itemValue}>
          {acceptedContracts ? countMotocycles() * 5950 : 0}
        </p>
      </div>
    </div>
  );
};

export default Home;
