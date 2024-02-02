import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Row, Col, Image,Space,Typography,Modal,Button,Form,DatePicker} from 'antd';

import AppstoreFilledIcon from '@ant-design/icons/AppstoreFilled';
import { CollapseType } from 'antd/lib/layout/Sider';

import {
  PlusOutlined
} from "@ant-design/icons";
import logo from '../../assets/toto-logo-banner.png';

import DynamicMenu from '../DynamicMenu';
import UserProfile from '../UserProfile';
import Error404 from '../../pages/Error404';

import '../../pages/Main/Main.css'
import '../../pages/Main/Main.css'
import './Template.css';
import FirstPage from "../../pages/FirstPage";

const Template: React.FC<any> = ({ children, listSubMenu, mainMenuId }) => {

  console.log('ddd =',listSubMenu);
  const { Title } = Typography;
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

  const navigate = useNavigate();
  const url = useParams();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openKey, setOpenKey] = useState<string[]>([]);
  const [bread, setBread] = useState<string[]>([]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const setDefaultRouteMenu = () => {
    if (url['*'] === '') {
      setOpenKey(['']);
      setBread(['Dashboard']);
    } else {
      const urlMenu = listSubMenu.filter((value: any) => value.MenuId === url['*']);

      const arrayRoute = urlMenu[0]?.Route.split('.').filter((value: any) => parseInt(value) !== 0);

      let arrayKey: string[] = [];
      let arrayBread: string[] = [];

      arrayRoute?.forEach((element: any) => {
        const menu = listSubMenu.filter((value: any) => value.Menu_Index === parseInt(element));

        if (menu[0].MenuTypeId !== 'PRM' && menu[0].MenuTypeId !== 'PUM') {
          arrayKey.push(menu[0].MenuId);
          arrayBread.push(menu[0].MenuName);
        }
      });

      setOpenKey(arrayKey);
      setBread(arrayBread);
    }
  };
  
  useEffect(() => {
    setDefaultRouteMenu();
  }, [url]);



  return (
    <>
    
        
          
        
      <Layout style={{ minHeight: '100vh' }}>
        
        <Layout className="site-layout-template">
        <div className="bg-pk-template bg-login">
          <Header className="site-layout-background-template" style={{ padding: 0,background: "#165292" }}>
            <Row className="min-w-[300px]">
              <Col flex={1} className="flex items-center pr-3">
                <UserProfile mode="main" />
              </Col>
              <Col className="flex items-center">
                <Image src={logo} preview={false} style={{ width: 150 }} />
              </Col>
              <Col flex={1} className="flex justify-end items-center">
                <span className="ant-dropdown-link cursor-pointer" onClick={(e) => e.preventDefault()} style={{paddingRight:30}}>
                <Link to={`${import.meta.env.VITE_APP_PUBLIC_URL}${`/RegisterProduct`}`}>
                  <PlusOutlined style={{  color: '#fff' }}/>
                </Link>
              </span>
              </Col>
              
            </Row>
          </Header>
            <Content className="m-[0px_16px]">
              <div >
                <FirstPage></FirstPage>;
              </div>
          </Content>
          </div>
        </Layout>
        
      </Layout>

      
      
      
    </>
  );
};

export default Template;
