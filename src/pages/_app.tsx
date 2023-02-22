import "@/styles/globals.css";
import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { AppInterface } from "@/commons/interface/app";
import axios from "axios";
import BaseLayout from "@/layouts/base-layout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

let configPropsCache: any;
let categoriesCache: any;
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  configProps: typeof configPropsCache;
  categories: typeof categoriesCache;
};

export default function MyApp({ Component, pageProps, configProps, categories = [] }: AppPropsWithLayout) {
  configPropsCache = configProps;
  categoriesCache = categories;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const layout = getLayout(<Component {...pageProps} configs={configProps} categories={categories} />);
  return <BaseLayout>{layout}</BaseLayout>;
}

MyApp.getInitialProps = async ({ ctx }: any) => {
  const cookies = ctx.req ? ctx.req.cookies : null;
  let user = null;
  if (cookies && cookies.token) {
    const token = (cookies.token as string).split(".")[1];
    try {
      user = JSON.parse(atob(token));
    } catch (error) {}
  }

  if (configPropsCache) {
    return { configProps: configPropsCache, categories: categoriesCache, user };
  }

  try {
    const { data } = await axios.get<{ data: AppInterface.Config }>(process.env.NEXT_PUBLIC_BASE_API + "config");
    const { data: categories } = await axios.get(process.env.NEXT_PUBLIC_BASE_API + "getAllCategory");
    configPropsCache = data;
    categoriesCache = categories;

    return { configProps: data, categories, user };
  } catch (error) {
    return { configProps: {}, categories: [], user };
  }
};
