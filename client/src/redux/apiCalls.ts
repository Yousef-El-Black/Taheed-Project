import axios from "axios";
import {
  logoutStart,
  signinFailure,
  signinStart,
  signinSuccess,
} from "./slices/userSlice";

export const signin = async (
  dispatch: any,
  user: { email: string; password: string }
) => {
  try {
    dispatch(signinStart());
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}auth/signin`,
      user
    );
    dispatch(signinSuccess(res.data));
  } catch (error) {
    dispatch(signinFailure());
  }
};

export const logout = (dispatch: any) => {
  dispatch(logoutStart());
};
