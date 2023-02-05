import useData from "@/commons/data";
import { scrollInfoAtom } from "@/commons/data/layoutAtom";
import useOnScreen from "@/commons/hooks";
import { AppInterface } from "@/commons/interface/app";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import ButtonCustom from "../form/button";
import ArticleCard from "./article-card";

type Props = {
  page: { current_page: number; first_page?: number; next_page: number; last_page: number; previous_page: number };
  result: AppInterface.Article[];
};
export default function ListGrapArticle({ result: articles, page: pg }: Props) {
  const [groupArticles, setgroupArticles] = useState<AppInterface.Article[][]>([]);
  const [colsArticles, setColsArticles] = useState(3);
  const [penampungArticles, setPenampungArticles] = useState<AppInterface.Article[]>([]);
  const { data, get, loading } = useData<Props>();
  const [page, setPage] = useState(pg);
  const { query } = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setColsArticles(window.innerWidth < 500 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!loading && data.result) {
      setPage(data.page);
      setPenampungArticles([...penampungArticles, ...data.result]);
    }
    return () => {};
  }, [data]);

  useEffect(() => {
    const articlesSortGroup: AppInterface.Article[][] = [];
    penampungArticles.map((article, i) => {
      const keyMod = (i + 1) % colsArticles;
      let ky = 0;
      if (keyMod == 2) ky = 1;
      else if (keyMod == 0) ky = 2;
      if (!articlesSortGroup[ky]) articlesSortGroup[ky] = [article];
      else articlesSortGroup[ky].push(article);
    });

    setgroupArticles(articlesSortGroup);
    return () => {};
  }, [penampungArticles, colsArticles]);

  useEffect(() => {
    setPage(pg);
    setPenampungArticles(articles);
    return () => {
      setPenampungArticles([]);
    };
  }, [articles]);
  return (
    <>
      <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${colsArticles}, minmax(0, 1fr))` }}>
        {groupArticles.map((indexArticle, i) => {
          return (
            <div className="flex flex-col gap-4" key={i}>
              {indexArticle.map((article) => {
                return <ArticleCard key={article.id} article={article} />;
              })}
            </div>
          );
        })}
      </div>
      {groupArticles.length < 1 && <div className="flex justify-center">Empty</div>}
      {page.last_page > page.current_page && (
        <div className="flex justify-center">
          <ButtonCustom
            onClick={(e) => {
              get("getNewsByCategory", { params: { ...(query["search"] && { search: query["search"] }), category: query.slug, page: page.next_page, limit: 9 } });
            }}
            disabled={loading}
            className="py-3 px-4 bg-dark text-white"
          >
            Load more
          </ButtonCustom>
        </div>
      )}
    </>
  );
}
