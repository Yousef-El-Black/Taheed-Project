import { useNavigate, useParams } from "react-router-dom";
import styles from "./editmember.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Contract from "../../components/Contract/Contract";

const EditMember = () => {
  const [user, setUser] = useState<any>(null);
  const [contracts, setContracts] = useState<any>([]);
  const [activeContract, setActiveContract] = useState<number>(0);

  const { id } = useParams();

  const { currentAdmin } = useSelector((state: any) => state.admin);

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}user/${id}`,
        { headers: { Authorization: `bearer ${currentAdmin.accessToken}` } }
      );
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserConracts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}contract/user/${id}`,
        { headers: { Authorization: `bearer ${currentAdmin.accessToken}` } }
      );
      setContracts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateUser = async (e: any) => {
    try {
      e.preventDefault();
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}user/${user._id}`,
        {
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          nationalId: user.nationalId,
        },
        { headers: { Authorization: "bearer " + currentAdmin.accessToken } }
      );
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    currentAdmin && getUser();
    currentAdmin && getUserConracts();
  }, [id]);

  return user ? (
    <>
      <form>
        <div>
          <label htmlFor="id">الرقم التعريفي</label>
          <input type="text" id="id" disabled value={user._id.toUpperCase()} />
        </div>
        <div>
          <label htmlFor="email">البريد الالكتروني</label>
          <input
            type="text"
            id="email"
            value={user.email}
            onChange={(e: any) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="fullName">الاسم</label>
          <input
            type="text"
            id="fullName"
            value={user.fullName}
            onChange={(e: any) => {
              setUser({ ...user, fullName: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="phone">رقم الجوال</label>
          <input
            type="text"
            id="phone"
            value={user.phone}
            onChange={(e: any) => {
              setUser({ ...user, phone: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="nationalId">رقم الهوية</label>
          <input
            type="text"
            id="nationalId"
            value={user.nationalId}
            onChange={(e: any) =>
              setUser({ ...user, nationalId: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="verifyStage">الخطوات</label>
          <input
            type="text"
            id="verifyStage"
            disabled
            value={
              user.verifyStage === "first"
                ? "الاولى"
                : user.verifyStage === "second"
                ? "الثانية"
                : user.verifyStage === "third"
                ? "الثالثة"
                : user.verifyStage === "fourth"
                ? "الرابعة"
                : user.verifyStage === "completed"
                ? "مكتمل"
                : ""
            }
          />
        </div>
        <div>
          <input type="submit" value={"تعديل المستخدم"} onClick={updateUser} />
        </div>
        <div>
          <ul className={styles.topbar}>
            {contracts ? (
              contracts.map((_item: any, index: number) => {
                return (
                  <li
                    className={`cursor-pointer border w-[30px] h-[30px] flex justify-center items-center rounded ${
                      activeContract === index && styles.active
                    }`}
                    key={index}
                    onClick={() => setActiveContract(index)}
                  >
                    {index + 1}
                  </li>
                );
              })
            ) : (
              <></>
            )}
          </ul>
          <ul className={styles.contracts}>
            {contracts &&
              contracts.map((item: any, index: number) => {
                return (
                  <Contract
                    activeContract={activeContract}
                    index={index}
                    key={index}
                    contract={item}
                  />
                );
              })}
          </ul>
        </div>
      </form>
    </>
  ) : (
    <></>
  );
};

export default EditMember;
