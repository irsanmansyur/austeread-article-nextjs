import Image from "next/image";
import { Tooltip } from "san-tooltip";

export default function IconCopy() {
  return (
    <>
      <Tooltip event="click" text="Url berhasil di salin">
        <button
          title="Click to Copy"
          type="button"
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
      </Tooltip>
    </>
  );
}
