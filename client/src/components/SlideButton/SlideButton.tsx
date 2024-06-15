import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { MouseEventHandler } from "react";

const Button = ({
  text,
  event,
  isDisabled,
}: {
  text: string;
  event: MouseEventHandler;
  isDisabled?: boolean;
}) => {
  return (
    <button
      className="btn"
      onClick={event}
      disabled={isDisabled ? isDisabled : false}
    >
      <span>{text}</span>
      <KeyboardArrowLeftIcon />
    </button>
  );
};

export default Button;
