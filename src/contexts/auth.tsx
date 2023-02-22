import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Router, { useRouter } from "next/router";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Loader from "@/components/loader";
//api here is an axios instance which has the baseURL set according to the env.
import api from "@/api";
import { AppInterface } from "@/commons/interface/app";

export type LoginType = {
  email: string;
  password: string;
  token: string;
  register_method?: number;
};

type authContextType = {
  user?: AppInterface.User;
  login: (data: LoginType) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  configs?: AppInterface.Config;
  categories?: AppInterface.Kategori[];
};
const authContextDefaultValues: authContextType = {
  loading: true,
  isAuthenticated: false,
  login: (data) => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

type Props = {
  children: ReactNode;
  configs?: AppInterface.Config;
  categories?: AppInterface.Kategori[];
};
export const AuthProvider = ({ children, categories, configs }: Props) => {
  const [user, setUser] = useState<AppInterface.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const tokenJwt = getCookie("token") as string | null;
      if (tokenJwt) {
        console.log("Got a token in the cookies, let's see if it is valid");
        api.defaults.headers.Authorization = `Bearer ${tokenJwt}`;

        const token = (tokenJwt as string).split(".")[1];
        try {
          const user = JSON.parse(atob(token)) as AppInterface.User;
          setUser({ ...user, token: tokenJwt });
        } catch (error) {
          deleteCookie("token");
          setUser(null);
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async ({ email, password, token, register_method = 1 }: LoginType) => {
    const { data, status } = await api.post("login", { email, password, captcha_token: token, register_method });

    if (status > 300 && !data.token) return;

    if (data.token) {
      console.log("Got token");
      setCookie("token", data.token, {
        maxAge: 60 * 60 * 12,
      });

      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      const tokenBase64 = (data.token as string).split(".")[1];

      const userJson = JSON.parse(atob(tokenBase64));
      setUser({ ...userJson, token: data.token });
      console.log("Got user", user);
    }
  };

  const logout = () => {
    deleteCookie("token");
    setUser(null);
    delete api.defaults.headers.Authorization;
    window.location.pathname = "/auth/login";
  };

  // @ts-ignore
  return <AuthContext.Provider value={{ isAuthenticated: !!user, configs, categories, user, login, loading, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: any) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading || (!isAuthenticated && window.location.pathname !== "/auth/login")) {
    return <Loader />;
  }
  return children;
};
