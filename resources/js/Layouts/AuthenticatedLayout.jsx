import { useEffect, useState } from "react";

import Header from "@/Components/layout/header";
import { useUserStore } from "@/hooks/useUser";
import Sidebar from "@/Components/layout/sidebar";

export default function Authenticated({ user, children }) {
  useEffect(() => {
    useUserStore.setState({ user });
  }, [user]);

  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </>
  );
}
