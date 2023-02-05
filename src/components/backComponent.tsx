import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {};
export default function BackComponent({ children, ...props }: Props) {
  const { pathname, push, back } = useRouter();
  return (
    <button
      {...props}
      type="button"
      className="outline-none"
      onClick={(e) => {
        if (pathname == "/") push("/");
        else back();
      }}
    >
      {!children ? <Image width={40} height={40} className="navbar-brand" alt="navbar-logo" src={"/icons/icon_back.png"} /> : children}
    </button>
  );
}
