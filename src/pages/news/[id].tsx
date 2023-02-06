import Image from "next/image";
import { ReactElement, useRef } from "react";
import PublicLayout from "@/layouts/public-layout";
import Banner from "@/components/banner";
import { AppInterface } from "@/commons/interface/app";
import Link from "next/link";
import { urlAsset } from "@/commons/helpers";
import { NextPageWithLayout } from "../_app";
import IconCopy from "@/components/article/icon-copy";
import CommentParent from "@/components/article/commen-parent";
import { textHtmlBersih } from "@/commons/helpers/text";
import SeoLayout from "@/layouts/seo-layout";
import useAxios from "axios-hooks";
import axios from "axios";
import RelatedArticle from "@/components/article/related-article";

type Props = { article: AppInterface.Article };
const Home: NextPageWithLayout<Props> = ({ article }) => {
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
                  <div className="inline-flex items-center gap-2 text-gray-600">
                    <div className="p-3 bg-gray-200 rounded-full">
                      <Image width={20} height={20} className="!w-auto !h-auto" alt="path_ek26" src="/icons/like.png" />
                    </div>
                    {article.like} Likes
                  </div>
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
                <div id="comments">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments (20)</h2>
                  </div>
                </div>
                <form className="mb-6">
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows={6}
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                      placeholder="Write a comment..."
                      required
                      defaultValue={""}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-primary/80"
                  >
                    Post comment
                  </button>
                </form>
                <CommentParent />
                <CommentParent />
                <CommentParent />
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
