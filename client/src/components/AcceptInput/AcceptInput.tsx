import CheckIcon from "@mui/icons-material/Check";
import { MouseEventHandler } from "react";

const AcceptInput = ({
  value,
  text,
  event,
}: {
  value: boolean;
  text: string;
  event: MouseEventHandler;
}) => {
  return (
    <div className="px-4 py-3 mb-5 rounded-xl bg-backgroundColor border-colorDark border focus:outline-none border-2 w-[200px] text-right text-colorDark md:w-full placeholder:font-bold flex gap-5">
      <div className="mark flex gap-2" onClick={event}>
        {value ? (
          <div className="accept w-[30px] h-[30px] bg-colorDark rounded-lg cursor-pointer flex justify-center items-center">
            <CheckIcon style={{ fill: "white" }} />
          </div>
        ) : (
          <div className="reject w-[30px] h-[30px] bg-colorDark rounded-lg cursor-pointer"></div>
        )}
      </div>
      <div className="text">{text}</div>
    </div>
  );
};

export default AcceptInput;
