import React, { useState,useEffect } from "react";
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
  Row, 
  Col,
  Radio,
  Select,
  DatePicker,
  InputNumber
} from "antd";
import {
  LoginOutlined,
  CloseOutlined,
  SaveOutlined
} from "@ant-design/icons";
import "antd/dist/antd.min.css";

import { useAuthLogin } from "../../hooks/useLogin";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { IAuthLoginParams, ILoginStyle } from "../../types/pages/Login";
import { useProvince } from "../../hooks/useProvince";
import { useDistrict } from "../../hooks/useDistrict";
import { useSubdistrict } from "../../hooks/useSubdistrict";
import { 
  useDeleteCustomer, 
  useCreateCustomer, 
  useUpdateCustomer 
} from "../../hooks/useCustomer";

import logo from "../../assets/toto-logo-banner.png";
import logo2 from "../../assets/toto-logo-login2.png";
import "./Claim.css";

const Claim: React.FC = () => {
  const { Title } = Typography;
  const { Header, Content } = Layout;

  const { isLoading, isError, error, status, mutate } = useAuthLogin();

  const [Claim] = Form.useForm();
  const navigate = useNavigate();
  const [districtList, setDistrictList] = useState<any>([]);
  const [subdistrictList, setSubdistrictList] = useState<any>([]);
  const { Option } = Select;
  const [buttonSave, setbuttonSave] = useState(true);



  const {
    error: createError,
    status: createStatus,
    mutate: createMutate,
  } = useCreateCustomer();

  const {
    error: updateError,
    status: updateStatus,
    mutate: updateMutate,
  } = useUpdateCustomer();



  const handleOk = (value: any) => {
    //setLoading(true);

    console.log('ddd =',value);


    if (value?.Customer_Index) {
      updateMutate(value);
    } else {
      createMutate(value);
    }
  };


  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    setbuttonSave(false);
  };


  const handleSignInFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // useEffect(() => {
  //   if (status === "success") {
  //     message.success("Login Success");
  //     navigate(`${import.meta.env.VITE_APP_PUBLIC_URL}/Main`);
  //   } else if (status === "error") {
  //     message.error(error?.response?.data?.message || error.message);
  //   }
  // }, [status]);

  useEffect(() => {
    if (createStatus === "success") {
      message.success("Claim Success");
      navigate(`${import.meta.env.VITE_APP_PUBLIC_URL}/Main`);
    } else if (createStatus === "error") {
      message.error(
        createError?.response?.data?.message || createError.message
      );
    }
  }, [createStatus]);

  return (
    <>
    <Header className="site-layout-background-template" style={{ padding: 0,background: "#165292" }}>
      <Row className="min-w-[300px]">
        <Col flex={1} className="flex items-center pr-3">
              <Title
                style={{
                  fontWeight: "bold",
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 30,
                  color: "rgba(255,255,255,1)",
                }}
                level={3}
                className="font-sans text-left"
              >
                แจ้งเคลมสินค้า
              </Title>
        </Col>
        <Col className="flex items-center">
        </Col>
        <Col flex={1} className="flex justify-end items-center">
          <span className="ant-dropdown-link cursor-pointer" onClick={(e) => e.preventDefault()} style={{paddingRight:30}}>
            <Link to={`${import.meta.env.VITE_APP_PUBLIC_URL}${`/Main`}`}>
              <CloseOutlined style={{  color: '#fff' }}/>
            </Link>
          </span>
        </Col>
        
      </Row>
    </Header>
      
      <div className="bg-pk-template bg-login">
      <Content style={{ padding: '0 30px' }}>
              
          <div className="form-register1">
                <Form
                  size="large"
                  form={Claim}
                  name="Claim"
                  // initialValues={{
                  //   username: cookies.username,
                  //   password: cookies.password,
                  //   remember: true,
                  // }}
                  onFinish={handleOk}
                  onFinishFailed={handleSignInFailed}
                  onReset={() => Claim.resetFields()}
                >
                <Form.Item name="Claim_Index" label="Claim Index" hidden>
                  <Input />
                </Form.Item>
                  <span>
                    ชื่อลูกค้า/Name
                  </span>
                  <Form.Item
                    name="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Name",
                      },
                    ]}
                  >
                    <Input
                      placeholder={`  Name...`}
                      size="large"
                      allowClear
                      style={style.input}
                    />
                  </Form.Item>
                  <Form.Item>
                  <span>
                    เบอร์โทรศัพท์/Phone Number
                  </span>
                  <Form.Item
                    name="Phone_Number"
                    rules={[
                      { required: true, message: "Please enter Phone Number" },
                    ]}
                  >
                    <Input placeholder="Please enter Phone Number" />
                  </Form.Item>
                  
                  <span>
                    รหัสสินค้า/Product Code
                  </span>  
                  <Form.Item
                    name="Product_Code"
                    rules={[
                      { required: true, message: "Please enter Product Code" },
                    ]}
                  >
                    <Input placeholder="Please enter Product Code" />
                  </Form.Item>
                  <span>
                  จำนวนที่เกิดปัญหา/Defective Product Qty
                  </span>    
                  <Form.Item
                    name="Defective_Product_Qty"
                    rules={[{ required: true, message: "Please enter Defective Product Qty" }]}
                  >
                    <InputNumber className="w-full" placeholder="Please enter Defective Product Qty" />
                  </Form.Item>
                  <span>
                   วันที่แจ้งงาน/Date of Reception
                  </span>
                  <Form.Item
                    name="Date_of_Reception"
                    rules={[
                      {
                        required: true,
                        message: "Date of Reception..",
                      },
                    ]}
                  > 
                    <DatePicker className="myDatePicker w-full"  
                      size="large"
                      style={style.input}/>
                  </Form.Item>
                  <span>
                    วันที่ต้องการให้เข้าหน้างาน
                  </span>
                  <Form.Item
                    name="Date111"
                    rules={[
                      {
                        required: true,
                        message: "Date111..",
                      },
                    ]}
                  > 
                    <DatePicker className="myDatePicker w-full" 
                      size="large"
                      style={style.input}/>
                      
                  </Form.Item>
                  
              
                  <span>
                    ชื่อผู้แจ้ง
                  </span>     
                  <Form.Item
                    name="XXX_Name"
                    rules={[
                      { required: true, message: "Please enter XXX_Name" },
                    ]}
                  >
                    <Input placeholder="Please enter XXX_Name"/>
                  </Form.Item>
                  <span>
                    หน่วยงานผู้แจ้ง
                  </span>     
                  <Form.Item
                    name="aaaa_Name"
                    rules={[
                      { required: true, message: "Please enter aaaa_Name" },
                    ]}
                  >
                    <Input placeholder="Please enter aaaa_Name"/>
                  </Form.Item>

                    
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined className="relative bottom-1" />}
                      loading={isLoading}
                      className="w-full"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 7,
                        marginBottom: 10,
                      }}
                      >
                      ยืนยัน
                    </Button>
                    

                  </Form.Item>
                </Form>
              </div>
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

export default Claim;
