import Image from "next/image";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

export default function IconCopy() {
  return (
    <>
      <button
        id="copy-url"
        type="button"
        data-tooltip-content="Url berhasil di salin"
        data-tooltip-place="top"
        onClick={async () => {
          if ("clipboard" in navigator) {
            await navigator.clipboard.writeText(window.location.href);
          } else {
            document.execCommand("copy", true, window.location.href);
          }
        }}
      >
        <Image width={20} height={20} className="!w-auto !h-auto" alt={"copy icon"} src="/icons/icon_copy.png" />
      </button>
      <Tooltip anchorId="copy-url" events={["click"]} />
    </>
  );
}
