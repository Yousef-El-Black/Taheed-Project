import ControlPointIcon from "@mui/icons-material/ControlPoint";

const Dashboard = () => {
  return (
    <div className="dashboard h-auto md:h-screen">
      <div className="container mx-auto flex justify-around items-center gap-5 flex-col h-full">
        <div className="heading text-colorDark">مرحبا {"عبدالله"}</div>
        <div className="content flex flex-col md:flex-row items-center gap-4 md:h-[400px] w-full">
          <div className="right rounded-xl h-full md:flex-[2] bg-gradient-to-l from-backgroundColorDark to-backgroundColorLight w-auto">
            <div className="info p-5 font-bold text-xl">
              <div className="flex text-backgroundColor mb-3 md:flex-row flex-col">
                <p className="w-[200px]">عدد الدراجات النارية</p>
                <span>{"30"}</span>
              </div>
              <div className="flex text-backgroundColor mb-3 md:flex-row flex-col">
                <p className="w-[200px]">عدد العقود</p>
                <span>{"2"}</span>
              </div>
              <div className="flex text-backgroundColor mb-3 md:flex-row flex-col">
                <p className="w-[200px]">الإيجارات المدفوعة</p>
                <span>{"75.240"}</span>
              </div>
            </div>
            <div className="progress p-8">
              <div className="text text-3xl text-backgroundColor text-left">
                18/16
              </div>
              <div className="bar w-full rounded-full h-[15px] flex justify-end items-center bg-backgroundColor my-3">
                <div
                  className="fill bg-backgroundColorDark h-[15px] rounded-full"
                  style={{ width: `${((18 - 16) / 18) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="left flex-1 h-full border-2 border border-backgroundColorDark rounded-xl text-colorDark p-5 text-xl">
            <div className="contracts">
              <ul className="topBar flex gap-3 mb-5">
                <li className="cursor-pointer border w-[30px] h-[30px] flex justify-center items-center rounded activeTopbarSlide">
                  1
                </li>
                <li className="cursor-pointer border w-[30px] h-[30px] flex justify-center items-center rounded">
                  2
                </li>
              </ul>
              <div className="contract">
                <div className="flex-col mb-5">
                  <p className="font-bold">رقم العقد</p>
                  <p className="font-bold">251223006</p>
                </div>
                <div className="flex-col mb-5">
                  <p className="font-bold">عدد الدراجات النارية</p>
                  <p className="font-bold">15</p>
                </div>
                <div className="flex-col mb-5">
                  <p className="font-bold">عدد دفعات الإيجار المتبقية</p>
                  <p className="font-bold">16</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="bg-colorDark text-backgroundColor p-4 rounded-lg flex items-center gap-3 cursor-pointer">
          تقدر تأجر دراجات اضافية من هنا <ControlPointIcon />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
