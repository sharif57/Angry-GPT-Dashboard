import { Button, Input, message, Spin } from "antd";
import Form from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/features/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await forgotPassword(values).unwrap();
      
      if (response.success) {
        message.success(response.message || "OTP has been sent to your email!");
        navigate(`/auth/verify-email?email=${encodeURIComponent(values.email)}`);
      } else {
        message.error(response.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      
      // Handle different error formats
      const errorMessage = error.data?.message || 
                          error.errorMessages?.[0]?.message || 
                          "Failed to send OTP. Please try again.";
      
      message.error(errorMessage);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form Submission Failed:", errorInfo);
    message.error("Please fill out the form correctly.");
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
              Forgot Password
            </h1>
            <p className="drop-shadow text-white mt-4 text-center lg:text-start pb-2">
              Enter your email address to get a verification code for resetting
              your password. Please enter your email address to reset your
              password.
            </p>
          </div>
          
          <Spin spinning={isLoading}>
            <Form
              form={form}
              name="forgot_password"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address!',
                  },
                ]}
              >
                <Input 
                  size="large" 
                  placeholder="Enter your email" 
                  disabled={isLoading}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-full px-2 bg-[#CAEA31] text-black"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Get OTP
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;