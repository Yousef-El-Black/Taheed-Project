import axios from "axios";
import { signinFailure, signinStart, signinSuccess } from "./slices/adminSlice";

export const signin = async (
  dispatch: any,
  admin: { email: string; password: string }
) => {
  try {
    dispatch(signinStart());
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}admin/auth`,
      admin
    );

    const { password, ...data } = res.data._doc;
    const { accessToken } = res.data;
    dispatch(signinSuccess({ ...data, accessToken }));
  } catch (err) {
    dispatch(signinFailure());
  }
};
