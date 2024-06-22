import styles from "./signin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signin } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentAdmin } = useSelector((state: any) => state.admin);

  const handleSignIn = (e: any) => {
    e.preventDefault();
    signin(dispatch, { email, password });
  };

  useEffect(() => {
    if (currentAdmin) {
      navigate("/");
    }
  }, [currentAdmin]);

  return (
    <form>
      <div className={styles.email}>
        <label htmlFor="">البريدالالكتروني</label>
        <input
          type="text"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.password}>
        <label htmlFor="">كلمه المرور</label>
        <input
          type="text"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.btn}>
        <input type="submit" value="دخول" onClick={handleSignIn} />
      </div>
    </form>
  );
};

export default SignIn;
