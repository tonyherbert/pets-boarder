import React, { useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

interface MenuWeightProps {
  onMenuItemClick: (item: string) => void;
}

// Define the component as a React.FC with the defined props
const MenuWeight: React.FC<MenuWeightProps> = ({ onMenuItemClick }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>('Table');

  const handleMenuItemClick = (item: string) => {
    setSelectedMenu(item);
    onMenuItemClick(item);
  };

  return (
    <div className="w-fit mx-auto">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>view</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => handleMenuItemClick('Table')}>
              Table
            </MenubarItem>
            <MenubarItem onClick={() => handleMenuItemClick('Trend graph')}>
              Trend graph
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>tool</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => handleMenuItemClick('Increase calculator')}
            >
              Increase calculator
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default MenuWeight;
