import Button from "../../components/Button/Button";

const Home = () => {
  return (
    <div className="home bg-backgroundColor" style={{ direction: "rtl" }}>
      <div className="container mx-auto min-h-[100vh] flex flex-col">
        <header>
          <div className="logo h-[120px] py-5">
            <img
              src="/assets/images/Full-Logo.png"
              alt="Taheed Logo"
              className="w-auto h-full"
            />
          </div>
        </header>
        <main className="h-max flex-1 flex justify-center items-center flex-col gap-5">
          <h1 className="helloUser w-full text-fontColor text-4xl font-bold">
            أهلاً وسهلاً
          </h1>
          <div className="box h-[350px] w-full rounded-2xl bg-gradient-to-br from-backgroundColorDark to-backgroundColorLight relative flex justify-center items-center flex-col">
            <img
              src="/assets/images/Logo.png"
              alt="Back Img"
              className="h-[50%] absolute left-[80px] select-none top-[10px] z-1"
            />
            <h2 className="text-center text-5xl text-backgroundColor pb-5 z-10">
              بكل بساطه اشتر دباب و أجره
            </h2>
            <p className="text-center text-3xl text-backgroundColor z-10">
              من خلالنا <br /> على شركات معتمدة
            </p>
          </div>
          <div className="btns flex items-center md:flex-row flex-col">
            <Button text={"تسجيل الدخول"} link={"/signin"} />
            <Button text={"سجل الآن"} link={"/register"} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

/*

Header Logo
Heading Title 
A Box Have The Text Background Gradient and An image in The back
2 Buttons to Log in And Register

*/
