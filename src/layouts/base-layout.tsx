import Loader from "@/components/loader";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import LRU from "lru-cache";
import axios from "axios";
import { configure } from "axios-hooks";
import { useCookies } from "react-cookie";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API;

export default function BaseLayout({ children }: any) {
  const [cookies] = useCookies(["token"]);
  const bearer = "Bearer " + cookies.token;

  const axx = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
  });
  const cache = new LRU({ max: 10 });
  configure({ axios: axx, cache });

  const [isLoading, setIsLoading] = useState(false);
  const mainMenu = typeof document != "undefined" ? document.querySelector("#main-menu") : null;

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      mainMenu && mainMenu.scrollTo({ top: 0, behavior: "smooth" });
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, [Router]);
  return (
    <RecoilRoot>
      {isLoading && <Loader />}
      {children}
    </RecoilRoot>
  );
}
