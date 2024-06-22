import { useState } from "react";
import styles from "./contract.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contract = ({
  activeContract,
  index,
  contract,
}: {
  activeContract: number;
  index: number;
  contract: any;
}) => {
  const [motocycles, setMotocycles] = useState<string>(contract.motocycles);
  const [rent, setRent] = useState<string>(contract.rent);

  const navigate = useNavigate();

  const updateContract = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}contract/${contract._id}`,
        { rent, motocycles }
      );
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyContract = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}contract/${contract._id}`,
        { status: "Accepted" }
      );
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`${styles.contract} ${
        activeContract !== index && styles.hidden
      }`}
      key={index}
    >
      <div>
        <p>رقم العقد</p>
        <input type="text" value={contract._id.toUpperCase()} disabled />
      </div>
      <div>
        <img
          src={contract.img}
          alt="Contract Screenshot"
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <p>عدد الدراجات النارية</p>
        <input
          type="text"
          value={motocycles}
          onChange={(e: any) => setMotocycles(e.target.value)}
        />
      </div>
      <div>
        <p>عدد دفعات الإيجار المتبقية</p>
        <input
          type="text"
          value={rent}
          onChange={(e: any) => setRent(e.target.value)}
        />
      </div>
      <div>
        <p>حالة العقد</p>
        <input type="text" value={contract.status} disabled />
      </div>
      <div>
        <input type="submit" value="احفظ العقد" onClick={updateContract} />
        <input type="submit" value="تأكيد العقد" onClick={verifyContract} />
      </div>
    </div>
  );
};

export default Contract;
