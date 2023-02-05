import NotFound from "@/components/error/not-found";
import PublicLayout from "@/layouts/public-layout";
import SeoLayout from "@/layouts/seo-layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

type Props = {};
const Page: NextPageWithLayout<Props> = ({ ...props }) => {
  return (
    <SeoLayout title="Austeread Article" descrtiption="Selamat datang">
      <NotFound />
    </SeoLayout>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};
export default Page;
