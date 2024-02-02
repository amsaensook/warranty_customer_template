import React, { useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Form,
  Input,
  Button,
  Space,
  Checkbox,
  Image,
  Typography,
  Layout,
  message,
} from "antd";
import {
  LoginOutlined,
  UserOutlined,
  LockOutlined,
  RestOutlined,
  FileOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.min.css";

import { useAuthLogin } from "../../hooks/useLogin";

import { IAuthLoginParams, ILoginStyle } from "../../types/pages/Login";

import logo from "../../assets/toto-logo-banner.png";
import logo2 from "../../assets/toto-logo-login2.png";
import "./Login.css";

const Login: React.FC = () => {
  const { Title } = Typography;
  const { Header, Content } = Layout;

  const { isLoading, isError, error, status, mutate } = useAuthLogin();

  const [formLogin] = Form.useForm();
  const navigate = useNavigate();

  // const [cookies, setCookie] = useCookies(["username", "password"]);

  const handleSignIn = (values: IAuthLoginParams) => {
    // if (formLogin.getFieldValue("remember")) {
    //   setCookie("username", values.username, {
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 7,
    //   });
    // }

    mutate(values);
  };

  const handleSignInFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (status === "success") {
      message.success("Login Success");
      navigate(`${import.meta.env.VITE_APP_PUBLIC_URL}/Main`);
    } else if (status === "error") {
      message.error(error?.response?.data?.message || error.message);
    }
  }, [status]);

  return (
    <>
      <div className="bg-pk-template bg-login">
        <Content className="content-login">
          <Space direction="horizontal" size="large">
            <Space direction="vertical" size="large">
              <div className="logo-login">
                <Image src={logo} preview={false} style={{ width: 500 }} />
                <Title
                  style={{
                    fontWeight: "bold",
                    marginTop: -20,
                    marginBottom: -10,
                    color: "rgba(255,255,255,1)",
                  }}
                  level={4}
                  className="font-sans text-center"
                >
                  Warranty 
                </Title>
              </div>

              <div className="form-login">
                <Form
                  size="large"
                  form={formLogin}
                  name="formLogin"
                  // initialValues={{
                  //   username: cookies.username,
                  //   password: cookies.password,
                  //   remember: true,
                  // }}
                  onFinish={handleSignIn}
                  onFinishFailed={handleSignInFailed}
                  onReset={() => formLogin.resetFields()}
                >
                  <span>
                    เบอร์โทรศัพท์มือถือ/Phone
                  </span>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      className="username"
                      prefix={<UserOutlined />}
                      placeholder={`  Username`}
                      size="large"
                      allowClear
                      style={style.input}
                    />
                  </Form.Item>
                  <span>
                    เลขท้ายบัตรประชาชน 4 หลัก
                  </span>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder={`  Password`}
                      size="large"
                      allowClear
                      style={style.input}
                    />
                  </Form.Item>
                  {/* <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="font-bold">Remember me</Checkbox>
                  </Form.Item> */}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<LoginOutlined className="relative bottom-1" />}
                      loading={isLoading}
                      style={style.button}
                      className="w-full"
                    >
                      เข้าสู่ระบบ/ Log in
                    </Button>

                    {/*  <Button
                    htmlType="reset"
                    icon={<RestOutlined className="relative bottom-1" />}
                    style={style.button}
                    className="btn-form-login"
                  >
                    RESET
                  </Button>

                  <Button
                    type="dashed"
                    icon={<FileOutlined className="relative bottom-1" />}
                    style={style.button}
                    className="btn-form-login"
                    onClick={() =>
                      formLogin.setFieldsValue({
                        username: "pakorn.wo",
                        password: "1234",
                      })
                    }
                  >
                    FILL DATA
                  </Button> */}
                  </Form.Item>
                </Form>
              </div>
              <Title
                  style={{
                    marginTop: 0,
                    color: "rgba(17,120,255,1)",
                  }}
                  level={5}
                  className="font-sans text-center"
                >
                  ถ้ายังไม่ได้ลงทะเบียน <u><Link to={`${import.meta.env.VITE_APP_PUBLIC_URL}${`/Register`}`}>ลงทะเบียน</Link></u>
                </Title>
            </Space>
          </Space>
        </Content>
      </div>
    </>
  );
};

const style = {} as ILoginStyle;

style.input = {
  borderRadius: 5,
};

style.button = {
  borderRadius: 5,
  fontWeight: "bold",
};

export default Login;
