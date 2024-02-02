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
  Switch,
  Modal
} from "antd";
import {
  LoginOutlined,
  CloseOutlined,
  SaveOutlined,
  CheckOutlined,
  CameraOutlined
} from "@ant-design/icons";
import "antd/dist/antd.min.css";

import { useAuthLogin } from "../../hooks/useLogin";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { IAuthLoginParams, ILoginStyle } from "../../types/pages/Login";
import { useProvince } from "../../hooks/useProvince";
import { useDistrict } from "../../hooks/useDistrict";
import { useSubdistrict } from "../../hooks/useSubdistrict";
import { 
  useDeleteRegisterProduct, 
  useCreateRegisterProduct, 
  useUpdateRegisterProduct 
} from "../../hooks/useRegisterProduct";
import { useSelector } from "react-redux";
import { selectAuth } from "../../contexts/slices/authSlice";

import logo from "../../assets/toto-logo-banner.png";
import logo2 from "../../assets/toto-logo-login2.png";
import "./RegisterProduct.css";
import QrReader from 'react-qr-reader';

const RegisterProduct: React.FC = () => {
  const { Title } = Typography;
  const { Header, Content } = Layout;

  const { isLoading, isError, error, status, mutate } = useAuthLogin();

  const [RegisterProduct] = Form.useForm();
  const navigate = useNavigate();
  const [districtList, setDistrictList] = useState<any>([]);
  const [subdistrictList, setSubdistrictList] = useState<any>([]);
  const { Option } = Select;
  const [buttonSave, setbuttonSave] = useState(true);
  const [hiddenCamera, setHiddenCamera] = useState(true);
  const [hiddenRegister, setHiddenRegister] = useState(false);
  const [checked, setChecked] = useState(false);

  const [scanResultWebCam, setScanResultWebCam] =  useState<any>(null);
  const { authResult } = useSelector(selectAuth);

  console.log('aaaa =',authResult);

  const previewStyle = {
    height: 350,
    width: '100%',
  };

  const {
    error: createError,
    status: createStatus,
    mutate: createMutate,
  } = useCreateRegisterProduct();

  const {
    error: updateError,
    status: updateStatus,
    mutate: updateMutate,
  } = useUpdateRegisterProduct();

  useEffect(() => {
    RegisterProduct.resetFields();

    RegisterProduct.setFieldsValue({
      Customer_ID: authResult.data.id || null,
    });
  }, []);

  const handleOk = (value: any) => {
    //setLoading(true);

    console.log('ddd =',value);


    if (value?.RegisterProduct_Index) {
      updateMutate(value);
    } else {
      createMutate(value);
    }
  };


  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    setbuttonSave(false);
  };

  const handleErrorWebCam = (error:any) => {
    console.log(error);
  }
  const handleScanWebCam = (result:any) => {
    if (result){
        setScanResultWebCam(result);
        const obj = JSON.parse(result);
        
    }
  }

  const onChangeCamera = (checked: boolean) => {
    if(checked === true){
      setHiddenCamera(false);
      setChecked(true);
      setHiddenRegister(true);
    }else{
      setHiddenCamera(true);
      setChecked(false);
      setHiddenRegister(false);
    }

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
      message.success("Register Warranty Product Success");
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
                level={4}
                className="font-sans text-left"
              >
                ลงทะเบียนประกันสินค้า
              </Title>
        </Col>
        <Col className="flex items-center">

        </Col>
        <Col flex={1} className="flex justify-end items-center">
          <span className="ant-dropdown-link cursor-pointer" onClick={(e) => e.preventDefault()} style={{paddingRight:30}}>

              <CameraOutlined style={{  color: '#fff' }}/>&nbsp;
              <Space>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  onChange={onChangeCamera}
                  checked={checked}
                />
              </Space>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={`${import.meta.env.VITE_APP_PUBLIC_URL}${`/Main`}`}>
              <CloseOutlined style={{  color: '#fff' }}/>
            </Link>
          </span>
        </Col>
        
      </Row>
    </Header>
      
      <div className="bg-pk-template bg-login">
        <div style={{ width: '400px', margin: 'auto',marginTop:20 ,background:'#C1C' }} hidden={hiddenCamera}>
          <div> 
            <div>
            <QrReader
              delay={300}
              style={previewStyle}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
              />
      
            </div>
          </div>
        </div>
      <Content style={{ padding: '0 30px',marginTop:20 }} hidden={hiddenRegister}>
          <div className="form-register4" >
                <Form
                  size="large"
                  form={RegisterProduct}
                  name="RegisterProduct"
                  // initialValues={{
                  //   username: cookies.username,
                  //   password: cookies.password,
                  //   remember: true,
                  // }}
                  onFinish={handleOk}
                  onFinishFailed={handleSignInFailed}
                  onReset={() => RegisterProduct.resetFields()}
                >
                <Form.Item name="RegisterProduct_Index" label="RegisterProduct Index" hidden>
                  <Input />
                </Form.Item>

                <Form.Item name="Customer_ID" label="Customer_ID" hidden>
                  <Input />
                </Form.Item>
                  <span>
                    หมายเลขสินค้า/Serial No
                  </span>
                  <Form.Item
                    name="Serial_No"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Serial No",
                      },
                    ]}
                  >
                    <Input
                      placeholder={`  Serial No...`}
                      size="large"
                      allowClear
                      style={style.input}
                    />
                  </Form.Item>
                  <Form.Item>
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
                    วันที่ลงทะเบียน/Register Date
                  </span>
                  <Form.Item
                    name="Register_Date"
                    rules={[
                      {
                        required: true,
                        message: "Register Date...",
                      },
                    ]}
                  > 
                    <DatePicker className="myDatePicker w-full"  
                      size="large"
                      style={style.input}/>
                  </Form.Item>
                  <span>
                  ที่อยู่ออกใบเสร็จ/Receipt Address
                  </span>  
                  <Form.Item
                    name="Receipt_Address"
                    rules={[
                      { required: true, message: "Please enter Receipt Address" },
                    ]}
                  >
                    <Input placeholder="Please enter Receipt Address" />
                  </Form.Item>
                  <span>
                  ชื่อตัวแทนจำหน่าย/Dealer Name
                  </span>    
                  <Form.Item
                    name="Dealer_Name"
                    rules={[{ required: true, message: "Please enter Dealer Name" }]}
                  >
                    <Input placeholder="Please enter Dealer Name" />
                  </Form.Item>
                  
              
                  <span>
                    ชื่อเจ้าหน้าที่ตัวแทนจำหน่าย/Dealer Sales
                  </span>     
                  <Form.Item
                    name="Dealer_Sales"
                    rules={[
                      { required: true, message: "Please enter Dealer Sales" },
                    ]}
                  >
                    <Input placeholder="Please enter Dealer Sales"/>
                  </Form.Item>
                  <span>
                    วันที่ซื้อสินค้า/Date of Purchase
                  </span>     
                  <Form.Item
                    name="Date_of_Purchase"
                  >
                    <DatePicker className="myDatePicker w-full"  
                      size="large"
                      style={style.input}/>
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
                      ลงทะเบียน
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

export default RegisterProduct;
