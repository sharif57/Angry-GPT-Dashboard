// import { useState } from "react";
// import { Button, Form, Input } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { FaAngleLeft } from "react-icons/fa6";
// import dashProfile from "../../assets/images/dashboard-profile.png";
// import { useUpdateProfileMutation } from "../../redux/features/userProfile";

// const EditMyProfile = () => {
//   const navigate = useNavigate();
//   const [updateProfile] = useUpdateProfileMutation();
//   const [imageFile, setImageFile] = useState(null);

//   // Retrieve Admin Data from Local Storage
//   const storedData = localStorage.getItem("admin");
//   const adminData = storedData ? JSON.parse(storedData) : null;

//   // Profile Data with Fallback Defaults
//   const profileData = {
//     name: adminData?.name || "Jane Kooper",
//     email: adminData?.email || "enrique@gmail.com",
//     country: adminData?.country,
//     profile: adminData?.avatar || dashProfile,
//   };

//   // API Environment Variable for Image
//   const IMAGE = import.meta.env.VITE_IMAGE_API;

//   // Form Submission Handlers
//   const onFinish = async (values) => {
//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("country", values.country);
//     if (imageFile) {
//       formData.append("images", imageFile);
//     }

//     console.log(formData)

//     try {
//       const response = await updateProfile(formData).unwrap();
//       console.log("Profile updated successfully:", response);
//       localStorage.setItem("admin", JSON.stringify({...adminData,...response.data }));
//       // Optionally, update local storage or state with the new data
//       navigate("/settings/profile");
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   return (
//     <>
//       {/* Header Section */}
//       <Link to={'/settings/profile'} className="flex text-white items-center gap-2 text-xl">
//         <FaAngleLeft />
//         <h1 className="text-white">Personal Information</h1>
//       </Link>

//       {/* Profile Form Card */}
//       <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-[#212121] text-white">
//         <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
//           <h3 className="text-2xl text-white mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
//             Personal Information
//           </h3>

//           <div className="w-full">
//             <Form
//               name="basic"
//               layout="vertical"
//               className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//               autoComplete="off"
//               initialValues={{
//                 name: profileData.name,
//                 email: profileData.email,
//                 country: profileData.country,
//                 phone: profileData.phone,
//               }}
//             >
//               {/* Profile Image Section */}
//               <div className="col-span-3 space-y-6">
//                 <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
//                   <div className="my-2">
//                     <img
//                       src={`${IMAGE}${profileData.profile}`}
//                       alt="Profile"
//                       className="h-28 w-28 rounded-full border-4 border-black"
//                     />
//                   </div>
//                   <input type="file" onChange={handleImageChange} />
//                   <h5 className="text-lg text-white">Profile</h5>
//                   <h4 className="text-2xl text-white">Admin</h4>
//                 </div>
//               </div>

//               {/* Input Fields Section */}
//               <div className="col-span-9 space-y-[14px] w-full">
//                 <Form.Item
//                   className="text-lg font-medium text-white -mb-1"
//                   label="Name"
//                   name="name"
//                 >
//                   <Input size="large" className="h-[53px] rounded-lg" />
//                 </Form.Item>

//                 <Form.Item
//                   className="text-lg font-medium text-white"
//                   label="Email"
//                   name="email"
//                 >
//                   <Input readOnly size="large" className="h-[53px] rounded-lg" />
//                 </Form.Item>
//                 <Form.Item
//                   className="text-lg font-medium text-white"
//                   label="your country"
//                   name="country"
//                 >
//                   <Input defaultValue={profileData.country} size="large" className="h-[53px] rounded-lg" />
//                 </Form.Item>

                

//                 {/* Save Button */}
//                 <Form.Item className="flex justify-end pt-4">
//                   <Button
//                     size="large"
//                     type="primary"
//                     htmlType="submit"
//                     className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
//                   >
//                     Save Changes
//                   </Button>
//                 </Form.Item>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditMyProfile;

import { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import countryList from "react-select-country-list";
import dashProfile from "../../assets/images/dashboard-profile.png";
import { useUpdateProfileMutation } from "../../redux/features/userProfile";

const { Option } = Select;

const EditMyProfile = () => {
  const navigate = useNavigate();
  const [updateProfile] = useUpdateProfileMutation();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();

  // Retrieve Admin Data from Local Storage
  const storedData = localStorage.getItem("admin");
  const adminData = storedData ? JSON.parse(storedData) : null;

  // Profile Data with Fallback Defaults
  const profileData = {
    name: adminData?.name || "Jane Kooper",
    email: adminData?.email || "enrique@gmail.com",
    country: adminData?.country || "",
    profile: adminData?.avatar || dashProfile,
  };

  // Initialize country list
  const countries = countryList().getData();

  // API Environment Variable for Image
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Image upload validation
  const validateImage = (file) => {
    const isImage = file.type.startsWith("image/");
    const isLt5M = file.size / 1024 / 1024 < 5; // 5MB limit

    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }
    return true;
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validateImage(file)) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Submission Handlers
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("country", values.country);
      if (imageFile) {
        formData.append("images", imageFile);
      }

      const response = await updateProfile(formData).unwrap();

      // Update local storage with new data
      const updatedAdminData = {
        ...adminData,
        name: values.name,
        country: values.country,
        avatar: response.data.avatar || adminData.avatar,
      };

      localStorage.setItem("admin", JSON.stringify(updatedAdminData));

      message.success("Profile updated successfully!");
      navigate("/settings/profile");
      window.location.reload()
    } catch (error) {
      message.error("Failed to update profile: " + (error.message || "Unknown error"));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please check the form for errors!");
  };

  return (
    <>
      {/* Header Section */}
      <Link to={"/settings/profile"} className="flex text-white items-center gap-2 text-xl">
        <FaAngleLeft />
        <h1 className="text-white">Personal Information</h1>
      </Link>

      {/* Profile Form Card */}
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-[#212121] text-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-white mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
            Personal Information
          </h3>

          <div className="w-full">
            <Form
              form={form}
              name="basic"
              layout="vertical"
              className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{
                name: profileData.name,
                email: profileData.email,
                country: profileData.country,
              }}
            >
              {/* Profile Image Section */}
              <div className="col-span-3 space-y-6">
                <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                  <div className="my-2">
                    <img
                      src={previewImage || `${IMAGE}${profileData.profile}`}
                      alt="Profile"
                      className="h-28 w-28 rounded-full border-4 border-black object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-white"
                  />
                  <h5 className="text-lg text-white">Profile</h5>
                  <h4 className="text-2xl text-white">Admin</h4>
                </div>
              </div>

              {/* Input Fields Section */}
              <div className="col-span-9 space-y-[14px] w-full">
                <Form.Item
                  className="text-lg font-medium text-white -mb-1"
                  label={<span style={{ color: "#ffffff" }}>Name</span>}
                  // label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please input your name!" }]}
                >
                  <Input size="large" className="h-[53px] rounded-lg" />
                </Form.Item>

                <Form.Item
                  className="text-lg font-medium text-white"
                  label={<span style={{ color: "#ffffff" }}>Email</span>}
                  // label="Email"
                  name="email"
                >
                  <Input readOnly size="large" className="h-[53px] rounded-lg" />
                </Form.Item>

                <Form.Item
                  className="text-lg font-medium text-white"
                  label={<span style={{ color: "#ffffff" }}>Your Country</span>}
                  // label="Your Country"
                  name="country"
                  rules={[{ required: true, message: "Please select your country!" }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    size="large"
                    className="h-[53px] w-full"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {countries.map((country) => (
                      <Option key={country.value} value={country.label}>
                        {country.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Save Button */}
                <Form.Item className="flex justify-end pt-4">
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
                  >
                    Save Changes
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMyProfile;