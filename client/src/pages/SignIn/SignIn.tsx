import Button from "../../components/SlideButton/SlideButton";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/apiCalls";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser, error } = useSelector((state: any) => state.user);

  const handleSignIn = async () => {
    try {
      const foundUser = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}user/findbyemail/${email}`
      );
      if (foundUser.data.verifyStage) {
        signin(dispatch, { email, password });
        console.log(currentUser);
      } else {
        console.error("User is not Found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      navigate("/dashboard");
    }
    if (error) {
      setErr(true);
    }
  }, [error, currentUser]);

  return (
    <div className="signIn h-screen">
      <div className="container mx-auto h-full flex flex-col justify-center items-center">
        <div className="heading pb-10">تسجيل الدخول</div>
        <form className="w-full">
          <Input
            type="email"
            placeholder="البريد الالكتروني"
            value={email}
            change={(e: any) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="كلمة السر"
            value={password}
            change={(e: any) => setPassword(e.target.value)}
          />
          <div className="flex justify-between items-center text-colorDark font-light">
            <Button
              text={"الدخول"}
              event={(e: any) => {
                e.preventDefault();
                handleSignIn();
              }}
            />
            {err && <span>Something went Wrong!</span>}

            <p>
              ليس لدى حساب انضم الينا{" "}
              <Link to={"/register"} className="underline">
                من هنا
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
