import { urlAsset } from "@/commons/helpers";
import { AppInterface } from "@/commons/interface/app";
import { useAuth } from "@/contexts/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import TitleKategori from "../title-kategori";
import { SkeletonNews } from "./skeleton-card";

export default function DontMissThis() {
  const parentScroll = useRef<HTMLDivElement>(null);
  const { useAxios } = useAuth();
  const [{ data: newsHightLight, loading: loadingNewsHightLight, error }] = useAxios<{ data: AppInterface.HightLight[] }>("news/highlight");

  return (
    <div className="bg-gray-100 py-10">
      <div className="container px-2 sm:px-0">
        <div className="all-article">
          <div className="articles-header">
            <TitleKategori text="Don't miss this" />
          </div>
          <div className="articles-body mt-6">
            <div ref={parentScroll} className="relative grid grid-flow-col gap-3 overflow-x-auto hide-scroll-bar">
              {newsHightLight
                ? newsHightLight.data.map((highlight, i) => {
                    return (
                      <Link
                        href={"/news/" + highlight.id}
                        key={i}
                        className="min-w-[240px] w-1/2"
                        style={{ width: parentScroll.current ? `${parentScroll.current.offsetWidth / 3}px` : "240px" }}
                      >
                        <div className="card bg-dark rounded overflow-hidden text-white relative">
                          <Image
                            width={100}
                            height={100}
                            style={{ width: "auto", height: "auto" }}
                            className="!h-[210px] sm:!h-[232px] !w-full"
                            src={urlAsset("img/upload/" + highlight.thumbnail)}
                            alt={`Thumbnail ${highlight.title}`}
                          />
                          <div className="absolute inset-0 flex justify-end p-4 items-center flex-col bg-black/60">
                            <p className="text-xs">{`${highlight.tbl_news_category.name} | ${highlight.createdAt}`}</p>
                            <h5 className="text-center text-sm sm:text-base mt-3">{highlight.title}</h5>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                : [1, 2, 3, 4].map((a) => (
                    <div key={a} className="min-w-[240px] w-1/2" style={{ width: parentScroll.current ? `${parentScroll.current.offsetWidth / 3}px` : "240px" }}>
                      <SkeletonNews />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
