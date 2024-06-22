import { useState } from "react";
import styles from "./addadmin.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [access, setAccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const { currentAdmin } = useSelector((state: any) => state.admin);

  const toggleAccess = () => {
    setAccess((prev) => !prev);
  };

  const navigate = useNavigate();

  const addAdmin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}admin/`, {
        email,
        password,
        fullName,
        phone,
        fullAccess: access,
        creatorID: currentAdmin._id,
      });
      navigate("/settings");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form>
      <div className={styles.email}>
        <label htmlFor="email">البريد الالكتروني</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </div>
      <div className={styles.password}>
        <label htmlFor="password">كلمة المرور</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>
      <div className={styles.fullName}>
        <label htmlFor="fullName">الاسم كامل</label>
        <input
          id="fullName"
          value={fullName}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFullName(e.target.value)
          }
        />
      </div>
      <div className={styles.phone}>
        <label htmlFor="phone">رقم الجوال</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
        />
      </div>
      <div className={styles.fullAccess}>
        <label htmlFor="access">صلاحية الدخول</label>
        <div
          id="access"
          onClick={toggleAccess}
          style={{ backgroundColor: `${access ? "#00ff00" : "#ff0000"}` }}
        >
          <div
            style={{
              left: `${access ? "42.5px" : "2.5px"}`,
            }}
          ></div>
        </div>
      </div>
      <div className={styles.confirm}>
        <input type="submit" value="انشاء" onClick={addAdmin} />
      </div>
    </form>
  );
};

export default AddAdmin;
