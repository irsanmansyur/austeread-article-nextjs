// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AppInterface } from "@/commons/interface/app";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = AppInterface.ArticleGroupKategori[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { data } = await axios.get<AppInterface.ArticleGroupKategori[]>(process.env.BASE_API + "getNews");
  res.status(200).json(
    data.map((newsArt) => {
      return {
        ...newsArt,
        value: newsArt.value.map((art) => {
          return {
            ...art,
            desc: art.desc
              .replace(/\r?\n|\r/g, "")
              .replace(/<[^>]+>/g, "")
              .slice(0, 100),
          };
        }),
      };
    })
  );
}
