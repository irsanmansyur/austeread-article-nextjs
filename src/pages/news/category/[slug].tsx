import Image from "next/image";
import { ReactElement, useEffect, useRef } from "react";
import PublicLayout from "@/layouts/public-layout";
import Banner from "@/components/banner";
import { AppInterface } from "@/commons/interface/app";
import Link from "next/link";
import { urlAsset } from "@/commons/helpers";
import IconCopy from "@/components/article/icon-copy";
import CommentParent from "@/components/article/commen-parent";
import { textHtmlBersih } from "@/commons/helpers/text";
import SeoLayout from "@/layouts/seo-layout";
import useAxios from "axios-hooks";
import axios from "axios";
import RelatedArticle from "@/components/article/related-article";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import CalenderArchive from "@/components/article/calender-archive";
import ListGrapArticle from "@/components/article/list-grap-article";
import ButtonCustom from "@/components/form/button";

type Props = {
  news: {
    page: { current_page: number; first_page: number; next_page: number; last_page: number; previous_page: number };
    result: AppInterface.Article[];
  };
};
const Page: NextPageWithLayout<Props> = ({ news }) => {
  const { query, push } = useRouter();

  return (
    <SeoLayout title={`News by ${query.slug}`} descrtiption={`List news latter by  ${query.slug}`}>
      <div className="container py-10">
        <div className="all-article px-2 sm:px-0">
          <div className="articles-header">
            <h1 className="font-PublicSansMedium text-center text-[32px] font-bold">
              <span className="whitespace-nowrap title relative">{query.slug}</span>
            </h1>
          </div>
          <div className="sm:w-3/4 flex justify-between sm:justify-end my-10">
            <form className="flex gap-4 sm:w-2/3 mr-[13px]">
              <input placeholder="Search on Economy" name="search" className="outline-none border rounded-sm py-1 px-4 w-full" />
              <ButtonCustom type="submit" className="bg-black text-light rounded px-2 ">
                Search
              </ButtonCustom>
            </form>
          </div>
          <div className="flex justify-center flex-col sm:flex-row gap-4">
            <div className="sm:w-3/4">
              <div className="articles-body mt-6">
                <ListGrapArticle page={news.page} result={news.result} />
              </div>
            </div>
            <div className="sm:w-1/4 space-y-6">
              <Banner />
              <CalenderArchive
                onChange={(v) => {
                  let url = "/news/category/" + query.slug;
                  push({
                    pathname: url,
                    query: { ...(query.search && { search: query.search }), tanggal: `${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()}` },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </SeoLayout>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};

// This gets called on every request
export async function getServerSideProps({ params, query }: any) {
  const { data } = await axios(process.env.BASE_LOCAL_API + "article", { params: { ...(query.tanggal && { tanggal: query.tanggal }), category: params.slug, limit: 9 } });
  return { props: { news: data } };
}
export default Page;
