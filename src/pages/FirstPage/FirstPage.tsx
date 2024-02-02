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
  Alert, 
  Spin, 
  Switch,
  Avatar, 
  List, 
  Steps,
  Card,
  Tag
} from "antd";
import type { StepsProps } from 'antd';
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
import { useProductListWarranty } from "../../hooks/useProductListWarranty";
import { useSelector } from "react-redux";
import { selectAuth } from "../../contexts/slices/authSlice";

import logo from "../../assets/toto-logo-banner.png";
import logo2 from "../../assets/toto-logo-login2.png";
import "./FirstPage.css";


const FirstPage: React.FC = () => {
  const { Title } = Typography;
  const { Header, Content } = Layout;

  const { isLoading, isError, error, status, mutate } = useAuthLogin();
  const { authResult } = useSelector(selectAuth);
  const navigate = useNavigate();
  const { Option } = Select;
  const [product, setProduct] = useState<any>([]);
  
  // const [cookies, setCookie] = useCookies(["username", "password"]);
 
  

  const {
    data: ProductList,
    status: ProductListStatus,
    error: ProductListError,
    mutate: getProductList,
  } = useProductListWarranty();

  useEffect(() => {
    getProductList(authResult.data.id)
  }, []);


  useEffect(() => {
    if (ProductListStatus === "success") {
      console.log('Hello =',ProductList?.data.data);

      setProduct(ProductList?.data.data || []);

    } else if (ProductListStatus === "error") {
      message.error(ProductListError?.response?.data?.message || ProductListError.message);
    }
  }, [ProductListStatus]);

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, 'I was closed.');
  };
  const valueToPass = 'Hello, World!';

  return (
    <>
      
      <div>
      <Content>
            <Alert
              message="คำแนะนำ"
              description="ลงทะเบียนรับประกันสินค้าสามารถกดปุ่ม + ที่มุมด้านบนขวา"
              type="warning"
              showIcon
              closable
              onClose={onClose}
            />
            <Title
              style={{
                fontWeight: "bold",
                marginTop: 7,
                marginBottom: 15,
                color: "rgba(255,255,255,1)",
              }}
              level={5}
              className="font-sans text-left"
            >
              รายการสินค้าของคุณ
            </Title>
          <List 
            
            grid={{ gutter: 16, column: 1 }}
            dataSource={product}
            renderItem={(item:any) => (

              <List.Item>
                <Link to={`${import.meta.env.VITE_APP_PUBLIC_URL}${`/ProductList?ID=${item.Warranty_Index}`}`} >
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
                        {item.Serial_No}
                      </Title>
                        
                      </Col>
                      <Col span={5}>
                        <Tag color={item.Color_tag}>{item.Warranty_Expires}</Tag>
                      </Col>
                    </Row>
                    <Row gutter={24} style={{marginTop:1}}>
                      <Col span={19}>
                        {item.Product_Code}
                      </Col>
                    </Row>
                    <Row gutter={24} style={{marginTop:5}}>
                      <Col span={20}>
                        Warranty expiration date : {item.Date_Warranty_Expires1}
                      </Col>
                    </Row>
                  </Card>
                </Link>
              </List.Item>
            )}
          />,
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

export default FirstPage;
