import { Button, Input, Form, message, Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useResetPasswordMutation } from "../../redux/features/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [form] = Form.useForm();

  // Get email from navigation state or query params
  const email =
    location.state?.email || new URLSearchParams(location.search).get("email");

  const onFinish = async (values) => {
    try {
      // Validate password match
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      // Prepare payload with email and new password
      const payload = {
        // email,
        password: values.password,
      };

      const response = await resetPassword(payload).unwrap();

      if (response?.success) {
        message.success(response.message || "Password reset successfully!");
        localStorage.removeItem('accessToken')

        // Clear any existing tokens
        // localStorage.removeItem("accessToken");

        // Redirect to login page
        navigate("/auth/sign-in", { replace: true });
      } else {
        throw new Error(response?.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      message.error(
        error?.data?.message ||
          error.message ||
          "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <div className="flex bg-[#212121] h-screen">
      {/* Left Section - Branding */}
      <div className="w-1/2 flex justify-center items-center">
        <h1 className="text-[72px] font-medium text-[#CAEA31]">AngryGPT</h1>
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 bg-[#171717] flex justify-center items-center">
        <div className="shadow-lg bg-[#212121] border border-[#CAEA31] rounded-lg px-8 py-16 w-[645px]">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Reset Password
            </h1>
            <p className="text-white">
              {email ? `Reset password for ${email}` : "Create a new password"}
            </p>
          </div>

          <Spin spinning={isLoading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="password"
                label={<span className="text-white">New Password</span>}
                rules={[
                  { required: true, message: "Please enter a new password!" },
                 
                ]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  placeholder="New password"
                  prefix={<LockOutlined className="text-gray-400" />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="bg-[#212121] text-black border-gray-600 hover:border-[#CAEA31]"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={<span className="text-white">Confirm Password</span>}
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("The two passwords do not match!");
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  placeholder="Confirm password"
                  prefix={<LockOutlined className="text-gray-400" />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="bg-[#212121] text-black border-gray-600 hover:border-[#CAEA31]"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-full bg-[#CAEA31] text-black hover:bg-[#b5d72c] font-medium"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
