import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import profileImage from "../../assets/images/dash-profile.png";
import { TbBellRinging } from "react-icons/tb";
import { useUserProfileQuery } from "../../redux/features/userProfile";

const Header = () => {
  const navigate = useNavigate();
  const loacatin = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const { data } = useUserProfileQuery();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [loacatin.pathname]);
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  return (
    <div className="w-full h-[88px] flex justify-between items-center  py-[16px] px-[32px] shadow-lg bg-[#212121] text-white border-[#CAEA31] border rounded-lg">
      <div className="text-start space-y-0.5">
        <p className="text-sm md:text-xl font-light">
          {"Welcome, Jane Cooper"}
        </p>
        <p className="text-sm md:text-xl text-[#999999]">
          {"Have a nice day!"}
        </p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          // onClick={(e) => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge
            style={{
              backgroundColor: "#CAEA31",
              width: "20px",
              height: "20px",
              objectFit: "contain",
              color: "black",
            }}
            count={1}
          >
            <TbBellRinging
              style={{ cursor: "pointer" }}
              className={` w-6 h-6 rounded-full shadow-sm text-[#CAEA31] font-bold transition-all`}
            />
          </Badge>
        </div>
        <div className="flex items-center">
          <Link to={'/settings/profile'}>
            <img
              src={`${IMAGE}${data?.data?.avatar}` || profileImage}
              alt=""
              className="rounded-full h-[42px] w-[42px]"
            />
          </Link>
          {/* <Select
            defaultValue="Jane Cooper"
            style={{
              width: 120,
            }}
            bordered={false}
            suffixIcon={<MdOutlineKeyboardArrowDown color="black" fontSize={20} />}
            onChange={handleChange}
            options={[
              {
                value: 'Jane Cooper',
                label: 'Jane Cooper',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              }
            ]}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
