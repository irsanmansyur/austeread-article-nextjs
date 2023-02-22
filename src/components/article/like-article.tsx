import useUser from "@/commons/data/user-atom";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppInterface } from "@/commons/interface/app";
import useAxios from "axios-hooks";

type Props = { article: AppInterface.Article };
export default function LikeArticle({ article }: Props) {
  const { user } = useUser();
  return <>{user ? <LikeArticleIsUser article={article} /> : <LikeArticleNotLogin article={article} />}</>;
}
const LikeArticleNotLogin = ({ article }: { article: AppInterface.Article }) => {
  const { push } = useRouter();
  return (
    <div className="inline-flex items-center gap-2 text-gray-600">
      <div
        className="p-3 bg-gray-200 rounded-full cursor-pointer"
        onClick={(e) => {
          return Swal.fire({
            title: "Please login first!",
            showCancelButton: true,
            confirmButtonText: "Login",
          }).then((result) => {
            if (result.isConfirmed) push("/auth/login");
          });
        }}
      >
        <Image width={20} height={20} className="!w-auto !h-auto" alt="path_ek26" src="/icons/like.png" />
      </div>
      {article.like} Likes
    </div>
  );
};
const LikeArticleIsUser = ({ article }: { article: AppInterface.Article }) => {
  const [userLike, setUserLike] = useState(false);
  const [{ data, loading }] = useAxios(`getLikeNewsByPerson/${article.id}`);
  const [{ data: putData, loading: putLoading }, executePut] = useAxios(
    {
      url: "likeNews",
      method: "PUT",
    },
    { manual: true }
  );
  const [likeCount, setLikeCount] = useState(article.like);

  useEffect(() => {
    if (!loading && data) {
      setUserLike(data.isLike);
    }
    return () => {};
  }, [loading]);

  useEffect(() => {
    if (!putLoading && putData) {
      setLikeCount(!userLike ? likeCount + 1 : likeCount < 1 ? 0 : likeCount - 1);
      setUserLike(!userLike);
    }
    return () => {};
  }, [putLoading]);
  return (
    <div className="inline-flex items-center gap-2 text-gray-600">
      <div
        className={`p-3 bg-gray-200 rounded-full cursor-pointer border border-dark`}
        onClick={(e) => {
          executePut({
            data: {
              idNews: article.id,
              isLike: userLike ? 0 : 1,
            },
          });
        }}
      >
        <Image width={20} height={20} className="!w-auto !h-auto" alt="path_ek26" src="/icons/like.png" />
      </div>
      {likeCount} Likes
    </div>
  );
};
