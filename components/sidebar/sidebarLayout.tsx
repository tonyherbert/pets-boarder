import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaBars } from "react-icons/fa";
import { PiDogBold } from "react-icons/pi";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";
import usePetStore from "@/stores/pet-store";
import { fetchAndSetPets } from "@/dataManager/petDataManager";
import Button from "../button/Button";
import { Logout } from "@/services/auth/auth_service";
import { useRouter } from "next/navigation";
import "./sidebar.scss"

const SidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [toggled, setToggled] = useState(false);
  const isSmallDevice = useMediaQuery(600);

  const { pets} = usePetStore();

  const handleToggleSidebar = () => {
    setToggled(!toggled);
    setCollapsed(false);
  };
 const router = useRouter();
  async function handleLogout() {
    const result = await Logout();
    if (!result.error) router.push("/login");
  }

  useEffect(() => {
   fetchAndSetPets();
  }, []);

  useEffect(() => {
    if (!isSmallDevice) {
      setToggled(false);
    }
  }, [isSmallDevice]);

  const hoverStyles = {
    ["." + menuClasses.button]: {
      "&:hover": {
        color: "#b6c8d9",
        backgroundColor: "#445d76 !important",
      },
    },
    ["." + menuClasses.subMenuContent]: {
      backgroundColor: "transparent !important",

      "&:hover": {
        color: "#b6c8d9",
        backgroundColor: "#445d76 !important",
      },
    },
  };

  return (
    <React.Fragment>
      {isSmallDevice && (
        <button
          className="mb-auto mt-5 ml-5 absolute z-1"
          onClick={handleToggleSidebar}
        >
          <FaBars />
        </button>
      )}
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        customBreakPoint="600px"
        backgroundColor="#282828"
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
          <MenuItem rootStyles={hoverStyles} icon={<AiOutlineDashboard />}>
            Dashboard
          </MenuItem>
          
                <MenuItem href={`/application/pets`} rootStyles={hoverStyles} icon={<PiDogBold />}>
                My Pets
                </MenuItem>
          <MenuItem rootStyles={hoverStyles} icon={<CiSettings />}>
            Settings
          </MenuItem>
        </Menu>
        <footer className="footer">        
          <Button onClick={handleLogout}>Logout</Button>
        </footer>
      </Sidebar>
    </React.Fragment>
  );
};

export default SidebarLayout;
