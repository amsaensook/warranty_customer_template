import Setting from "../../pages/Setting";
import User from "../../pages/User";
import Group from "../../pages/Group";
import Error404 from "../../pages/Error404";
import JobPacking from "../../pages/JobPacking";

const DynamicMenu: React.FC<any> = (props) => {
  const menu: any = {
    Setting: <Setting {...props} />,
    User: <User {...props} />,
    Group: <Group {...props} />,
    JobPacking: <JobPacking {...props} />,

  };

  return menu[props.MenuId] || <Error404 />;
};

export default DynamicMenu;

// Note : set menu name to dynamic menu
