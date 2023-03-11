import React, { useContext } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import { CommonStoreContext } from "@/stores/common";
import Link from "next/link";

export default function Adjust() {
  const { t } = useTranslation("common");

  const { releases } = useContext(CommonStoreContext);

  return (
    <Container className="flex min-h-full flex-col gap-6 py-10">
      <div className="grid gap-4">
        {releases.map(release => (
          <div key={release.id} className="grid gap-2 rounded-lg border p-4">
            <h5>{release.name}</h5>
            <div className="text-sm">
              {release.body.split(/\r?\n/).map((node, index) => (
                // * feat: ... -> feat: ...
                <p key={index}>{node.slice(2)}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-auto flex h-12 w-full shrink-0 items-center justify-center rounded-lg border bg-current px-4"
      >
        <span className="text-white">{t("releaseBackButton")}</span>
      </Link>
    </Container>
  );
}
