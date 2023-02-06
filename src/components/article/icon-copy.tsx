import Image from "next/image";
import React, { useState } from "react";
import Tooltip from "../tool-tip";

export default function IconCopy() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Tooltip show={show} text="Url berhasil di salin">
        <button
          title="Click to Copy"
          type="button"
          onClick={async () => {
            if ("clipboard" in navigator) {
              await navigator.clipboard.writeText(window.location.href);
            } else {
              document.execCommand("copy", true, window.location.href);
            }
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 2000);
          }}
        >
          <Image width={20} height={20} className="!w-auto !h-auto" alt={"copy icon"} src="/icons/icon_copy.png" />
        </button>
      </Tooltip>
    </>
  );
}
