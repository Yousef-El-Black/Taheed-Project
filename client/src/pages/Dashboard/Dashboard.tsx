import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/apiCalls";
import axios from "axios";

const Dashboard = () => {
  const [contracts, setContracts] = useState<any>();
  const [activeContract, setActiveContract] = useState(0);

  const { currentUser } = useSelector((state: any) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Get Contracts
  const getContracts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}contract/user/${currentUser._id}`
      );
      setContracts(res.data);
    } catch (err) {
      console.error("Error");
    }
  };

  // Get Number of Contracts
  const getNumberOfMotocycles = () => {
    let i = 0;
    if (Array.isArray(contracts)) {
      contracts.forEach((item: any) => {
        i += parseInt(item.motocycles);
      });
    }
    return i;
  };

  // Get Paid Money
  const paidMoney = () => {
    let i = 0;
    if (Array.isArray(contracts)) {
      contracts.forEach((item: any) => {
        i += (18 - parseInt(item.rent)) * 500 * parseInt(item.motocycles);
      });
    }
    return i;
  };

  // Get Rents
  const getRents = () => {
    let i = 0;
    if (Array.isArray(contracts)) {
      contracts.forEach((item: any) => {
        i += parseInt(item.rent);
      });
    }
    return i;
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else {
      getContracts();
    }
  }, [currentUser]);

  return (
    <div className="dashboard h-auto md:h-screen">
      <div className="container mx-auto flex justify-around items-center gap-5 flex-col h-full">
        <div className="heading text-colorDark flex justify-between">
          <span> مرحبا {currentUser ? currentUser.fullName : "Name"}</span>
          <div
            className="bg-transparent border border-2 border-colorDark rounded-xl text-lg p-3 flex justify-center items-center cursor-pointer hover:bg-colorDark hover:text-backgroundColor duration-300"
            onClick={() => {
              logout(dispatch);
            }}
          >
            Logout
          </div>
        </div>
        <div className="content flex flex-col md:flex-row items-center gap-4 md:h-[400px] w-full">
          <div className="right rounded-xl h-full md:flex-[2] bg-gradient-to-l from-backgroundColorDark to-backgroundColorLight w-auto">
            <div className="info p-5 font-bold text-xl">
              <div className="flex text-backgroundColor mb-3 md:flex-row flex-col">
                <p className="w-[200px]">عدد الدراجات النارية</p>
                <span>{getNumberOfMotocycles()}</span>
              </div>
              <div className="flex text-backgroundColor mb-3 md:flex-row flex-col">
                <p className="w-[200px]">عدد العقود</p>
                <span>{contracts ? contracts.length : ""}</span>
              </div>
              <div className="flex text-backgroundColor mb-3 md:flex-row flex-col">
                <p className="w-[200px]">الإيجارات المدفوعة</p>
                <span>{paidMoney()}</span>
              </div>
            </div>
            <div className="progress p-8">
              <div className="text text-3xl text-backgroundColor text-left">
                {contracts ? contracts.length * 18 : 0}/{getRents()}
              </div>
              <div className="bar w-full rounded-full h-[15px] flex justify-end items-center bg-backgroundColor my-3">
                <div
                  className="fill bg-backgroundColorDark h-[15px] rounded-full"
                  style={{
                    width: `${
                      contracts
                        ? ((contracts.length * 18 - getRents()) /
                            (contracts.length * 18)) *
                          100
                        : 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="left flex-1 h-full border-2 border border-backgroundColorDark rounded-xl text-colorDark p-5 text-xl">
            <div className="contracts">
              <ul className="topBar flex gap-3 mb-5">
                {contracts ? (
                  contracts.map((_item: any, index: number) => {
                    return (
                      <li
                        className={`cursor-pointer border w-[30px] h-[30px] flex justify-center items-center rounded ${
                          activeContract === index ? "activeTopbarSlide" : ""
                        }`}
                        key={index}
                        onClick={() => setActiveContract(index)}
                      >
                        {index + 1}
                      </li>
                    );
                  })
                ) : (
                  <></>
                )}
              </ul>
              {contracts &&
                contracts.map((item: any, index: number) => {
                  return (
                    <div
                      className={`contract ${
                        activeContract === index ? " " : "hidden"
                      }`}
                      key={index}
                    >
                      <div className="flex-col mb-5">
                        <p className="font-bold">رقم العقد</p>
                        <p className="font-bold">{item._id.toUpperCase()}</p>
                      </div>
                      <div className="flex-col mb-5">
                        <p className="font-bold">عدد الدراجات النارية</p>
                        <p className="font-bold">{item.motocycles}</p>
                      </div>
                      <div className="flex-col mb-5">
                        <p className="font-bold">عدد دفعات الإيجار المتبقية</p>
                        <p className="font-bold">{item.rent}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <button
          className="bg-colorDark text-backgroundColor p-4 rounded-lg flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/addcontract")}
        >
          تقدر تأجر دراجات اضافية من هنا <ControlPointIcon />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
