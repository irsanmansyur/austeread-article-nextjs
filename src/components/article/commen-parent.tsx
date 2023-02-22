import { AppInterface } from "@/commons/interface/app";
import { useState } from "react";
import CommentCard from "./commen-card";
import CommentReplay from "./comment-replay";

type Props = {
  comment: AppInterface.Comment;
};
export default function CommentParent({ comment }: Props) {
  const [reply, setReply] = useState(false);
  const [commentsReplies, setCommentsReplies] = useState<AppInterface.Comment[]>([]);
  return (
    <article className="border-b last:border-b-0 pb-2 last:pb-0">
      <CommentCard comment={comment} className="p-2" setReplay={setReply} />
      {commentsReplies.length > 0 && (
        <div className="pl-3 py-2">
          {commentsReplies.map((cmnt, i) => {
            return (
              <CommentCard key={i} comment={cmnt} className="group" setReplay={setReply}>
                <div className="absolute left-0 top-0 bg-dark h-[35px] w-[1px]">
                  <div className="relative w-full h-full" />
                  <div className="absolute bottom-0 left-[-2px] rounded-full h-[5px] w-[5px] bg-dark"></div>
                </div>
                <div className="group-last:hidden  absolute left-0 top-[40px] bottom-0 bg-dark w-[1px]" />
              </CommentCard>
            );
          })}
        </div>
      )}
      {reply && <CommentReplay className="px-3" />}
    </article>
  );
}
