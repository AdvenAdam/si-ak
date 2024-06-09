import Header from "@/Components/layout/header";
import Sidebar from "@/Components/layout/sidebar";
import { Toaster } from "@/Components/ui/toaster";
import { useUserStore } from "@/hooks/useUser";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Authenticated({ user, children }) {
  useEffect(() => {
    useUserStore.setState({ user });
  }, [user]);

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/logo/logo.svg"
        />
      </Head>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 pt-16">{children}</main>
      </div>
      <Toaster />
    </>
  );
}
