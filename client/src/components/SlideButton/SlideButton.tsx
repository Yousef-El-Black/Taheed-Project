import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { MouseEventHandler } from "react";

const Button = ({
  text,
  event,
}: {
  text: string;
  event: MouseEventHandler;
}) => {
  return (
    <button className="btn" onClick={event}>
      <span>{text}</span>
      <KeyboardArrowLeftIcon />
    </button>
  );
};

export default Button;
