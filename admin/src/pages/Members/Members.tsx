import axios from "axios";
import styles from "./members.module.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const [users, setUsers] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [contracts, setContracts] = useState<any>([]);

  const { currentAdmin } = useSelector((state: any) => state.admin);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}user/${
          search ? `?search=${search}` : ""
        }`,
        {
          headers: { Authorization: `bearer ${currentAdmin.accessToken}` },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getContracts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}contract/`,
        {
          headers: {
            Authorization: `bearer ${currentAdmin.accessToken}`,
          },
        }
      );
      setContracts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const countUserMotocycles = (userId: string) => {
    let i = 0;
    const userContracts = contracts.filter(
      (contract: any) => contract.userId === userId
    );
    if (Array.isArray(userContracts)) {
      userContracts.forEach((item: any) => {
        i += parseInt(item.motocycles);
      });
    }
    return i;
  };

  useEffect(() => {
    getAllUsers();
    getContracts();
  }, [search]);

  return (
    <div className={styles.membersPage}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="ابحث بالعملاء"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.table}>
        <div className={styles.headingRow}>
          <div className={styles.item}>اسم العميل</div>
          <div className={styles.item}>الخطوات</div>
          <div className={styles.item}>عدد الدراجات</div>
          <div className={styles.item}>تاريخ التسجيل</div>
        </div>
        {users &&
          Array.isArray(users) &&
          users.map((user: any) => {
            return (
              <div className={styles.row} key={user._id}>
                <div
                  className={styles.item}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/editmember/${user._id}`)}
                >
                  {user.fullName}
                </div>
                <div className={styles.item}>
                  <div></div>{" "}
                  {user.verifyStage === "first"
                    ? "الاولى"
                    : user.verifyStage === "second"
                    ? "الثانية"
                    : user.verifyStage === "third"
                    ? "الثالثة"
                    : user.verifyStage === "fourth"
                    ? "الرابعة"
                    : user.verifyStage === "completed" && "مكتمل"}
                </div>
                <div className={styles.item}>
                  {countUserMotocycles(user._id)}
                </div>
                <div className={styles.item}>
                  {user &&
                    user.createdAt.split("T")[0].split("-").reverse().join("-")}
                </div>
              </div>
            );
          })}
      </div>
      <p className={styles.note}>
        من خلال هذه الصفحة عبر النقر على اسم العميل تستطيع اضافة وتعديل بيانات
        لوحة المعلومات الخاصة بالعميل مثل : عدد الدراجات, مبلغ الايجار, الخ...
      </p>
      {/* <h1>Use Your Desktop To get Full Access</h1> */}
    </div>
  );
};

export default Members;
