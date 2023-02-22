import { useState } from "react";
import { useRecoilState } from "recoil";
import { AppInterface } from "../interface/app";
import { UserInfoAtom } from "./layoutAtom";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

export default function useUser() {
  const [user, setUser] = useRecoilState(UserInfoAtom);
  const [loading, setLoading] = useState(false);
  const tokenJwt = getCookie("token");

  const updateUser = (user: AppInterface.User) => {
    setUser(user);
    setCookie("token", user.token, {
      maxAge: 60 * 60 * 12,
    });
  };
  const logoutUser = () => {
    setCookie("token", "", {
      maxAge: 0,
    });

    deleteCookie("token", {
      sameSite: "none",
    });
    setUser(null);
  };

  const setUserByToken = (tokenJwt: string) => {
    setLoading(true);
    const token = (tokenJwt as string).split(".")[1];
    try {
      const user = JSON.parse(atob(token));
      setUser({ ...user, token: tokenJwt });
    } catch (error) {
      deleteCookie("token");
      setUser(null);
    }
    setLoading(false);
  };

  if (!user && loading == false && tokenJwt) setUserByToken(tokenJwt + "");

  return { user, setUser: updateUser, loading, logoutUser };
}
