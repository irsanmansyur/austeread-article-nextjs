import NavbarMenu from "./navbar-menu";
import NavbarAccount from "./navbar-account";
import Link from "next/link";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { scrollInfoAtom } from "@/commons/data/layoutAtom";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
export default function Navbar() {
  const mainInfo = useRecoilValue(scrollInfoAtom);
  const [show, setShow] = useState(false);

  return (
    <>
      <nav
        className={twMerge(
          "border-b   bg-white",
          mainInfo.to == "top" && mainInfo.top > 100 ? "border-b-2 border-gray-normal absolute bg-opacity-90  top-0 left-0 right-0 backdrop-blur z-50" : "sm:py-6"
        )}
      >
        <div className="flex justify-between items-center container p-2  sm:px-0 ">
          <div className="sm:w-1/3">
            <Link href={"#"}>
              <Image height={45} className="navbar-brand" alt="navbar-logo" src={"/icons/logo.austeread.gif"} width={45} />
            </Link>
          </div>
          <Link className="navbar-brand text-[29px] sm:text-[38px]" href="/">
            <span className="">auste</span>
            <span className="font-bold ">read</span>
          </Link>
          <div className="flex justify-end items-center sm:w-1/3">
            <div className="hidden" id="searchForm">
              <input className="form-control PublicSans-regular" id="searchbox" type="search" placeholder="Search" data-toggle="dropdown" />
              <ul className="dropdown-menu" id="searchboxcontent" role="menu" aria-labelledby="menu1" style={{ maxWidth: 400 }} />
            </div>
            <div className="hidden sm:flex items-center gap-4 border-r mr-4">
              <NavbarAccount />
              <Link className="pr-2" id="search" href="/search">
                <Image alt="Icons" width={20} height={20} src={"/icons/icon_search.png"} />
              </Link>
            </div>
            <div className="vl" />
            <a id="showFilePanel" href="#">
              <Image width={41} height={20} className="!w-auto !h-auto" alt="menu icon" src={"/icons/icon_menu.png"} onClick={(e) => setShow(!show)} />
            </a>
          </div>
        </div>
      </nav>
      <NavbarMenu show={show} setShow={setShow} />
    </>
  );
}
