import  { useState } from "react";
import { Button, Form, Input } from "antd";
import dashProfile from "../../assets/images/dashboard-profile.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { FaAngleLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useUserProfileQuery } from "../../redux/features/userProfile";

const MyProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useUserProfileQuery();
  const user = data?.data

  const profileData = {
    name: user?.name ,
    email: user?.email,
    profile: dashProfile,
  };
  // console.log(code);

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  return (
    <>
      <Link to={'/settings'} className="flex items-center gap-2 text-white   text-xl">
        <FaAngleLeft />
        <h1 className="text-white">Personal information</h1>
      </Link>
      <div className="rounded-lg py-4   shadow-lg mt-8 bg-[#212121] text-white">
        <h3 className="text-2xl text-white mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
          Personal information
        </h3>
        <div>
          <div className="space-y-[24px] min-h-[83vh]  rounded-2xl">
            <div className="w-full">
              <div className="py-4 px-8 flex justify-end items-center">
                {/* <h6 className="text-2xl text-white">Personal Information</h6> */}
                <Button
                  onClick={(e) => navigate(`edit`)}
                  size="large"
                  type="default"
                  className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
                >
                  <FaRegEdit />
                  Edit Profile
                </Button>
              </div>

              <Form
                name="basic"
                layout="vertical"
                className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
                autoComplete="off"
                initialValues={{
                  name: profileData.name,
                  email: profileData.email,
                }}
              >
                <div className="col-span-3 space-y-6 ">
                  <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-white  rounded-lg" >
                    <div className="my-2">
                      <img
                        src={`${IMAGE}${user?.avatar}` || dashProfile}
                        alt=""
                        className="h-28 w-28 rounded-full border-4 border-black"
                      />
                    </div>
                    <h5 className="text-lg text-white">{"Profile"}</h5>
                    <h4 className="text-2xl text-white">{`${user?.role}`}</h4>
                  </div>
                </div>
                <div className="col-span-9 space-y-[14px] w-full">
                  <Form.Item
                    className="text-lg  font-medium text-black -mb-1"
                    label="Name"
                    name="name"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    className="text-lg  font-medium text-black"
                    label="Email"
                    name="email"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>

                  {/* <Form.Item
                    className="text-lg text-[#222222] font-medium"
                    label="Phone Number"
                    name="phone"
                  >
                    <PhoneCountryInput />
                  </Form.Item> */}
                </div>
              </Form>
            </div>
            <PasswordChangeModalForm
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
