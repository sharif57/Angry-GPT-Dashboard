// import  { useState } from "react";
// import { Button, Form, Input } from "antd";
// import dashProfile from "../../assets/images/dashboard-profile.png";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
// import { FaAngleLeft } from "react-icons/fa6";
// import { FaRegEdit } from "react-icons/fa";
// import { useUserProfileQuery } from "../../redux/features/userProfile";

// const MyProfile = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { data } = useUserProfileQuery();
//   const user = data?.data
//   console.log(user)

//   const profileData = {
//     name: user?.name ,
//     email: user?.email,
//     country: user?.country,
//     profile: dashProfile,
//   };
//   // console.log(code);

//   const IMAGE = import.meta.env.VITE_IMAGE_API;

//   return (
//     <>
//       <Link to={'/settings'} className="flex items-center gap-2 text-white   text-xl">
//         <FaAngleLeft />
//         <h1 className="text-white">Personal information</h1>
//       </Link>
//       <div className="rounded-lg py-4   shadow-lg mt-8 bg-[#212121] text-white">
//         <h3 className="text-2xl text-white mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
//           Personal information
//         </h3>
//         <div>
//           <div className="space-y-[24px] min-h-[83vh]  rounded-2xl">
//             <div className="w-full">
//               <div className="py-4 px-8 flex justify-end items-center">
//                 {/* <h6 className="text-2xl text-white">Personal Information</h6> */}
//                 <Button
//                   onClick={(e) => navigate(`edit`)}
//                   size="large"
//                   type="default"
//                   className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
//                 >
//                   <FaRegEdit />
//                   Edit Profile
//                 </Button>
//               </div>

//               <Form
//                 name="basic"
//                 layout="vertical"
//                 className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
//                 autoComplete="off"
//                 initialValues={{
//                   name: profileData.name,
//                   email: profileData.email,
//                   country:profileData.country
//                 }}
//               >
//                 <div className="col-span-3 space-y-6 ">
//                   <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-white  rounded-lg" >
//                     <div className="my-2">
//                       <img
//                         src={`${IMAGE}${user?.avatar}` || dashProfile}
//                         alt=""
//                         className="h-28 w-28 rounded-full border-4 border-black"
//                       />
//                     </div>
//                     <h5 className="text-lg text-white">{"Profile"}</h5>
//                     <h4 className="text-2xl text-white">{`${user?.role}`}</h4>
//                   </div>
//                 </div>
//                 <div className="col-span-9 space-y-[14px] w-full">
//                   <Form.Item
//                     className="text-lg  font-medium text-black -mb-1"
//                     label="Name"
//                     name="name"
//                   >
//                     <Input
//                       readOnly
//                       size="large"
//                       className="h-[53px] rounded-lg"
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     className="text-lg  font-medium text-black"
//                     label="Email"
//                     name="email"
//                   >
//                     <Input
//                       readOnly
//                       size="large"
//                       className="h-[53px] rounded-lg"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     className="text-lg text-[#222222] font-medium"
//                     label="Your Country"
//                     name="country"
//                   >
//                      <Input
//                       readOnly
//                       size="large"
//                       className="h-[53px] rounded-lg"
//                     />

//                   </Form.Item>
//                 </div>
//               </Form>
//             </div>
//             <PasswordChangeModalForm
//               isModalOpen={isModalOpen}
//               setIsModalOpen={setIsModalOpen}
//             />
//           </div>
//         </div>
//         <div className="p-[24px] pt-0.5">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyProfile;

import { useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaAngleLeft, FaRegEdit } from "react-icons/fa";
import countryList from "react-select-country-list";
import dashProfile from "../../assets/images/dashboard-profile.png";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { useUserProfileQuery } from "../../redux/features/userProfile";

const MyProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, error } = useUserProfileQuery();
  const user = data?.data;

  // Initialize country list
  const countries = countryList().getData();

  // API Environment Variable for Image
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[83vh] bg-[#212121]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    message.error(
      "Failed to load profile: " + (error.message || "Unknown error")
    );
    return (
      <div className="text-white text-center min-h-[83vh] bg-[#212121] flex items-center justify-center">
        Error loading profile. Please try again later.
      </div>
    );
  }

  // Profile Data with Fallback Defaults
  const profileData = {
    name: user?.name || "Unknown User",
    email: user?.email || "unknown@example.com",
    country: user?.country || "",
    profile: user?.avatar ? `${IMAGE}${user.avatar}` : dashProfile,
  };

  // Find country label for display
  const countryLabel =
    countries.find((c) => c.label === profileData.country)?.label ||
    profileData.country;

  return (
    <>
      {/* Header Section */}
      <Link
        to="/settings"
        className="flex items-center gap-2 text-white text-xl"
      >
        <FaAngleLeft />
        <h1 className="text-white">Personal Information</h1>
      </Link>

      {/* Profile Card */}
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-[#212121] text-white">
        <h3 className="text-2xl text-white mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
          Personal Information
        </h3>
        <div className="space-y-[24px] min-h-[83vh] rounded-2xl">
          <div className="w-full">
            <div className="py-4 px-8 flex justify-end items-center">
              <Button
                onClick={() => navigate("edit")}
                size="large"
                type="default"
                className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold flex items-center gap-2"
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
                country: countryLabel,
              }}
            >
              {/* Profile Image Section */}
              <div className="col-span-3 space-y-6">
                <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-white rounded-lg">
                  <div className="my-2">
                    <img
                      src={profileData.profile}
                      alt="Profile"
                      className="h-28 w-28 rounded-full border-4 border-black object-cover"
                      onError={(e) => (e.target.src = dashProfile)} // Fallback if image fails
                    />
                  </div>
                  <h5 className="text-lg text-white">Profile</h5>
                  <h4 className="text-2xl text-white capitalize">
                    {user?.role || "User"}
                  </h4>
                </div>
              </div>

              {/* Input Fields Section */}
              <div className="col-span-9 space-y-[14px] w-full">
                <Form.Item
                  className="text-lg font-medium text-white -mb-1"
                  label={<span style={{ color: "#ffffff" }}>Name</span>}
                  name="name"
                >
                  <Input
                    readOnly
                    size="large"
                    className="h-[53px] rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  className="text-lg font-medium text-white"
                  label={<span style={{ color: "#ffffff" }}>Email</span>}
                  // label="Email"
                  name="email"
                >
                  <Input
                    readOnly
                    size="large"
                    className="h-[53px] rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  className="text-lg font-medium text-white"
                  label={<span style={{ color: "#ffffff" }}>Your Country</span>}
                  // label="Your Country"
                  name="country"
                >
                  <Input
                    readOnly
                    size="large"
                    className="h-[53px] rounded-lg"
                    value={countryLabel}
                  />
                </Form.Item>
              </div>
            </Form>
          </div>

          {/* Password Change Modal */}
          <PasswordChangeModalForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>

        {/* Outlet for Child Routes */}
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
