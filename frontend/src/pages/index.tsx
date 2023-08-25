import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { cookies } from "next/headers";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const route = useRouter();
  // const cookieStore = cookies();
  React.useEffect(() => {
    // let token = cookieStore.get("token");
    let token = localStorage.getItem("token");
    if (!token) route.push("/login");
    else {
      const role = localStorage.getItem("role");
      if (!role) route.push("/login");
      else if (role == "Client") route.push("/users");
      else route.push("/admin");
    }
  }, []);
  return <></>;
}
