import Image from "next/image";
type Props = {
  alt?: string;
  src: string;
};
export default function SosmedIcon({ alt = "sosmed icon", ...props }: Props) {
  return <Image alt={alt} width={20} height={20} style={{ height: "auto", width: "auto" }} className="!w-6 !h-6 sm:!h-7 sm:!w-7" src={props.src} />;
}
