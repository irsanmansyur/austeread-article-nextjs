import React from "react";

type Props = {
  text: string;
};
export default function CommentCountLoader({ text }: Props) {
  return (
    <span className="inline animate-pulse">
      <small className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 px-4" style={{ width: text.length * 10 + "px" }}></small>
    </span>
  );
}
