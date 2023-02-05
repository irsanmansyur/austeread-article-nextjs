import { log } from "console";
import Head from "next/head";
import { useRouter } from "next/router";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  title: string;
  descrtiption: string;
  keywords?: string;
  image?: string;
  children: ReactNode;
};
export default function SeoLayout({
  image,
  keywords = "austeread, product austeread, article austeread, news austeread",
  children,
  title,
  descrtiption: desc = "",
  ...props
}: Props) {
  const descrtiption = (desc + "")
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/(\r\n|\n|\r)/gm, "")
    .substring(0, 160);
  const { pathname } = useRouter();

  if (!image) image = "/icons/logo-white.png";
  const appName = "austeread";
  return (
    <div {...props}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={descrtiption} />
        {keywords && <meta name="keywords" content={keywords} />}
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={descrtiption} />
        {image && <meta itemProp="image" content={image + "?tr=n-og"} />}
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={pathname} />
        <link rel="canonical" href={pathname} />
        <meta property="og:type" content="VinciDy Official Website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={descrtiption} />
        <meta property="og:image" content={image + "?tr=n-og"} />
        <meta property="og:site_name" content={appName} />
        {/* Twitter Meta Tags  */}
        <meta name="twitter:card" content={appName} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={descrtiption} />
        {image && <meta name="twitter:image" content={image + "?tr=n-og"} />}
      </Head>
      {children}
    </div>
  );
}
