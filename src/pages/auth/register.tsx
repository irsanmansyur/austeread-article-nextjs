import useData from "@/commons/data";
import useUser from "@/commons/data/user-atom";
import { AppInterface } from "@/commons/interface/app";
import { InputCustom } from "@/components/form/InputGroup";
import SeoLayout from "@/layouts/seo-layout";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "@leecheuk/react-google-login";
import Link from "next/link";
import { ReactElement, useRef, useState } from "react";
import { NextPageWithLayout } from "../_app";
import ReCAPTCHA from "react-google-recaptcha";
import ButtonCustom from "@/components/form/button";
import AuthLayout from "@/layouts/auth-layout";
type Props = {};
const Page: NextPageWithLayout<Props> = ({ ...props }) => {
  const { post: postLoginForm, loading: loadingLogin } = useData<{ email?: string; fullname?: string; password?: string; message?: string }>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [data, setData] = useState<{ email?: string; fullname?: string; password?: string; message?: string }>();

  const loginForm = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(undefined);
    console.log(data);

    postLoginForm("auth", data)
      .then((res) => {
        if (res.data.message && res.data.message.includes("Incorrect")) setErrorMessage(res.data.message);
      })
      .catch((e) => {
        if (e.response.data.message) setErrorMessage(e.response.data.message);
      });
  };

  return (
    <SeoLayout title="Register Account Austeread" descrtiption="Register Account Austeread" className="my-4 w-full sm:max-w-md px-3">
      <div className="header flex items-center flex-col gap-3">
        <Link href="/" className="flex items-center mb-10 text-primary">
          <img className="" src="/icons/logo.austeread.gif" width="60px" />
          <span className="font-GarnettLight text-[29px]">auste</span>
          <span className="font-GarnettMedium text-[29px]">read</span>
        </Link>
        <h5 className="Garnett-medium font-GarnettMedium text-xl">Sign up an account </h5>
      </div>
      <div className="body py-10">
        <p>
          Already have an account ?
          <Link href="/auth/login" className="text-primary ml-2">
            Sign in
          </Link>
        </p>
        {errorMessage && <div className="flex justify-center items-center p-2 sm:p-4 text-white bg-red-500 rounded my-3">{errorMessage}</div>}
        <form action="" onSubmit={loginForm} className="py-5">
          <InputCustom onChange={(e) => setData({ ...data, fullname: e.target.value })} label="Fullname" placeholder="Enter your Fullname" />
          <InputCustom onChange={(e) => setData({ ...data, email: e.target.value })} label="Email" type={"email"} placeholder="Enter your email" className="bg-transparent" />
          <InputCustom onChange={(e) => setData({ ...data, password: e.target.value })} label="Password" placeholder="Enter your password" type={"password"} />
          <div>
            <ReCAPTCHA sitekey={"process.env.REACT_APP_SITE_KEY"} />
          </div>
          <div className="py-3">
            <ButtonCustom disabled={loadingLogin} type="submit" className="w-full">
              Register
            </ButtonCustom>
          </div>
        </form>
      </div>
    </SeoLayout>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout {...page.props}>{page}</AuthLayout>;
};
export default Page;
