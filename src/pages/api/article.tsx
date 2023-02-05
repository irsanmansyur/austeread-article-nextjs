import { AppInterface } from "@/commons/interface/app";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { textHtmlBersih } from "@/commons/helpers/text";
type Data = {
  page: { current_page: number; first_page?: number; next_page: number; last_page?: number; previous_page: number };
  result: AppInterface.Article[];
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 10;
  const category = req.query.category ?? "--";
  const date = req.query.tanggal;

  const { data } = await axios.get<{
    page: { current_page: number; first_page?: number; next_page: number; last_page?: number; previous_page: number };
    result: AppInterface.Article[];
  }>(process.env.BASE_API + "getNewsByCategory", { params: { ...(date && { date }), page, limit, category } });

  res.status(200).json({
    ...data,
    result: data.result.map((art) => {
      return {
        ...art,
        desc: textHtmlBersih(art.desc)
          .replace(/<[^>]+>/g, "")
          .slice(0, 100),
      };
    }),
  });
}
