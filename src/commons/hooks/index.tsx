import { RefObject, useState } from "react";
import { useRecoilValue } from "recoil";
import { scrollInfoAtom } from "../data/layoutAtom";

export default function useOnScreen(ref: RefObject<HTMLElement>, top: number) {
  const [isIntersecting, setIntersecting] = useState(false);
  // if (ref.current) setIntersecting(ref.current.offsetTop - top + 200 < window.innerHeight);
  return isIntersecting;
}
