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
import "./Register.css";

const Register: React.FC = () => {
  const { Title } = Typography;
  const { Header, Content } = Layout;

  const { isLoading, isError, error, status, mutate } = useAuthLogin();

  const [formCustomer] = Form.useForm();
  const navigate = useNavigate();
  const [districtList, setDistrictList] = useState<any>([]);
  const [subdistrictList, setSubdistrictList] = useState<any>([]);
  const { Option } = Select;
  const [buttonSave, setbuttonSave] = useState(true);


  // const [cookies, setCookie] = useCookies(["username", "password"]);

  const handleSignIn = (values: IAuthLoginParams) => {
    // if (formCustomer.getFieldValue("remember")) {
    //   setCookie("username", values.username, {
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 7,
    //   });
    // }

    mutate(values);
  };

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

  const {
    data: Province,
  } = useProvince();

  const {
    isLoading: DistrictIsLoading,
    isError: DistrictIsError,
    data: District,
    status: DistrictStatus,
    error: DistrictError,
    mutate: getDistrict,
  } = useDistrict();

  const {
    isLoading: SubdistrictIsLoading,
    isError: SubdistrictIsError,
    data: Subdistrict,
    status: SubdistrictStatus,
    error: SubdistrictError,
    mutate: getSubdistrict,
  } = useSubdistrict();

  const setProvinceFunc = (value: any) => {

    console.log(value);
    setDistrictList([]);
    setSubdistrictList([]);
    formCustomer.setFieldsValue({
      Province_Name: null,
      District:null,
      District_Name: null,
      Subdistrict:null
    });

    if(value != undefined || value != null){
      const Province = value.split("|");
      console.log(Province[0]);
      console.log(Province[1]);
      formCustomer.setFieldsValue({
        Province_Name: Province[1],
      });
      getDistrict(Province[0]);
    }
    
  };

  const setDistrictFunc = (value: any) => {

    console.log(value);
    setSubdistrictList([]);
    formCustomer.setFieldsValue({
      District_Name: null,
      Subdistrict:null
    });

    if(value != undefined || value != null){
      const District = value.split("|");
      console.log(District[0]);
      console.log(District[1]);
      formCustomer.setFieldsValue({
        District_Name: District[1],
      });
      getSubdistrict(District[0]);
    }
    
  };

  const setSubdistrictFunc = (value: any) => {

    console.log(value);
    formCustomer.setFieldsValue({
      Subdistrict_Name:null
    });

    if(value != undefined || value != null){
      const Subdistrict = value.split("|");
      console.log(Subdistrict[0]);
      console.log(Subdistrict[1]);
      formCustomer.setFieldsValue({
        Subdistrict_Name: Subdistrict[1],
        Postal_Code: Subdistrict[0]
      });
    }
    
  };

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


  useEffect(() => {
    if (DistrictStatus === "success") {
      
      setDistrictList(District?.data.data);
    } else if (DistrictStatus === "error") {
      message.error(DistrictError?.response?.data?.message || DistrictError.message);
    }
  }, [DistrictStatus]);

  useEffect(() => {
    if (SubdistrictStatus === "success") {
      setSubdistrictList(Subdistrict?.data.data);
    } else if (SubdistrictStatus === "error") {
      message.error(SubdistrictError?.response?.data?.message || SubdistrictError.message);
    }
  }, [SubdistrictStatus]);

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
      message.success("Register Success");
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
        </Col>
        <Col className="flex items-center">
          <Image src={logo} preview={false} style={{ width: 150 }} />
        </Col>
        <Col flex={1} className="flex justify-end items-center">
          
        </Col>
        
      </Row>
    </Header>
      
      <div className="bg-pk-template bg-login">
      <Content style={{ padding: '0 30px' }}>
          <div className="logo-login">
                <Title
                  style={{
                    fontWeight: "bold",
                    marginTop: 0,
                    marginBottom: 0,
                    color: "rgba(255,255,255,1)",
                  }}
                  level={3}
                  className="font-sans text-left"
                >
                  ลงทะเบียนลูกค้า
                </Title>
                <Title
                  style={{
                    fontWeight: "bold",
                    marginTop: 7,
                    marginBottom: 7,
                    color: "rgba(255,255,255,1)",
                  }}
                  level={5}
                  className="font-sans text-left"
                >
                  กรุณากรอกข้อมูลส่วนตัวของท่านให้ครบถ้วนเพื่อความสะดวกรวดเร็วในการให้บริการข้อมูลของคุณจะถูกเก็บเป็นความลับ และนำไปใช้งานเพื่อสิทธิประโยชน์ของท่านเท่านั้น
                </Title>
                
          </div>
              
          <div className="form-register2">
                <Form
                  size="large"
                  form={formCustomer}
                  name="formCustomer"
                  // initialValues={{
                  //   username: cookies.username,
                  //   password: cookies.password,
                  //   remember: true,
                  // }}
                  onFinish={handleOk}
                  onFinishFailed={handleSignInFailed}
                  onReset={() => formCustomer.resetFields()}
                >
                <Form.Item name="Customer_Index" label="Customer Index" hidden>
                  <Input />
                </Form.Item>
                  <span>
                    เลขบัตรประชาชน/ID card number
                  </span>
                  <Form.Item
                    name="ID_Card_Number"
                    rules={[
                      {
                        required: true,
                        message: "กรอกเลขบัตรประชาชน...",
                      },
                    ]}
                  >
                    <Input
                      placeholder={`  กรอกเลขบัตรประชาชน...`}
                      size="large"
                      allowClear
                      style={style.input}
                    />
                  </Form.Item>
                  <span>
                    คำนำหน้าชื่อ/Prefix
                  </span>
                  <Form.Item
                    name="prefix"
                    rules={[
                      {
                        required: true,
                        message: "เลือกคำนำหน้า",
                      },
                    ]}
                  >
                    <Radio.Group>
                    <Radio value={'นาย'}>นาย</Radio>
                    <Radio value={'นาง'}>นาง</Radio>
                    <Radio value={'นางสาว'}>นางสาว</Radio>
                  </Radio.Group>
                  </Form.Item>
                  
                  {/* <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="font-bold">Remember me</Checkbox>
                  </Form.Item> */}
                  <Form.Item>
                  <span>
                    ชื่อ/Name
                  </span>
                  <Form.Item
                    name="Name_Customer"
                    rules={[
                      { required: true, message: "Please enter Name" },
                    ]}
                  >
                    <Input placeholder="Please enter Name" />
                  </Form.Item>
                  <span>
                    นามสกุล/Surname
                  </span>
                  <Form.Item
                    name="Surname"
                    rules={[
                      {
                        required: true,
                        message: "Surname...",
                      },
                    ]}
                  >
                    <Input
                      placeholder={`  Surname...`}
                      size="large"
                      allowClear
                      style={style.input}
                    />
                  </Form.Item>
                  <span>
                  เบอร์โทรศัพท์มือถิอ/Phone Number
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
                  บ้านเลขที่/Address
                  </span>    
                  <Form.Item
                    name="Address"
                    rules={[{ required: true, message: "Please enter Address" }]}
                  >
                    <Input placeholder="Please enter Address" />
                  </Form.Item>
                  
                  <Form.Item name="Province_Name" label="Province_Name" hidden>
                  <Input />
                </Form.Item>
                <span>
                จังหวัด/Province
                </span> 
                <Form.Item
                  name="Province"
                  rules={[{ required: true, message: "Please choose Province" }]}
                >
                    <Select
                      placeholder="Please choose Province"
                      onChange={(e) => setProvinceFunc(e)}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option!.children as unknown as string)
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      
                    >
                      {Province?.data?.data?.map((value: any) => {
                        return (
                          <Option
                            key={value.id}
                            value={value.id + "|" + value.name_th }
                          >
                            {value.name_th}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item name="District_Name" label="District_Name" hidden>
                    <Input />
                  </Form.Item>
                  <span>
                  อำเภอ/เขต/District
                  </span> 
                  <Form.Item
                      name="District"
                      rules={[{ required: true, message: "Please choose District" }]}
                    >
                      <Select
                        placeholder="Please choose District"
                        onChange={(e) => setDistrictFunc(e)}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option!.children as unknown as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        
                      >
                        {districtList?.map((value: any) => {
                          return (
                            <Option
                              key={value.id}
                              value={value.id + "|" + value.name_th }
                            >
                              {value.name_th}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>

                <Form.Item name="Subdistrict_Name" label="Subdistrict_Name" hidden>
                  <Input />
                </Form.Item>
                <span>
                ตำบล/แขวง/Subdistrict
                </span> 
                <Form.Item
                    name="Subdistrict"
                    rules={[{ required: true, message: "Please choose Subdistrict" }]}
                  >
                    <Select
                      placeholder="Please choose Subdistrict"
                      onChange={(e) => setSubdistrictFunc(e)}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option!.children as unknown as string)
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      
                    >
                      {subdistrictList?.map((value: any) => {
                        return (
                          <Option
                            key={value.id}
                            value={value.zip_code + "|" + value.name_th }
                          >
                            {value.name_th}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <span>
                  รหัสไปรษณีย์/Postal Code
                  </span>     
                  <Form.Item
                    name="Postal_Code"
                    rules={[
                      { required: true, message: "Please enter Postal Code" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <span>
                  Link Google Map
                  </span>     
                  <Form.Item
                    name="Link_Google_Map"
                  >
                    <Input placeholder="Please enter Link" />
                  </Form.Item>

                  <Title
                    style={{
                      fontWeight: "bold",
                      marginTop: 7,
                      marginBottom: 10,
                      color: "rgba(1,1,1,1)",
                    }}
                    level={5}
                    className="font-sans text-left"
                  >
                    ข้าพเจ้าได้ศึกษานโยบายความเป็นส่วนตัวเป็นอย่างดีแล้วที่ <a href="https://th.toto.com/privacy-policy">https://th.toto.com/privacy-policy/</a> และยินยอมให้บริษัทฯเก็บรวบรวม ใช้เปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าตามวัตถุประสงค์ที่กำหนดไว้ในนโยบายดังกล่าว
                  </Title>  
                  <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        marginBottom: 30,
                      }}>
                    <Checkbox onChange={onChange}>ยอนรับ</Checkbox>
                  </div>
                    
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<LoginOutlined className="relative bottom-1" />}
                      loading={isLoading}
                      className="w-full"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 7,
                        marginBottom: 100,
                      }}
                      disabled={buttonSave}
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

export default Register;
