import { Button, Form, message, Spin } from "antd";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useVerifyEmailMutation } from "../../redux/features/authSlice";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [form] = Form.useForm();

  const onFinish = async () => {
    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "Please enter a valid 6-digit OTP code",
        confirmButtonColor: "#CAEA31",
      });
      return;
    }

    try {
      const response = await verifyEmail({ email, otp }).unwrap();

      if (response?.success) {
        // Store token if provided
        if (response?.data?.token) {
          localStorage.setItem("accessToken", response.data.token);
        }

        message.success(response?.message || "Email verified successfully!");
        navigate("/auth/reset-password", {
          state: { email }, // Pass email to reset password page
        });
      } else {
        throw new Error(response?.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error?.data?.message || error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#CAEA31",
      });
    }
  };

  return (
    <div className="flex bg-[#212121] h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex justify-center items-center">
        <h1 className="text-[72px] font-medium text-[#CAEA31]">AngryGPT</h1>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-[#171717] flex justify-center items-center">
        <div className="shadow-lg bg-[#212121] border border-[#CAEA31] rounded-lg px-8 py-16 w-[645px]">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
              Verify Your Email
            </h1>
            <p className="drop-shadow text-white mt-4 text-center lg:text-start pb-2">
              We have sent a 6-digit verification code to{" "}
              <span className="font-semibold text-[#CAEA31]">{email}</span>.
              Please enter it below.
            </p>
          </div>

          <Spin spinning={isLoading}>
            <Form
              form={form}
              name="verify_email"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className="py-3 text-2xl font-semibold flex justify-center gap-1">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  shouldAutoFocus
                  // inputType="number"
                  inputStyle={{
                    height: "70px",
                    width: "70px",
                    margin: "10px",
                    border: "1px solid #61D0FF",
                    outline: "none",
                    borderRadius: "50px",
                    color: "white",
                    backgroundColor: "#212121",
                    fontSize: "24px",
                  }}
                  renderSeparator={<span className="mx-1" />}
                  renderInput={(props) => <input {...props} />}
                />
              </div>

              <Form.Item className="text-center">
                <Button
                  // type="primary"
                  // size="large"
                  // htmlType="submit"
                  // className="w-full px-2  text-white bg-[#b5d72c]"
                  // type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-full px-2 bg-[#CAEA31] text-black hover:bg-[#b5d72c]"
                  loading={isLoading}
                  disabled={isLoading || otp.length !== 6}
                >
                  Verify Email
                </Button>
              </Form.Item>

              {/* <div className="text-center text-white">
                Didnt receive code?{" "}
                <button
                  type="button"
                  className="text-[#CAEA31] hover:underline"
                  onClick={() => {
                    // Add resend OTP functionality here
                    message.info("New OTP code sent to your email");
                  }}
                >
                  Resend OTP
                </button>
              </div> */}
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;