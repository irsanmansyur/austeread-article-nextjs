import { urlAsset } from "@/commons/helpers";
import { AppInterface } from "@/commons/interface/app";
import { useAuth } from "@/contexts/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { SkeletonNews } from "./skeleton-card";

type Props = {
  category: { name: string };
};
export default function RelatedArticle({ category }: Props) {
  const { useAxios } = useAuth();
  const [{ data: relatedArticle, loading: loadRelated, error }, refetch] = useAxios<{ category_name: string; page: object; result: AppInterface.Article[] }>({
    url: "getNewsByCategory",
    params: { page: 1, limit: 3, category: category.name },
  });
  const parentScroll = useRef<HTMLDivElement>(null);

  return (
    <div ref={parentScroll} className="relative grid grid-flow-col gap-3 overflow-x-auto hide-scroll-bar">
      {!loadRelated && relatedArticle
        ? relatedArticle.result.map((article, i) => {
            return (
              <Link
                href={"/news/" + article.id}
                key={i}
                className="min-w-[192px] sm:!min-w-[290px]"
                style={{
                  width: parentScroll.current ? `${parentScroll.current.offsetWidth / 3 - 24}px` : "240px",
                }}
              >
                <div className="card bg-dark rounded overflow-hidden text-white relative">
                  <Image
                    width={100}
                    height={100}
                    className="!h-[132px] sm:!h-[232px] !w-full"
                    src={urlAsset("img/upload/" + article.thumbnail)}
                    alt={`Thumbnail ${article.title}`}
                  />
                  <div className="absolute inset-0 flex justify-end p-4 items-center flex-col bg-black/60">
                    <p className="text-[10px] sm:text-xs text-center">{`${article.tbl_news_category.name} | ${article.createdAt}`}</p>
                    <h5 className="text-center text-xs sm:text-base sm:text-base mt-3">{article.title}</h5>
                  </div>
                </div>
              </Link>
            );
          })
        : [1, 2, 3, 4].map((a) => <SkeletonNews key={a} />)}
    </div>
  );
}
