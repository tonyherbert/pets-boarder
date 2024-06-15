import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaBars } from "react-icons/fa";
import "./sidebar.module.scss";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PiDogBold } from "react-icons/pi";

const SidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const isSmallDevice = useMediaQuery(600);
  const handleToggleSidebar = () => {
    setToggled(!toggled);
    setCollapsed(false);
  };

  useEffect(() => {
    if (!isSmallDevice) {
      setToggled(false);
    }
  }, [isSmallDevice]);

  return (
    <React.Fragment>
      {isSmallDevice && (
        <button className="mb-auto mt-5 ml-5" onClick={handleToggleSidebar}>
          <FaBars />
        </button>
      )}
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        customBreakPoint="600px"
        backgroundColor="#131B2D"
      >
        <header className="flex items-center justify-center justify-evenly p-4">
          {!isSmallDevice && (
            <React.Fragment>
              {collapsed ? (
                <FaAngleDoubleRight
                  className="cursor-pointer"
                  onClick={() => setCollapsed(!collapsed)}
                />
              ) : (
                <React.Fragment>
                  <span>Pets Boarder</span>
                  <FaAngleDoubleLeft
                    className="cursor-pointer "
                    onClick={() => setCollapsed(!collapsed)}
                  />
                  <hr />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </header>
        <Menu>
          <MenuItem icon={<AiOutlineDashboard />}>Dashboard</MenuItem>
          <MenuItem icon={<PiDogBold />}>Pets</MenuItem>

          {/* <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu> */}
          <MenuItem icon={<CiSettings />}>Settings</MenuItem>
        </Menu>
      </Sidebar>
    </React.Fragment>
  );
};

export default SidebarLayout;
