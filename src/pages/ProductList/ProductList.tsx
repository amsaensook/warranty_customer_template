import React, { useState,useEffect } from "react";
import { useNavigate,Link,useLocation } from "react-router-dom";
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
  Modal,
  Tabs,
  Card,
  List,
  Tag,
  InputNumber
} from "antd";
import {
  LoginOutlined,
  CloseOutlined,
  SaveOutlined,
  CheckOutlined,
  CameraOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import "antd/dist/antd.min.css";

import { useAuthLogin } from "../../hooks/useLogin";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import moment from "moment";

import { IAuthLoginParams, ILoginStyle } from "../../types/pages/Login";
import { useProvince } from "../../hooks/useProvince";
import { useDistrict } from "../../hooks/useDistrict";
import { useSubdistrict } from "../../hooks/useSubdistrict";
import {
  useClaim,
  useDeleteClaim, 
  useCreateClaim, 
  useUpdateClaim 
} from "../../hooks/useClaim";

import { 
  useDeleteRegisterProduct,
  useUpdateRegisterProduct 
} from "../../hooks/useRegisterProduct";

import { useServiceCategories } from "../../hooks/useServiceCategories";

import { useProductListWarrantyDes } from "../../hooks/useProductListWarrantyDes";
import { useSelector } from "react-redux";
import { selectAuth } from "../../contexts/slices/authSlice";
import logo from "../../assets/toto-logo-banner.png";
import logo2 from "../../assets/toto-logo-login2.png";
import "./ProductList.css";
import QrReader from 'react-qr-reader';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const ProductList: React.FC = () => {
  const { Title } = Typography;
  const { Header, Content } = Layout;

  const { isLoading, isError, error, status, mutate } = useAuthLogin();

  const [loading, setLoading] = useState(false);
  const [formProductList] = Form.useForm();
  const [formClaim] = Form.useForm();
  const [dateTime, setDateTime] = useState(moment().format("YYYY-MM-DD"));
  const [listClaim, setListClaim] = useState<any>([]);
  const [claimIndex, setClaimIndex] = useState<any>([]);
  const [productCode, setProductCode] = useState<any>([]);
  const [hiddenDelete, setHiddenDelete] = useState(true);

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [districtList, setDistrictList] = useState<any>([]);
  const [subdistrictList, setSubdistrictList] = useState<any>([]);
  
  const { Option } = Select;
  const [buttonSave, setbuttonSave] = useState(true);
  const [hiddenCamera, setHiddenCamera] = useState(true);
  const [hiddenRegister, setHiddenRegister] = useState(false);
  const [checked, setChecked] = useState(false);
  const { authResult } = useSelector(selectAuth);
  const [scanResultWebCam, setScanResultWebCam] =  useState<any>(null);
  const { TabPane } = Tabs;

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);


  console.log('PL =',authResult.data.FirstName,authResult.data.LastName);


  console.log(queryParameters.get("ID"));

  let yyy:any = queryParameters.get("info");

  let xxx = base64_decode(yyy);

  console.log('ans =',xxx);

  const previewStyle = {
    height: 350,
    width: '100%',
  };

  const {
    data: Des,
    status: DesStatus,
    error: DesError,
    mutate: getDes,
  } = useProductListWarrantyDes();

  const {
    error: updateProductError,
    status: updateProductStatus,
    mutate: updateProductMutate,
  } = useUpdateRegisterProduct();

  const {
    error: deleteErrorRegisterProduct,
    status: deleteStatusRegisterProduct,
    mutate: deleteMutateRegisterProduct,
  } = useDeleteRegisterProduct();

  const {
    data: ClaimList,
    status: ClaimListStatus,
    error: ClaimListError,
    mutate: getClaimList,
  } = useClaim();
 
  const {
     data: ServiceCategories,
  } = useServiceCategories();


  useEffect(() => {
    if (ClaimListStatus === "success") {

      setListClaim(ClaimList?.data.data || []);

    } else if (ClaimListStatus === "error") {
      message.error(ClaimListError?.response?.data?.message || ClaimListError.message);
    }
  }, [ClaimListStatus]);

  const {
    error: createErrorClaim,
    status: createStatusClaim,
    mutate: createMutateClaim,
  } = useCreateClaim();

  const {
    error: updateErrorClaim,
    status: updateStatusClaim,
    mutate: updateMutateClaim,
  } = useUpdateClaim();

  const {
    error: deleteErrorClaim,
    status: deleteStatusClaim,
    mutate: deleteMutateClaim,
  } = useDeleteClaim();



  useEffect(() => {
    console.log('fuck');
    getDes(queryParameters.get("ID"));
    getClaimList(queryParameters.get("ID"));
  }, []);



  const showModal = (value: any) => {

    console.log('dddd =',value);

    if(value == "Add"){
      console.log('if');
      setVisible(true);
      formClaim.setFieldsValue({
        Warranty_Index: queryParameters.get("ID"),
        Date_Work_Site: moment(dateTime),
        Name_Claim:authResult.data.FirstName+' '+authResult.data.LastName,
        Phone_Number_Claim : authResult.data.Phone_Number,
        Product_Code:productCode,
      });
    }else{
      console.log('else');
      setVisible(true);
      setHiddenDelete(false);
      setClaimIndex(value.Claim_Index);
      formClaim.resetFields();
      formClaim.setFieldsValue({
        Claim_Index:value.Claim_Index,
        Warranty_Index: value.Warranty_Index,
        Name_Claim:value.Customer_Name,
        Phone_Number_Claim:value.Phone_Number,
        Service_Categories:value.Service_Categories,
        Product_Code:value.Product_Code,
        Defective_Product_Qty:value.Defective_Product_Qty,
        Date_Work_Site: moment(value.Date_Work_Site),
        Date_Arrive_Work_Site:moment(value.Date_Arrive_Work_Site),
        Claimant_Name:value.Claimant_Name,
        Claimant_Agency:value.Claimant_Agency,
      });
    }
    

  };
  
  const handleCloseModel = () => {
    setVisible(false);
    setHiddenDelete(true);
    formClaim.resetFields();
    getClaimList(queryParameters.get("ID"));
  };

  const handleProduct = (value: any) => {
    //setLoading(true);

    console.log('xxxxx =',value);
    
    updateProductMutate(value);
    
  };

  
  const handleOk = (value: any) => {
    //setLoading(true);

    console.log('ddd =',value);
    

    if (value?.Claim_Index) {
      updateMutateClaim(value);
    } else {
      createMutateClaim(value);
    }
  };

  const deleteProduct = () => {
    //setLoading(true);
    Modal.confirm({
      title: "Delete Confirm",
      content: <>{`Do you want delete Product ?`}</>,
      onOk: () => {
        deleteMutateRegisterProduct(queryParameters.get("ID"));
      },
    });


  };


  const deleteClaim = () => {
    //setLoading(true);
    Modal.confirm({
      title: "Delete Confirm",
      content: <>{`Do you want delete Claim ?`}</>,
      onOk: () => {
        deleteMutateClaim(claimIndex);
      },
    });


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


  useEffect(() => {
    if (DesStatus === "success") {
      console.log('Hello =',Des?.data.data);
      formProductList.resetFields();
      formProductList.setFieldsValue({
        Warranty_Index: Des?.data.data[0].Warranty_Index,
        Serial_No: Des?.data.data[0].Serial_No,
        Product_Code: Des?.data.data[0].Product_Code, 
        Register_Date: moment(Des?.data.data[0].Register_Date),
        Receipt_Address: Des?.data.data[0].Receipt_Address,
        Dealer_Name: Des?.data.data[0].Dealer_Name,
        Dealer_Sales: Des?.data.data[0].Dealer_Sales,
        Date_of_Purchase: moment(Des?.data.data[0].Date_of_Purchase),
        Date_Warranty_Expires: moment(Des?.data.data[0].Date_Warranty_Expires),
      });

      setProductCode(Des?.data.data[0].Product_Code);

    } else if (DesStatus === "error") {
      message.error(
        DesError?.response?.data?.message || DesError.message
      );
    }
  }, [DesStatus]);

  useEffect(() => {
    if (updateProductStatus === "success") {
      message.success("Update Product Success");
      setLoading(false);
      
    } else if (updateProductStatus === "error") {
      message.error(
        updateProductError?.response?.data?.message ||
        updateProductError.message
      );
      setLoading(false);
    }
  }, [updateProductStatus]);

  useEffect(() => {
    if (deleteStatusRegisterProduct === "success") {
      message.success("Delete Product  Success");
      navigate(`${import.meta.env.VITE_APP_PUBLIC_URL}/Main`);
    } else if (deleteStatusRegisterProduct === "error") {
      message.error(
        deleteErrorRegisterProduct ?.response?.data?.message ||
        deleteErrorRegisterProduct .message
      );
      setLoading(false);
    }
  }, [deleteStatusRegisterProduct ]);



  useEffect(() => {
    if (createStatusClaim === "success") {
      message.success("Add Claim Success");
      handleCloseModel();
      setLoading(false);
      
    } else if (createStatusClaim === "error") {
      message.error(
        createErrorClaim?.response?.data?.message ||
        createErrorClaim.message
      );
      setLoading(false);
    }
  }, [createStatusClaim]);

  useEffect(() => {
    if (updateStatusClaim === "success") {
      message.success("Update Claim Success");
      handleCloseModel();
      setLoading(false);
      
    } else if (updateStatusClaim === "error") {
      message.error(
        updateErrorClaim?.response?.data?.message ||
        updateErrorClaim.message
      );
      setLoading(false);
    }
  }, [updateStatusClaim]);


  useEffect(() => {
    if (deleteStatusClaim === "success") {
      message.success("Delete Claim Success");
      handleCloseModel();
      setLoading(false);
      
    } else if (deleteStatusClaim === "error") {
      message.error(
        deleteErrorClaim?.response?.data?.message ||
        deleteErrorClaim.message
      );
      setLoading(false);
    }
  }, [deleteStatusClaim]);

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
                รายละเอียด
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

      
      <Content style={{padding: '0 10px',marginTop:10 }}>
        <Tabs type="card">
          {/* ------------------------------------------------------------- Tab รายการสินค้า ---------------------------------------------------------- */}
            <TabPane tab="รายการสินค้า" key="1">
            <div className="form-register4" >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  className="w-full"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 7,
                    marginBottom: 20,
                  }}
                  onClick={() => showModal("Add")}
                  ghost>
                  แจ้งเครมสินค้า
                </Button>
                <Form
                  size="large"
                  form={formProductList}
                  name="ProductList"
                  // initialValues={{
                  //   username: cookies.username,
                  //   password: cookies.password,
                  //   remember: true,
                  // }}
                  onFinish={handleProduct}
                  onFinishFailed={handleSignInFailed}
                  onReset={() => formProductList.resetFields()}
                >
                <Form.Item name="Warranty_Index" label="Warranty_Index" hidden>
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
                    <Input placeholder="Please enter Product Code" allowClear/>
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
                    <Input placeholder="Please enter Receipt Address" allowClear/>
                  </Form.Item>
                  <span>
                  ชื่อตัวแทนจำหน่าย/Dealer Name
                  </span>    
                  <Form.Item
                    name="Dealer_Name"
                    rules={[{ required: true, message: "Please enter Dealer Name" }]}
                  >
                    <Input placeholder="Please enter Dealer Name" allowClear/>
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
                    <Input placeholder="Please enter Dealer Sales" allowClear/>
                  </Form.Item>
                  <span>
                    วันที่ซื้อสินค้า/Date of Purchase
                  </span>     
                  <Form.Item
                    name="Date_of_Purchase"
                  >
                    <DatePicker className="myDatePicker w-full"  
                      size="large"
                      style={style.input}
                      disabled  
                      />
                  </Form.Item>
                  <span>
                    วันที่ประกันหมดอายุ
                  </span>     
                  <Form.Item
                    name="Date_Warranty_Expires"
                  >
                    <DatePicker className="myDatePicker w-full"  
                      size="large"
                      style={style.input}
                      disabled
                      />
                  </Form.Item>
                    
                    
                    

                  </Form.Item>
                  <div 
                      style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 2,
                      marginBottom: 70,
                    }}>
                        <Button
                          key="submit"
                          type="primary"
                          loading={loading}
                          onClick={formProductList.submit}
                          icon={<EditOutlined className="relative bottom-[0.2em]" />}
                        >
                          Edit
                        </Button>&nbsp;
                        <Button
                        key="back"
                        type="primary"
                        danger
                        onClick={deleteProduct}
                        icon={<DeleteOutlined className="relative bottom-[0.2em]" />}
                      >
                        Delete
                      </Button>

                  </div>
                  

                </Form>
                

                
              </div>
            
            </TabPane>



            {/* ------------------------------------------------------------- Tab ประวัติการแจ้งเครม ---------------------------------------------------------- */}


            <TabPane tab="ประวัติการแจ้งเครม" key="2">
                <List 
            
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={listClaim}
                  renderItem={(item:any) => (

                    <List.Item
                    onClick={() => showModal(item)}
                    >
                      
                        <Card hoverable 
                          style={{
                            borderRadius: "20px",
                          }}>
                          <Row gutter={24}>
                            <Col span={19}>
                            <Title
                              style={{
                                fontWeight: "bold",
                                fontSize:15
                              }}
                              className="font-sans text-left"
                            >
                              {item.Product_Code}
                            </Title>
                              
                            </Col>
                            <Col span={5}>
                              <Tag color="#87d068">Active</Tag>
                            </Col>
                          </Row>
                          <Row gutter={24} style={{marginTop:1}}>
                            <Col span={19}>
                              {item.Customer_Name}
                            </Col>
                          </Row>
                          <Row gutter={24} style={{marginTop:5}}>
                            <Col span={20}>
                              {item.Date_Work_Site}
                            </Col>
                          </Row>
                        </Card>
                    </List.Item>
                  )}
                />
            </TabPane>
        
          </Tabs>
          
        </Content>
        
        
        
        <Modal
              visible={visible}
              title="แจ้งเครม"
              style={{ top: 20 }}
              onCancel={handleCloseModel}
              width={1200}
              
              footer={[
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={formClaim.submit}
                  icon={<SaveOutlined className="relative bottom-[0.2em]" />}
                >
                  Submit
                </Button>,
                <Button
                key="back"
                type="primary"
                danger
                onClick={deleteClaim}
                icon={<DeleteOutlined className="relative bottom-[0.2em]" />}
                hidden={hiddenDelete}
              >
                Delete
              </Button>,

                <Button
                  key="back"
                  type="ghost"
                  danger
                  onClick={handleCloseModel}
                  icon={<CloseOutlined className="relative bottom-[0.2em]" />}
                >
                  Cancel
                </Button>,
              ]}
            >
              <Form 
              layout="vertical" 
              form={formClaim} 
              name="formClaim"
              onFinish={handleOk}>
              <Form.Item name="Claim_Index" label="Claim Index" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="Warranty_Index" label="Warranty_Index" hidden>
                  <Input />
                </Form.Item>
                  <span>
                    ชื่อลูกค้า/Name
                  </span>
                  <Form.Item
                    name="Name_Claim"
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

                  <span>
                    เบอร์โทรศัพท์/Phone Number
                  </span>
                  <Form.Item
                    name="Phone_Number_Claim"
                    rules={[
                      {
                        required: true,
                        message: "Phone_Number...",
                      },
                    ]}
                  > 
                    <Input placeholder="Please enter Phone Number" allowClear/>
                  </Form.Item>
                  <span>
                  ประเภทการบริการ/Service Categories
                  </span>  
                  <Form.Item
                      name="Service_Categories"
                      label=""
                      rules={[
                        {
                          required: true,
                          message: "Please choose Service Categories",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Please choose Service Categories"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option!.children as unknown as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {ServiceCategories?.data?.data?.map((value: any) => {
                          return (
                            <Option key={value.Service_Categories_Index} value={value.Description}>
                              {value.Description}
                            </Option>
                          );
                        })}
                      </Select>
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
                    <Input placeholder="Please enter Product Code" allowClear/>
                  </Form.Item>  
                  <span>
                  จำนวนที่เกิดปัญหา
                  </span>    
                  <Form.Item
                    name="Defective_Product_Qty"
                    rules={[{ required: true, message: "Please enter Defective Product Qty" }]}
                  >
                    <InputNumber style={{ width: "100%" }}
                        step="1"
                        min={1}
                        max={100000} 
                        placeholder="Please enter Defective Product Qty" />
                  </Form.Item>
                  <span>
                    วันที่แจ้งงาน
                  </span>     
                  <Form.Item
                    name="Date_Work_Site"
                  >
                    <DatePicker className="myDatePicker w-full"  
                      size="large"
                      style={style.input}/>
                  </Form.Item>

                  <span>
                  วันที่ต้องการให้เข้าหน้างาน
                  </span>     
                  <Form.Item
                    name="Date_Arrive_Work_Site"
                  >
                    <DatePicker className="myDatePicker w-full"  
                      size="large"
                      style={style.input}/>
                  </Form.Item>
              
                  <span>
                   ชื่อผู้แจ้ง
                  </span>     
                  <Form.Item
                    name="Claimant_Name"
                    rules={[
                      { required: true, message: "Please enter Claimant Name" },
                    ]}
                  >
                    <Input placeholder="Please enter Claimant Name" allowClear/>
                  </Form.Item>
                  <span>
                  หน่วยงานผู้แจ้ง
                  </span>     
                  <Form.Item
                    name="Claimant_Agency"
                    rules={[
                      { required: true, message: "Please enter Claimant Agency" },
                    ]}
                  >
                    <Input placeholder="Please enter Claimant Agency" allowClear/>
                  </Form.Item>
              </Form>
            </Modal>

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

export default ProductList;
