import Image from "next/image";
import { ReactElement } from "react";
import PublicLayout from "@/layouts/public-layout";
import Banner from "@/components/banner";
import { AppInterface } from "@/commons/interface/app";
import Link from "next/link";
import { urlAsset } from "@/commons/helpers";
import { NextPageWithLayout } from "../_app";
import IconCopy from "@/components/article/icon-copy";
import { textHtmlBersih } from "@/commons/helpers/text";
import SeoLayout from "@/layouts/seo-layout";
import useAxios from "axios-hooks";
import axios from "axios";
import RelatedArticle from "@/components/article/related-article";
import LikeArticle from "@/components/article/like-article";
import CommentArticle from "@/components/article/comment/comment";
import { useAuth } from "@/contexts/auth";

type Props = { article: AppInterface.Article };
const Home: NextPageWithLayout<Props> = ({ article }) => {
  // mengambil data commentar
  const [{ data: commentsData, loading: commentLoading }] = useAxios<{ data: any[] }>(`comment/${article.id}`);
  const [{ data: latestArticles, loading: loadLatest }] = useAxios<AppInterface.Article[]>({
    url: "getlatestNews",
  });

  return (
    <SeoLayout title={article.title} descrtiption={article.desc}>
      {article.id && (
        <div className="container flex flex-col sm:flex-row sm:py-6 gap-10 sm:px-0 px-2">
          <div className="sm:w-4/6">
            <div className="article-page">
              <div className="article-page-header">
                <div className="-mx-2 sm:hidden mb-2">
                  <Image
                    alt={article.title}
                    width={200}
                    height={200}
                    style={{ height: "auto", width: "auto" }}
                    className="sm:!hidden !w-full"
                    src={urlAsset("img/upload/" + article.img)}
                  />
                </div>
                <small className="text-sm font-[400] italic">{`${article.tbl_news_category.name} | ${article.createdAt}`}</small>
                <h1 className="text-4xl font-Garnett-Medium leading-normal py-2">{article.title}</h1>
                <small className="text-xs text-gray-700 font-[400]">Write by {`${article.tbl_user.first_name}  ${article.tbl_user.last_name}`}</small>
              </div>
              <div className="article-page-body font-PublicSansLight text-sm leading-7 pt-10  text-gray-600">
                <Banner />
                <div dangerouslySetInnerHTML={{ __html: textHtmlBersih(article.desc) }} />
              </div>
              <div className="article-page-footer py-5">
                <div className="flex justify-between items-end">
                  <LikeArticle article={article} />
                  <div className="">
                    <h6 className="PublicSans-regular">Share :</h6>
                    <div className="flex gap-2">
                      <IconCopy />
                      <a href="#">
                        <Image width={20} height={20} className="!w-auto !h-auto" alt={"facebook icon"} src="/icons/icon_facebook.png" />
                      </a>
                      <a href="#">
                        <Image width={20} height={20} className="!w-auto !h-auto" alt="twitter icon" src="/icons/icon_twitter.png" />
                      </a>
                      <a href="#">
                        <Image width={20} height={20} className="!w-auto !h-auto" alt="whatsapp icon" src="/icons/icon_whatsapp.png" />
                      </a>
                    </div>
                  </div>
                </div>
                <hr className="my-6" />
                <CommentArticle article={article} />
              </div>
            </div>
          </div>
          <div className="sm:w-2/6">
            <Image width={200} height={200} alt="a" className="!img-fluid hidden sm:block !w-full" src={urlAsset("img/upload/" + article.img)} />
            <div className="my-2">
              <Banner />
            </div>
            <div className="latest-article py-10">
              <h3 className="text-2xl text-center pb-4">The Latest</h3>
              <ul className="flex gap-3 flex-col">
                {!loadLatest &&
                  latestArticles &&
                  latestArticles.map((articleLates, i) => {
                    return (
                      <li key={i} className="bg-gray-100 -mx-2 px-2 py-1">
                        <div className="mb-2">
                          <small className="relative font-PublicSansBoldItalic after:absolute after:-bottom-2 after:bg-primary after:left-0  after:w-10/12 after:h-[2px]">
                            {`${articleLates.tbl_news_category.name} | ${articleLates.createdAt}`}
                          </small>
                        </div>
                        <Link href={`/news/${articleLates.id}`}>
                          <h6 className="text-[16px] leading-5 text-dark font-PublicSansLight">{articleLates.title}</h6>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-100 py-10">
        <div className="container px-2 sm:px-0">
          <div className="all-article">
            <div className="articles-header">
              <h1 className="font-PublicSansMedium text-center text-[32px] font-bold">
                <span className="whitespace-nowrap title relative">Related Article</span>
              </h1>
            </div>
            <div className="articles-body mt-6">
              <RelatedArticle category={{ name: article.tbl_news_category.name }} />
            </div>
          </div>
        </div>
      </div>
    </SeoLayout>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};

// This gets called on every request
export async function getServerSideProps({ params }: any) {
  const { data } = await axios("getNews/" + params.id);
  return { props: { article: data } };
}
export default Home;
