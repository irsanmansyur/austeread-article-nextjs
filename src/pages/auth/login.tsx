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
  const { setUser } = useUser();
  const captchaRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { post: postLoginForm, loading: loadingLogin, data: dataLoginRespon } = useData<AppInterface.User & { message?: string }>();
  const [data, setData] = useState<{ register_method?: number; email?: string; password?: string }>();
  const handleLogin = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  };

  const loginForm = (e: React.FormEvent) => {
    e.preventDefault();

    // @ts-ignore
    const token = captchaRef?.current?.getValue();
    if (!token) return setErrorMessage("Google Captcha not valid");

    setErrorMessage(undefined);
    postLoginForm("auth", { ...data, captcha_token: token })
      .then((res) => {
        if (res.data.message && res.data.message.includes("Incorrect")) setErrorMessage(res.data.message);
        setUser(res.data);
      })
      .catch((e) => {
        if (e.response.data.message) setErrorMessage(e.response.data.message);
      });
  };

  return (
    <SeoLayout title="Login Austeread" descrtiption="Welcome user" className="my-4 w-full sm:max-w-md px-3">
      <div className="header flex items-center flex-col gap-3">
        <Link href="/" className="flex items-center mb-10 text-primary">
          <img className="" src="/icons/logo.austeread.gif" width="60px" />
        </Link>
        <h5 className="Garnett-medium font-GarnettMedium text-xl">Sign in into your account</h5>
      </div>
      <div className="body py-10">
        <p>
          New user?
          <Link href="/auth/register" className="text-primary ml-2">
            Create an account
          </Link>
        </p>
        {errorMessage && <div className="flex justify-center items-center p-2 sm:p-4 text-white bg-red-500 rounded my-3">{errorMessage}</div>}
        <form action="" method="post" onSubmit={loginForm} className="py-5">
          <InputCustom onChange={(e) => setData({ ...data, email: e.target.value })} label="Email" placeholder="Enter your email" className="bg-transparent" />
          <InputCustom onChange={(e) => setData({ ...data, password: e.target.value })} label="Password" placeholder="Enter your password" type={"password"} />
          <div>
            <ReCAPTCHA ref={captchaRef} sitekey={process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY ?? ""} />
          </div>
          <div className="py-3">
            <ButtonCustom disabled={loadingLogin} type="submit" className="w-full" onClick={(e) => setData({ ...data, register_method: 0 })}>
              Submit
            </ButtonCustom>
          </div>
          <div className="text-center PublicSans-regular gap-2 relative flex items-center" style={{ marginTop: 20, marginBottom: 20, fontSize: 14, fontWeight: 600 }}>
            <div className="bg-black rounded w-full h-[2px]"></div>
            <span className="whitespace-nowrap">Or Sign in With</span>
            <div className="bg-black rounded w-full h-[2px]"></div>
          </div>
          <GoogleLogin
            disabled={loadingLogin}
            className="w-full flex justify-center"
            clientId={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_ID ?? ""}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </form>
      </div>
    </SeoLayout>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout {...page.props}>{page}</AuthLayout>;
};
export default Page;
