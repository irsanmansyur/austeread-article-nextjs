import "@/styles/globals.css";
import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import BaseLayout from "@/layouts/base-layout";
import { AuthProvider } from "@/contexts/auth";
import Head from "next/head";
import api from "@/api";
import { AppInterface } from "@/commons/interface/app";
import { AxiosError } from "axios";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  requiresAuth?: boolean;
  redirectUnauthenticatedTo?: string;
};

let configsPropsCache: any;
let categoriesCache: any;
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  configs: typeof configsPropsCache;
  categories: typeof categoriesCache;
};

export default function MyApp({ Component, pageProps, configs, categories = [] }: AppPropsWithLayout) {
  configsPropsCache = configs;
  categoriesCache = categories;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const layout = getLayout(<Component {...pageProps} configs={configs} categories={categories} />);
  return (
    <>
      {Component.requiresAuth && (
        <Head>
          <script
            // If no token is found, redirect inmediately
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
            {location.replace(
              "/auth/login?next=" +
                encodeURIComponent(location.pathname + location.search)
            )}
            else {document.documentElement.classList.add("render")}`,
            }}
          />
        </Head>
      )}
      <AuthProvider categories={categories} configs={configs}>
        <BaseLayout>{layout}</BaseLayout>
      </AuthProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }: any) => {
  let configs = {},
    categories = [];
  try {
    if (!configsPropsCache || Object.keys(configsPropsCache).length < 1) {
      const { data: configsData } = await api.get<{ data: AppInterface.Config }>("config");
      configs = configsData;
    }
    if (!categoriesCache || categories.length < 1) {
      const { data: categoriesData } = await api.get("getAllCategory");
      categories = categoriesData;
    }
  } catch (error) {
    const err = error as AxiosError;
    console.log("Initial page error : ", err.message);
  }
  return { configs, categories };
};
