import React, { useContext } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import { CommonStoreContext } from "@/stores/common";
import { TimeNames } from "@/lib/types";
import { adjustedTime } from "@/lib/utils";
import Link from "next/link";

const timeKeys = Object.values(TimeNames);

export default function Adjust() {
  const { t } = useTranslation("common");

  const { settings, times, setSettings } = useContext(CommonStoreContext);

  const today = times?.today;

  const timeFormat = settings.timeFormat;
  const adjustments = settings.adjustments || [0, 0, 0, 0, 0, 0];

  const onChangeAdjustment = async (value: number, timeIndex: number) => {
    adjustments[timeIndex] = value;
    setSettings({
      ...settings,
      adjustments,
    });
  };

  const Times = Array.from(Array(6).keys()).map(i => {
    return (
      <div
        key={`time${i}`}
        className="flex items-center border-b px-4 py-3 last:border-0"
      >
        <span className="grid grow">
          <b>{t(`times${timeKeys[i]}`)}</b>
          <span>
            {adjustedTime(today?.[timeKeys[i]], adjustments[i], timeFormat)}
          </span>
        </span>

        <span className="flex items-center gap-4">
          <button type="button" onClick={() => onChangeAdjustment(0, i)}>
            {adjustments[i]}
          </button>

          <span className="flex items-center rounded border border-zinc-200 bg-white">
            <button
              className="flex h-8 w-8 items-center justify-center"
              type="button"
              onClick={() => onChangeAdjustment(adjustments[i] - 1, i)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center border-l border-l-zinc-200"
              type="button"
              onClick={() => onChangeAdjustment(adjustments[i] + 1, i)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </span>
        </span>
      </div>
    );
  });

  return (
    <Container className="flex h-full flex-col gap-6 py-10">
      <p>{t("settingsCustomAdjustmentsDetails")}</p>

      <div className="grid rounded-lg border border-zinc-200">{Times}</div>

      <Link
        href="/settings"
        className="mt-auto flex h-12 w-full items-center justify-center rounded-lg bg-current px-4"
      >
        <span className="text-white">{t("settingsBack")}</span>
      </Link>
    </Container>
  );
}
