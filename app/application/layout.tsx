"use client";
import GenericModal from "@/components/modal/GenericModal";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/stores/main-store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react"

export default function LayoutApp({ children }: { children: React.ReactNode }) {
   const { modal } = useMainStore();

   const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-foreground dark:text-primary h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Pets",
      href: "/application/pets",
      icon: (
        <IconUserBolt className="text-foreground dark:text-primary h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-foreground dark:text-primary h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-foreground dark:text-primary h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
    const [open, setOpen] = useState(false);

  return (
   <div
     className={cn(
        "rounded-md flex flex-col md:flex-row bg-muted dark:bg-muted w-full flex-1  mx-auto border dark:border-border overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >    
     <Sidebar open={open} setOpen={setOpen} animate={true} >
        <SidebarBody className="bg-muted justify-between gap-10 ">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        
        </SidebarBody>
      </Sidebar>
      <div className="dark:bg-background bg-background flex-1">
       {modal && <GenericModal>{useMainStore.getState().modal} </GenericModal>}
        {children}
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-foreground dark:bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-foreground dark:text-primary whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
}
