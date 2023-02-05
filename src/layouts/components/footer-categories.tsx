import { kategoriesAtom } from "@/commons/data/layoutAtom";
import Link from "next/link";
import { useRecoilValue } from "recoil";

export default function FooterCategoriesLink() {
  const kategories = useRecoilValue(kategoriesAtom);
  return (
    <div>
      <h6 className="uppercase font-bold mb-4">
        <b>See more articles</b>
      </h6>
      <div className="flex flex-col gap-3 -ml-2 pr-3">
        {Array.isArray(kategories) &&
          kategories.map((kategori, i) => {
            return (
              <Link key={i} className="cursor-pointer hover:bg-white/20 rounded px-2" href={`/news/category/${kategori.name}`}>
                {kategori.name}
              </Link>
            );
          })}
      </div>
    </div>
  );
}
