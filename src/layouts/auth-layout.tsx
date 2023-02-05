import { scrollInfoAtom } from "@/commons/data/layoutAtom";
import React, { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

import FooterBottom from "./components/footer-bottom";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  children?: string | JSX.Element | JSX.Element[];
};
export default function AuthLayout({ children, ...props }: Props) {
  const parentMain = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return () => {};
  }, []);

  // untuk mendapatkan info scroll dan window main utama
  const setScrollInfo = useSetRecoilState(scrollInfoAtom);
  const handleScroll = (event: any) => {
    setScrollInfo((inf) => {
      return {
        top: event.currentTarget.scrollTop,
        height: event.currentTarget.scrollHeight,
        to: event.currentTarget.scrollTop > inf.top ? "bottom" : "top",
      };
    });
  };

  return (
    <div className="relative overflow-hidden">
      <main
        ref={parentMain}
        className="flex justify-center items-center flex-col h-screen overflow-y-auto overflow-x-hidden scroll-smooth pb-20"
        scroll-region="true"
        onScroll={handleScroll}
      >
        {children}
        <div className="absolute bottom-0 w-full bg-black text-white py-10">
          <FooterBottom className="text-light pt-0 -mb-0" />
        </div>
      </main>
    </div>
  );
}
