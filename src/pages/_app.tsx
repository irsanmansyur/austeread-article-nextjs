import "@/styles/globals.css";
import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { AppInterface } from "@/commons/interface/app";
import { configure } from "axios-hooks";
import LRU from "lru-cache";
import axios from "axios";
import BaseLayout from "@/layouts/base-layout";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API;
const axx = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
});
const cache = new LRU({ max: 10 });
configure({ axios: axx, cache });

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

MyApp.getInitialProps = async () => {
  if (configPropsCache) {
    return { configProps: configPropsCache, categories: categoriesCache };
  }

  const { data } = await axios.get<{ data: AppInterface.Config }>("config");
  const { data: categories } = await axios.get("getAllCategory");

  configPropsCache = data;
  categoriesCache = categories;

  return { configProps: data, categories };
};
