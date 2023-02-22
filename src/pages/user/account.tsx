import ProfileUser from "@/components/user/profile-user";
import PublicLayout from "@/layouts/public-layout";
import React, { ReactElement, useState } from "react";
import SeoLayout from "@/layouts/seo-layout";
import { useAuth } from "@/contexts/auth";

export default function PageAccount() {
  const [show, setShow] = useState<"account">("account");
  const { user, loading } = useAuth();

  return (
    <SeoLayout title={`Profile User`} descrtiption={`Halaman pencarian article`} className="py-10 space-y-10  px-3 sm:px-0 sm:w-[323px] mx-auto">
      <div className="flex justify-center gap-3 font-GarnettBold font-bold text-gray-normal">
        <button className={`flex whitespace-nowrap ${show == "account" ? "text-dark" : ""}`} onClick={() => setShow("account")}>
          My Account
        </button>
      </div>
      {show == "account" && user && <ProfileUser user={user} />}
    </SeoLayout>
  );
}

PageAccount.requiresAuth = true;
PageAccount.redirectUnauthenticated = "/auth/login";
PageAccount.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};
