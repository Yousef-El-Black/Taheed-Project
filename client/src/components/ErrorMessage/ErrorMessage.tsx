import { useState } from "react";

const ErrorMessage = ({ error }: { error: string }) => {
  const [showError, setShowError] = useState<boolean>(true);

  setTimeout(() => {
    setShowError(false);
  }, 3000);

  return (
    <div
      className={`absolute text-white left-[20px] drop-shadow-lg shadow p-4 rounded bg-colorDark text-[#ffffff] duration-1000 delay-1000 ${
        showError ? "top-[20px]" : "top-[-100%]"
      }`}
    >
      {error}
    </div>
  );
};

export default ErrorMessage;
