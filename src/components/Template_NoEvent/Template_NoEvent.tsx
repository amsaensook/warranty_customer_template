import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Row, Col, Image,Space,Typography,} from 'antd';

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
import './Template_NoEvent.css';

const Template_NoEvent: React.FC<any> = () => {
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




  return (
    <>
    
        
          
        
      <Layout style={{ minHeight: '100vh' }}>
        
        <Layout className="site-layout-template">
        <div className="bg-pk-template bg-login">
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
          <Content className="m-[0px_16px]">
          </Content>
          </div>
        </Layout>
        
      </Layout>
      
    </>
  );
};

export default Template_NoEvent;
