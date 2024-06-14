import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link, Path } from "react-router-dom";

const Button = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link className="btn" to={link as unknown as Partial<Path>}>
      <span>{text}</span>
      <KeyboardArrowLeftIcon />
    </Link>
  );
};

export default Button;
