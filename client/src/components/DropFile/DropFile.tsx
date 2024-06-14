import FileCopyIcon from "@mui/icons-material/FileCopy";
import { ChangeEventHandler } from "react";

const DropFile = ({
  text,
  change,
}: {
  text: string;
  change: ChangeEventHandler;
}) => {
  return (
    <div className="px-4 py-3 mb-5 rounded-xl bg-backgroundColor border-colorDark border focus:outline-none border-2 w-[200px] text-right text-colorDark md:w-full placeholder:font-bold flex gap-5">
      <div className="mark flex gap-2">
        <label
          className="accept w-[30px] h-[30px] bg-colorDark rounded-lg cursor-pointer flex justify-center items-center"
          htmlFor="file"
        >
          <FileCopyIcon style={{ fill: "white" }} />
        </label>
        <input type="file" id="file" onChange={change} className="hidden" />
      </div>
      <div className="text">{text}</div>
    </div>
  );
};

export default DropFile;
