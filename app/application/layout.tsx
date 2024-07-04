"use client";
import GenericModal from "@/components/modal/GenericModal";
import SidebarLayout from "@/components/sidebar/sidebarLayout";
import { useMainStore } from "@/stores/main-store";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const { modal } = useMainStore();
  return (
    <div className="relative flex h-screen">
      <SidebarLayout />
      <main className="container relative mx-auto max-w-7xl px-16 flex-grow pt-16 overflow-auto max-w-none">
        {modal && <GenericModal>{useMainStore.getState().modal} </GenericModal>}
        {children}
      </main>
      {/* <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">NextUI</p>
          </Link>
        </footer> */}
    </div>
  );
}
