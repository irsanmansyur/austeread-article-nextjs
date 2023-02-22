import { ReactElement, useEffect, useState } from "react";
import PublicLayout from "@/layouts/public-layout";
import type { NextPageWithLayout } from "./_app";
import Banner from "@/components/banner";
import { AppInterface } from "@/commons/interface/app";
import TitleKategori from "@/components/title-kategori";
import ArticleCard from "@/components/article/article-card";
import Link from "next/link";
import SeoLayout from "@/layouts/seo-layout";
import DontMissThis from "@/components/article/dont-mist-this";
import ListGrapArticle from "@/components/article/list-grap-article";

type Props = { news: AppInterface.ArticleGroupKategori[] };
const Home: NextPageWithLayout<Props> = ({ news, ...props }) => {
  const [groupNews, setGroupNews] = useState<AppInterface.ArticleGroupKategoriCustom[]>([]);
  const [colsArt, setColsArt] = useState(3);
  useEffect(() => {
    const newGrb = news.map((newByKategori, iParent) => {
      const articlesSort: AppInterface.Article[][] = [];
      newByKategori.value.forEach((article, i) => {
        const keyMod = (i + 1) % colsArt;
        let ky = 0;
        if (keyMod == 2) ky = 1;
        else if (keyMod == 0) ky = 2;
        if (!articlesSort[ky]) articlesSort[ky] = [article];
        else articlesSort[ky].push(article);
      });
      return {
        articlesSort: articlesSort,
        category_name: articlesSort.length > 0 ? articlesSort[0][0].tbl_news_category_name : "",
      };
    });
    setGroupNews(newGrb);

    return () => {};
  }, [news, colsArt]);

  useEffect(() => {
    const handleResize = () => {
      setColsArt(window.innerWidth < 500 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);
  return (
    <SeoLayout title="Austeread Article" descrtiption="Selamat datang">
      <div>
        <div className="sm:max-w-[90%] sm:w-[729px] sm:my-10 mx-auto">
          <Banner />
        </div>
        {groupNews[0] && groupNews[0].articlesSort.length > 0 && (
          <div className="container all-article px-2 sm:px-0 py-5">
            <div className="articles-header">
              <TitleKategori text="What's on today" />
            </div>
            <div className="body">
              <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${colsArt}, minmax(0, 1fr))` }}>
                {groupNews[0].articlesSort.map((indexArticle, i) => {
                  return (
                    <div className="flex flex-col gap-4" key={i}>
                      {indexArticle.map((article) => {
                        return <ArticleCard key={article.id} article={article} />;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <DontMissThis />
        <div className="container py-10">
          {news.map((groupKategori, i) => {
            if (i == 0) return "";
            return (
              <div key={i} className="mb-10 border-b last:border-b-0">
                <div className="all-article px-2 sm:px-0">
                  <div className="articles-header">
                    <TitleKategori text={groupKategori.value[0]?.tbl_news_category_name ?? ""} />
                  </div>
                  <div className="articles-body mt-6">
                    <ListGrapArticle result={groupKategori.value} page={{ current_page: 1, last_page: 1, next_page: 1, previous_page: 1 }} />
                  </div>
                </div>
                <div className="text-center my-10">
                  <Link
                    href={"/news/category/" + groupKategori.value[0]?.tbl_news_category_name ?? ""}
                    className="outline-none bg-black rounded py-2 px-4 text-white hover:scale-105 duration-300"
                  >
                    View all {groupKategori.value[0]?.tbl_news_category_name ?? ""} Article
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SeoLayout>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};

// This gets called on every request
export async function getServerSideProps() {
  const news = await fetch(process.env.BASE_LOCAL_API + "article-home")
    .then((res) => res.json())
    .catch((e) => {
      console.log("e");
      return [];
    });
  return { props: { news: news } };
}
export default Home;
