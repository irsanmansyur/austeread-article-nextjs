import React, { HTMLAttributes, useRef } from "react";
type Props = HTMLAttributes<HTMLDivElement> & {
  text?: string;
  show?: boolean;
};
export default function Tooltip({ text, show, children }: Props) {
  const toolTipRef = useRef<HTMLSpanElement>(null);
  const toolTipParentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={toolTipParentRef}
      className="group relative inline-block"
      onMouseEnter={({ clientX }) => {
        if (!toolTipRef.current || !toolTipParentRef.current) return;
        const { left } = toolTipParentRef.current.getBoundingClientRect();
        toolTipRef.current.style.left = clientX - left + "px";
      }}
    >
      {children}
      {show && text && (
        <span
          ref={toolTipRef}
          className={"invisible group-hover:visible p-1 rounded absolute top-full mt-1 whitespace-nowrap bg-slate-700 text-white text-xs"}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </div>
  );
}
