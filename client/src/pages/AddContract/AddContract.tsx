import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import SlideButton from "../../components/SlideButton/SlideButton";
import AcceptInput from "../../components/AcceptInput/AcceptInput";
import DropFile from "../../components/DropFile/DropFile";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import { useSelector } from "react-redux";

const AddContract = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [itemsNumber, setItemsNumber] = useState<number>(0);
  const [rentMany, setRentMany] = useState<boolean>(false);
  const [iKnow, setIKnow] = useState<boolean>(false);
  const [acceptAgreement, setAcceptAgreement] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState<any>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [userId, setUserId] = useState<string>("");

  const { currentUser } = useSelector((state: any) => state.user);

  const navigate = useNavigate();

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
    setIsDisabled(true);

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
        {
          userId,
          motocycles: itemsNumber,
          isDevided: rentMany,
          img: imageUrl,
          rent: 18,
        }
      );
      const user: any = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}user/${userId}`
      );
      await axios.put(`${process.env.REACT_APP_SERVER_URL}user/${userId}`, {
        contracts: [...user.data.contracts, contract.data],
        userId,
      });
      nextSlideGo();
    } catch (err) {
      console.error("Image upload failed", err);
      setIsDisabled(false);
    }
  };

  // Next Page
  const nextSlideGo = () => {
    setSlideIndex((prev) => prev + 1);
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

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else {
      setUserId(currentUser._id);
    }
  }, [currentUser]);

  return (
    <div className="addContractPage">
      <div
        className="slider flex justify-start w-auto absolute duration-500 h-screen"
        style={{
          transform: `translateX(${100 * slideIndex}vw)`,
        }}
      >
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
            <SlideButton
              text="التالي"
              event={confirmImage}
              isDisabled={isDisabled}
            />
          </div>
        </div>

        <div className="slideEleven w-screen h-full flex flex-col justify-center items-center">
          <div className="container mx-auto h-full flex flex-col justify-center items-start">
            <div className="text heading pb-5">شكرا لك</div>
            <p className="text-[#00000080] font-extralight text-md py-1 mt-10">
              <Link className="btn" to={"/dashboard"}>
                الرجوع الى الصفحة الرئيسية
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      {error.map((err: any) => {
        return <ErrorMessage error={err.text} />;
      })}
    </div>
  );
};

export default AddContract;
