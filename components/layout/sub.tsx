import { ReactNode } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import colors from "tailwindcss/colors";
import useTranslation from "next-translate/useTranslation";
import { metadata } from "@/lib/meta";

export default function SubPage({
  children,
  pageTitle,
}: {
  children: ReactNode;
  pageTitle?: string;
}) {
  const { resolvedTheme } = useTheme();
  const { t, lang } = useTranslation("common");

  const themeColor =
    resolvedTheme === "light" ? colors.zinc["200"] : colors.zinc["900"];

  return (
    <>
      <Head>
        <title>
          {metadata.title} - {pageTitle ? pageTitle : t("SettingsTitle")}
        </title>
        <meta name="theme-color" content={themeColor} />
      </Head>

      {children}
    </>
  );
}
