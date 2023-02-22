import { AppInterface } from "@/commons/interface/app";
import useAxios from "axios-hooks";
import React from "react";
import CommentParent from "../commen-parent";
import FormComment from "./form-comment";
import CommentCountLoader from "./loader/comment-count.loader";

export default function CommentArticle({ article }: { article: AppInterface.Article }) {
  // mengambil data commentar
  const [{ data: commentsData, loading: commentLoading }, reFetchComments] = useAxios<{ data: any[] }>(`comment/${article.id}`);

  return (
    <div id="comments">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Comments ({commentLoading ? <CommentCountLoader text={"0"} /> : commentsData?.data?.length || 0})
        </h2>
      </div>
      <FormComment article={article} reFetchComments={reFetchComments} />
      <div id="comment-main">
        {commentLoading ? (
          <div> loading</div>
        ) : (
          Array.isArray(commentsData?.data) &&
          commentsData?.data.map((comment, i) => {
            return <CommentParent comment={comment} key={i} />;
          })
        )}
      </div>
    </div>
  );
}
