import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Space, Dropdown, Typography, Menu } from "antd";
import {
  UserOutlined,
  DownOutlined,
  ProfileOutlined,
  LogoutOutlined,
  MenuOutlined
} from "@ant-design/icons";

import { setAuth, selectAuth } from "../../contexts/slices/authSlice";

import "./UserProfile.css";

const UserProfile : React.FC<any> = (props) => {
  const { Text } = Typography;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authResult } = useSelector(selectAuth);

  const handleSignOut = () => {
    dispatch(setAuth({}));
    navigate(`${import.meta.env.VITE_APP_PUBLIC_URL}/`);
  };

  const menuUser = (
    <Menu>
      <Menu.Item
        key={1}
        icon={<UserOutlined />}
      >
        {`${authResult?.data?.FirstName} ${authResult?.data?.LastName}`}
      </Menu.Item>
      <Menu.Item
        key={2}
        icon={<LogoutOutlined />}
        danger
        onClick={handleSignOut}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuUser} trigger={['click']} placement={"bottom"} >
      <span className="ant-dropdown-link cursor-pointer" onClick={(e) => e.preventDefault()} style={{paddingLeft:30}}>
          <MenuOutlined style={{  color: '#fff' }}/>
      </span>
    </Dropdown>
  );
};

export default UserProfile;
