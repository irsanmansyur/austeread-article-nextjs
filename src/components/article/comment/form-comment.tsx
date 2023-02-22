import useUser from "@/commons/data/user-atom";
import { AppInterface } from "@/commons/interface/app";
import InputError from "@/components/form/InputError";
import useAxios, { RefetchFunction } from "axios-hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

type Props = {
  article: AppInterface.Article;
  reFetchComments: RefetchFunction<any, { data: any[] }>;
};
export default function FormComment({ article, reFetchComments }: Props) {
  const [dataFormComment, setDataFormComment] = useState({
    id_news: article.id,
    comment: "",
  });
  const [errorsForm, setErrorsForm] = useState<{ comment?: string }>({ comment: undefined });
  const { push } = useRouter();
  const { user } = useUser();
  const [{ loading, data }, postComment] = useAxios({ url: "comment", method: "post" }, { manual: true });
  const handleSubmit = (e: React.FormEvent) => {
    setErrorsForm({ comment: undefined });
    e.preventDefault();
    if (!user)
      return Swal.fire({
        title: "Please login first!",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) push("/auth/login");
      });
    if (dataFormComment.comment.length < 5) return setErrorsForm({ comment: "Maaf panjang comment harus lebih dari 5 karakter" });
    if (loading) return;

    postComment({ data: dataFormComment }).then(({ status, data }) => {
      if (status > 300) return;
      setDataFormComment({ ...dataFormComment, comment: "" });
      reFetchComments();
    });
  };
  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="py-2 px-4 mb-2 bg-white rounded-lg rounded-t-lg border border-gray-200">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={6}
            onChange={(e) => setDataFormComment({ ...dataFormComment, comment: e.target.value })}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
            placeholder="Write a comment..."
            required
            value={dataFormComment.comment}
          />
        </div>
        <InputError message={errorsForm.comment} />
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-primary/80"
      >
        Post comment
      </button>
    </form>
  );
}
