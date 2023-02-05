import { urlAsset } from "@/commons/helpers";
import { AppInterface } from "@/commons/interface/app";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }: { article: AppInterface.Article }) {
  return (
    <Link href={`/news/${article.id}`} scroll={true} className="card rounded relative">
      <Image height={200} width={200} className="!w-full rounded" src={urlAsset("img/upload/" + article.thumbnail)} alt="Card image" />
      <div className="p-4">
        <div className="text-xs pb-2 border-b-2 border-secondary">{`${article.tbl_news_category_name ?? article.tbl_news_category.name} | ${article.createdAt}`}</div>
        <div className="mt-3 font-PublicSansMedium text-base sm:text-[24px]">{article.title}</div>
      </div>
    </Link>
  );
}
