import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { useCookies } from "react-cookie";

const [cookies] = useCookies(["token"]);
const bearer = "Bearer " + cookies.token;

export const useAxiosCustom = makeUseAxios({
  axios: axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
  }),
});
