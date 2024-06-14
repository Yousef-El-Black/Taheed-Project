import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import SlideButton from "../../components/SlideButton/SlideButton";
import AcceptInput from "../../components/AcceptInput/AcceptInput";
import DropFile from "../../components/DropFile/DropFile";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";

const Register = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [myVerificationCode, setMyVerificationCode] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [nationalId, setNationalId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [itemsNumber, setItemsNumber] = useState<number>(0);
  const [rentMany, setRentMany] = useState<boolean>(false);
  const [iKnow, setIKnow] = useState<boolean>(false);
  const [acceptAgreement, setAcceptAgreement] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [error, setError] = useState<any>([]);
  const [userId, setUserId] = useState<string>("");

  // Validate Email
  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Previous Page
  const prevSlideGo = () => {
    setSlideIndex((prev) => prev - 1);
  };

  // Next Page
  const nextSlideGo = () => {
    setSlideIndex((prev) => prev + 1);
  };

  // Check Email is Already Exist
  const findUser = async (email: string) => {
    try {
      const userFound: any = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}user/findbyemail/${email}`
      );
      console.log(userFound);
      if (userFound.data.verifiyStage === "first" || "second" || "third") {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}user/${userFound.data._id}`,
          { data: { userId: userFound.data._id } }
        );
      } else if (userFound)
        setError((prev: any) => [...prev, { text: "المستخدم موجود بالفعل" }]);
    } catch (err) {
      console.error(err);
    }
  };

  // Confirm Email Function
  const confirmEmail = async () => {
    if (validateEmail(email)) {
      findUser(email).then(async () => {
        await axios
          .post(`${process.env.REACT_APP_SERVER_URL}user/stageone`, {
            email,
          })
          .then((res: any) => {
            setMyVerificationCode(res.data.verificationCode);
            setUserId(res.data._doc._id);
            console.log(res.data);
          });
        nextSlideGo();
      });
    } else {
      setError((prev: any) => [
        ...prev,
        { text: "البريد الالكتروني غير صالح" },
      ]);
    }
  };

  // Confirm Verification Code
  const confirmVerificationCode = async () => {
    console.log(myVerificationCode);
    console.log(verificationCode);
    if (verificationCode === myVerificationCode) {
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}user/stagetwo/${userId}`)
        .then(() => {
          nextSlideGo();
        });
    } else {
      setError((prev: any) => [...prev, { text: "كود التحقق خاطئ!" }]);
    }
  };

  // Validate Phone Number
  const validatePhoneNumber = () => {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNumber.match(phoneno)) {
      nextSlideGo();
    } else {
      setError((prev: any) => [...prev, { text: "رقم جوالك خاطئ!" }]);
      // FIXME: Remove Me When You handle Validate Phone Number
      nextSlideGo();
    }
  };

  // Confirm The Name and The National ID
  const enterPersonalInfo = () => {
    if (fullname !== "" && nationalId !== "") {
      nextSlideGo();
    } else {
      setError((prev: any) => [...prev, { text: "ادخل الحقول كلها" }]);
    }
  };

  // Confirm Password and Personal Data
  const finishPersonalInfo = async () => {
    if (password === confirmPassword) {
      if (password.length > 7) {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}user/stagethree/${userId}`,
          { phone: phoneNumber, nationalId, fullname, password }
        );
        nextSlideGo();
      } else {
        setError((prev: any) => [...prev, { text: "كلمة المرور قصيره جدا!" }]);
      }
    } else {
      setError((prev: any) => [...prev, { text: "كلمة المرور غير متطابقه!" }]);
    }
  };

  // Reject Minus Motocycles Number
  const confirmMotocyclesNumber = () => {
    if (itemsNumber > 0) {
      nextSlideGo();
    } else {
      setError((prev: any) => [...prev, { text: "العدد مرفوض!" }]);
    }
  };

  // handle Image Change
  const handleImageChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  // Upload Image & Getting Photo Link
  const confirmImage = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(res.data.url);
      const contract = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}contract/`,
        { userId, motocycles: itemsNumber, isDevided: rentMany, img: imageUrl }
      );
      const user: any = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}user/${userId}`,
        {}
      );
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}user/stagefour/${userId}`,
        { contracts: [...user.data.contracts, contract] }
      );
      nextSlideGo();
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const toggleRentManyAcceptation = () => {
    setRentMany((prev) => !prev);
  };

  const toggleIKnowAcceptation = () => {
    setIKnow((prev) => !prev);
  };

  const toggleAcceptAgreement = () => {
    setAcceptAgreement((prev) => !prev);
  };

  return (
    <div className="registerPage">
      <div
        className="slider flex justify-start w-auto absolute duration-500 h-screen"
        style={{
          transform: `translateX(${100 * slideIndex}vw)`,
        }}
      >
        <div className="slideOne w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="heading">أهلاً وسهلاً</div>
            <div className="text heading pb-5">
              من هنا خطوتك الأولى لشراء دراجة نارية ثم تأجيرها على شركات معتمدة
              من خلالنا
            </div>
            <Input
              type="text"
              placeholder="ادخل بريدك الإلكتروني"
              value={email}
              change={(e: any) => setEmail(e.target.value.toLowerCase())}
            />
            <SlideButton text="التالي" event={confirmEmail} />
          </div>
        </div>

        <div className="slideTwo w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">
              وصلك كود التحقق على بريدك الإلكتروني؟
            </div>
            <Input
              type="text"
              placeholder="ادخل كود التحقق"
              value={verificationCode}
              change={(e: any) => {
                setVerificationCode(e.target.value);
              }}
            />
            <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <SlideButton text="التالي" event={confirmVerificationCode} />
              <p className="font-extralight text-lg text-fontColor">
                دخلت بريدك الإلكتروني خاطئ؟ تقدر تعدله{" "}
                <button onClick={prevSlideGo} className="underline">
                  من هنا
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="slideThree w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">نحتاج رقم جوالك</div>
            <Input
              type="text"
              placeholder="ادخل رقم جوالك"
              value={phoneNumber}
              change={(e: any) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <SlideButton text="التالي" event={validatePhoneNumber} />
          </div>
        </div>

        <div className="slideFour w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">
              تهمنا البيانات التاليه عشان العقد
            </div>
            <Input
              type="text"
              placeholder="اسمك الثلاثي"
              value={fullname}
              change={(e: any) => {
                setFullname(e.target.value);
              }}
            />
            <Input
              type="text"
              placeholder="رقم هويتك"
              value={nationalId}
              change={(e: any) => {
                setNationalId(e.target.value);
              }}
            />
            <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <SlideButton text="التالي" event={enterPersonalInfo} />
              <p className="font-extralight text-lg text-fontColor">
                سيتم ادراج البيانات اعلاه بالعقد, الرجاء التأكد من صحتها
              </p>
            </div>
          </div>
        </div>

        <div className="slideFive w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">
              أنشئ كلمة سر قوية لتعزز من امانك
            </div>
            <Input
              type="password"
              placeholder="اكتب كلمه السر"
              value={password}
              change={(e: any) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              type="password"
              placeholder="اعد كتابة كلمه السر"
              value={confirmPassword}
              change={(e: any) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <SlideButton text="التالي" event={finishPersonalInfo} />
          </div>
        </div>

        <div className="slideSix w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">
              كم عدد الدراجات النارية اللي ودك تشتري؟
            </div>
            <div className="mb-4">
              <p className="text-fontColor font-light text-lg py-1">
                سعر الشراء يشمل:
              </p>
              <p className="text-fontColor font-light text-lg py-1">
                الدراجة النارية 3300 ريال
              </p>
              <p className="text-fontColor font-light text-lg py-1">
                اصدار اللوحات 500 ريال
              </p>
              <p className="text-fontColor font-light text-lg py-1">
                التأمين سنتين 2150 ريال
              </p>
            </div>
            <Input
              type="number"
              placeholder="اختر العدد من هنا"
              value={itemsNumber}
              change={(e: any) => {
                setItemsNumber(e.target.value);
              }}
            />
            <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <SlideButton text="التالي" event={confirmMotocyclesNumber} />
              <p className="font-extralight text-lg text-fontColor">
                كل دراجة نارية تؤجر بـ 500 ريال شهريا
              </p>
            </div>
          </div>
        </div>

        <div className="slideSeven w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">
              ودك نأجرهم على شركة وحدة او نوزعهم على شركات متعددة عشان نقلل
              المخاطر؟
            </div>
            <p className="text-fontColor font-light text-lg py-1 mb-5">
              دائما ننصح بتوزيع الدراجات النارية على عدة شركات لتقليل المخاطر
            </p>
            <AcceptInput
              value={rentMany}
              text={
                "نعم ارغب بتأجير الدراجات النارية على شركات متفرقة لتقليل المخاطر"
              }
              event={toggleRentManyAcceptation}
            />
            <SlideButton text="التالي" event={nextSlideGo} />
          </div>
        </div>

        <div className="slideEight w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">
              اجمالي المبلغ المطلوب سداده {itemsNumber * 5950} ريال
            </div>
            <p className="text-fontColor font-semibold text-2xl py-1 mb-5">
              سوف تؤجر بـ {itemsNumber * 500} ريال شهريا لمدة 18 شهر
            </p>
            <p className="text-fontColor font-light text-lg py-1 mb-5">
              سعر بيع الدراجة بعد انتهاء فترة التأجير يحدد لاحقا
            </p>
            <AcceptInput
              value={iKnow}
              text={"لقد فهمت ذلك"}
              event={toggleIKnowAcceptation}
            />
            <SlideButton
              text="التالي"
              event={() =>
                iKnow
                  ? nextSlideGo()
                  : setError((prev: any) => [...prev, { text: "فعل الزر" }])
              }
            />
          </div>
        </div>

        <div className="slideNine w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">الإتفاقيه</div>
            <p className="border border-2 rounded border-[#00000080] text-[#00000080] w-full h-[250px] overflow-y-scroll mb-5">
              بناء على البيانات المدخلة من قبلك تم اعداد هذه الاتفاقية, وعدد
              اطراف الاتفاقية اثنان "نحن" نمثل الطرف الأول و "أنت" تمثل الطرف
              الثاني و ثثمثل بنود الاتفاقية بالتالي : بناء على البيانات المدخلة
              من قبلك تم اعداد هذه الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن"
              نمثل الطرف الأول و "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية
              بالتالي : بناء على البيانات المدخلة من قبلك تم اعداد هذه
              الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل الطرف الأول و
              "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية بالتالي : بناء على
              البيانات المدخلة من قبلك تم اعداد هذه الاتفاقية, وعدد اطراف
              الاتفاقية اثنان "نحن" نمثل الطرف الأول و "أنت" تمثل الطرف الثاني و
              ثثمثل بنود الاتفاقية بالتالي : بناء على البيانات المدخلة من قبلك
              تم اعداد هذه الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل
              الطرف الأول و "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية
              بالتالي : بناء على البيانات المدخلة من قبلك تم اعداد هذه
              الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل الطرف الأول و
              "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية بالتالي : بناء على
              البيانات المدخلة من قبلك تم اعداد هذه الاتفاقية, وعدد اطراف
              الاتفاقية اثنان "نحن" نمثل الطرف الأول و "أنت" تمثل الطرف الثاني و
              ثثمثل بنود الاتفاقية بالتالي : بناء على البيانات المدخلة من قبلك
              تم اعداد هذه الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل
              الطرف الأول و "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية
              بالتالي : بناء على البيانات المدخلة من قبلك تم اعداد هذه
              الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل الطرف الأول و
              "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية بالتالي : بناء على
              البيانات المدخلة من قبلك تم اعداد هذه الاتفاقية, وعدد اطراف
              الاتفاقية اثنان "نحن" نمثل الطرف الأول و "أنت" تمثل الطرف الثاني و
              ثثمثل بنود الاتفاقية بالتالي : بناء على البيانات المدخلة من قبلك
              تم اعداد هذه الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل
              الطرف الأول و "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية
              بالتالي : بناء على البيانات المدخلة من قبلك تم اعداد هذه
              الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل الطرف الأول و
              "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية بالتالي : بناء على
              البيانات المدخلة من قبلك تم اعداد هذه الاتفاقية, وعدد اطراف
              الاتفاقية اثنان "نحن" نمثل الطرف الأول و "أنت" تمثل الطرف الثاني و
              ثثمثل بنود الاتفاقية بالتالي : بناء على البيانات المدخلة من قبلك
              تم اعداد هذه الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل
              الطرف الأول و "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية
              بالتالي : بناء على البيانات المدخلة من قبلك تم اعداد هذه
              الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل الطرف الأول و
              "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية بالتالي : بناء على
              البيانات المدخلة من قبلك تم اعداد هذه الاتفاقية, وعدد اطراف
              الاتفاقية اثنان "نحن" نمثل الطرف الأول و "أنت" تمثل الطرف الثاني و
              ثثمثل بنود الاتفاقية بالتالي : بناء على البيانات المدخلة من قبلك
              تم اعداد هذه الاتفاقية, وعدد اطراف الاتفاقية اثنان "نحن" نمثل
              الطرف الأول و "أنت" تمثل الطرف الثاني و ثثمثل بنود الاتفاقية
              بالتالي :
            </p>
            <AcceptInput
              value={acceptAgreement}
              text={
                "اوافق على بنود الاتفاقية و موافقتي بمثابة توقيع رسمي و معتمد دون الحاجة الى توقيع المتسند يدويا"
              }
              event={toggleAcceptAgreement}
            />
            <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <SlideButton
                text="التالي"
                event={() =>
                  acceptAgreement
                    ? nextSlideGo()
                    : setError((prev: any) => [...prev, { text: "فعل الزر" }])
                }
              />
              <p className="font-extralight text-lg text-fontColor">
                سوف يتم ارسال نسخة موقعة من قبلنا على بريدك الالكتروني بعد
                إنهائك لجميع خطوات التسجيل
              </p>
            </div>
          </div>
        </div>

        <div className="slideTen w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">سعيدين بثقتك</div>
            <p className="text-fontColor font-semibold text-2xl py-1 mb-5">
              نأمل تحويل المبلغ المستحق {5590 * itemsNumber} ريال الى الحساب
              البنكي لـ
            </p>
            <p className="text-fontColor font-light text-lg py-1 mb-5">
              شركة الدراجات النارية المعتمدة
              <br />
              مصرف الانماء
              <br />
              SA395000000694525500587
            </p>
            <DropFile
              text={"ارفق ايصال التحويل هنا"}
              change={handleImageChange}
            />
            {file ? (
              <span>
                <ImageIcon />
                {file.name}
              </span>
            ) : (
              ""
            )}
            <SlideButton text="التالي" event={confirmImage} />
          </div>
        </div>

        <div className="slideEleven w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">شكرا لك</div>
            <p className="text-fontColor font-semibold text-2xl py-1 mb-5">
              جاري التحقق من اتمام خطوات التسجيل
            </p>
            <p className="text-fontColor font-light text-lg py-1 mb-5">
              سيتم ابلاغك عبر البريد الالكتروني عند الانتهاء من المراجعة
            </p>
            <p className="text-[#00000080] font-extralight text-md py-1 mt-10">
              تستطيع{" "}
              <Link
                className="font-extralight text-md underline"
                to={"/signin"}
              >
                تسجيل الدخول
              </Link>{" "}
              و الاطلاع على المعلومات بعد التحقق من اتمام خطوات التسجيل
            </p>
          </div>
        </div>
      </div>
      {error.map((err: any, i: number) => {
        return <ErrorMessage key={i} error={err.text} />;
      })}
    </div>
  );
};

export default Register;
