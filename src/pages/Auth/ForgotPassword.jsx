import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/forgot.png";
import PageHeading from "../../Components/PageHeading";
// import { useForgotPasswordMutation } from "../../redux/features/Auth/authApi";
// import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  // const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onFinish = async (values) => {
    navigate(`/auth/verify-email`);
    // try {
    //   const response = await forgotPassword(values);
    //   // console.log(response);
    //   if (response?.data?.statusCode == 200) {
    //     navigate(`/auth/verify-email/${values.email}`);
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Failed!!",
    //       text:
    //         response?.data?.message ||
    //         response?.error?.data?.message ||
    //         "Something went wrong. Please try again later.",
    //     });
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Failed!!",
    //     text: "Something went wrong. Please try again later.",
    //   });
    // }
  };
  return (
    <div className="flex bg-[#212121] h-screen">
        {/* Left Section */}
        <div className="w-1/2 flex justify-center items-center ">
        <h1 className="text-[72px] font-medium text-[#CAEA31]">AngryGPT</h1>
      </div>
      <div className="w-1/2 bg-[#171717] flex justify-center items-center">
        <div className="shadow-lg bg-[#212121] border border-[#CAEA31] rounded-lg px-8 py-16 w-[645px]">
          <div className="flex flex-col items-center lg:items-start">
            {/* <PageHeading backPath={"/auth"} title={"Forgot Password"} disbaledBackBtn={true} /> */}
            <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
            Forgot Password
          </h1>
            <p className="drop-shadow text-white mt-4 text-center lg:text-start pb-2">
              Enter your email address to get a verification code for resetting
              your password. Please enter your email address to reset your
              password.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input valid email!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <div className="w-full flex justify-center pt-5">
                <Button
                  // disabled={isLoading}
                  type="primary"

                  size="large"
                  htmlType="submit"
                  className="w-full px-2 bg-playground"
                >
                  Get OTP
                </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
