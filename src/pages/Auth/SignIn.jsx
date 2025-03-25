import { useState } from "react";
import { Input, Button, message, Spin } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../redux/features/authSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return message.error("Email and Password are required!");
    }

    try {
      const response = await login({ email, password }).unwrap();

      if (response?.success) {
        const { token, user } = response.data;
        
        // Check if user is admin
        if (user?.role === "ADMIN") {
          localStorage.setItem("accessToken", token);
          localStorage.setItem("admin", JSON.stringify(user));
        
          message.success(response.message || "Login Successful!");
          navigate('/'); // Redirect to admin dashboard
        } else {
          Swal.fire({
            icon: "success",
            title: response.message || "Login Successful",
            text: "You don't have admin privileges",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: response?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: error?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex bg-[#212121] h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex justify-center items-center ">
        <h1 className="text-[72px] font-medium text-[#CAEA31]">AngryGPT</h1>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-[#171717] flex justify-center items-center ">
        <div className="shadow-lg bg-[#212121] border border-[#CAEA31] rounded-lg px-8 py-16 w-[645px]">
          <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
            Sign In
          </h1>

          <div className="mb-4">
            <Input
              size="large"
              placeholder="Enter Your Email"
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="mb-4">
            <Input.Password
              size="large"
              placeholder="Enter Password"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="text-end">
            <button
              onClick={() => navigate("/auth/forgot-password")}
              className="text-white text-xs pb-3"
            >
              Forget password?
            </button>
          </div>

          <div className="w-full flex justify-center">
            <Button
              type="primary"
              size="large"
              onClick={handleLogin}
              className="px-2 w-full text-black text-[18px] font-normal bg-[#CAEA31] hover:bg-[#CAEA31]"
              disabled={isLoading}
            >
              {isLoading ? <Spin /> : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}