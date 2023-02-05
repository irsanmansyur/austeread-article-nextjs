import { ReactElement, useRef, useState } from "react";
import PublicLayout from "@/layouts/public-layout";
import Banner from "@/components/banner";
import { AppInterface } from "@/commons/interface/app";
import { NextPageWithLayout } from "../_app";
import SeoLayout from "@/layouts/seo-layout";
import { useRouter } from "next/router";
import SelectCustom from "@/components/form/select";
import CardSearch from "@/components/article/card-search";

type Props = { articles: AppInterface.Article[] };
const Home: NextPageWithLayout<Props> = ({ articles }) => {
  const { query, push } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<Record<string, any>>({});
  return (
    <SeoLayout title={`Pencarian Article dengan keyword "${query.keyword}"`} descrtiption={`Halaman pencarian article`}>
      <div className="sm:max-w-[90%] sm:w-[729px] sm:my-10 mx-auto">
        <Banner />
      </div>
      <div className="container py-10">
        <div className="article-page-header flex items-center flex-col gap-8">
          <h1 className="text-4xl text-center">Search Article {query.keyword} From Austeread</h1>
          <form
            className="flex gap-4 w-2/3 mr-[13px]"
            onSubmit={(e) => {
              e.preventDefault();
              push({ pathname: `/search/${searchRef.current?.value}` });
            }}
          >
            <input ref={searchRef} placeholder={`Try "Fashion industry"`} name="search" className="outline-none border rounded-sm py-1 px-4 w-full" />
            <button type="submit" className="bg-black text-light rounded px-2 ">
              Search
            </button>
          </form>
        </div>
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="article-page mt-10 p-2 sm:px-0 w-full">
            <div className="articles-info flex justify-between items-center border-b pb-2">
              <div>{articles.length} article from austeread</div>
              <div className="flex items-center gap-2">
                <span>Sort by</span>
                <SelectCustom
                  className="py-1"
                  value={data.value ?? "-"}
                  options={[
                    { label: "Newest", value: "11" },
                    { label: "Populer", value: "22" },
                  ]}
                  onChange={(e) => setData({ ...data, sort: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 py-4">
              {articles.map((article, i) => (
                <CardSearch key={i} article={article} />
              ))}
            </div>
          </div>
          <div className="sm:w-[254px] pt-[115px] px-2 sm:px-0">
            <Banner className="sm:h-[509px]" />
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
  return { props: { articles: [] } };
}
export default Home;
