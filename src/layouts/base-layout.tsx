import Loader from "@/components/loader";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";

export default function BaseLayout({ children }: any) {
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
      <CookiesProvider>{children}</CookiesProvider>
    </RecoilRoot>
  );
}
