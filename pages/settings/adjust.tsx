import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import { CommonStoreContext } from "@/stores/common";
import { TimeNames } from "@/lib/types";
import { adjustedTime, cx, formattedTime } from "@/lib/utils";
import SubPage from "@/components/layout/sub";

const timeKeys = Object.values(TimeNames);

export default function Adjust() {
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  const { settings, rawTimes, setSettings, fetchData } =
    useContext(CommonStoreContext);

  const today = rawTimes?.today;

  const timeFormat = settings.timeFormat;
  const adjustments = useMemo(
    () => settings.adjustments ?? [0, 0, 0, 0, 0, 0],
    [settings.adjustments]
  );
  const [dirtyIndexes, setDirtyIndexes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setDirtyIndexes(
      adjustments.reduce((acc, adj, index) => {
        if (adj !== 0) {
          acc[index] = true;
        }
        return acc;
      }, {} as Record<number, boolean>)
    );
  }, [adjustments]);

  const visualizeAdjustment = (i: number) => {
    let time = today?.[timeKeys[i]];
    if (dirtyIndexes[i]) {
      time = adjustedTime(adjustments[i], time);
    }
    return formattedTime(timeFormat, time, lang);
  };

  const onChangeAdjustment = async (value: number, timeIndex: number) => {
    adjustments[timeIndex] = value;
    setDirtyIndexes({ ...dirtyIndexes, [timeIndex]: true });
  };

  const onSaveAdjustments = async () => {
    if (!rawTimes) {
      router.push("/settings");
      return;
    }

    setSettings({ ...settings, adjustments });
    await fetchData(settings.city?.IlceID as string);
    router.push("/");
  };

  const Times = Array.from(Array(6).keys()).map(i => {
    const isActive = adjustments[i] !== 0;
    return (
      <div
        key={`time${i}`}
        className={cx(
          "flex items-center bg-zinc-100 px-4 py-3",
          "first:rounded-t-lg last:rounded-b-lg",
          "dark:bg-zinc-800",
          isActive && "bg-zinc-200 dark:bg-zinc-700 dark:bg-opacity-60"
        )}
      >
        <span className="grid grow">
          <span>{t(`times${timeKeys[i]}`)}</span>
          <span className="opacity-60">{visualizeAdjustment(i)}</span>
        </span>

        <span className="flex items-center gap-2">
          {isActive && (
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center"
              onClick={() => onChangeAdjustment(0, i)}
            >
              {adjustments[i]}
            </button>
          )}

          <span className="flex items-center rounded bg-white dark:bg-zinc-700">
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
              className="flex h-8 w-8 items-center justify-center"
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
    <SubPage>
      <Container className="grid gap-8 py-8">
        <p>{t("settingsCustomAdjustmentsDetails")}</p>

        <div className="grid gap-px">{Times}</div>

        <button
          className="mt-auto flex h-12 w-full items-center justify-center rounded-xl bg-current px-4"
          onClick={() => onSaveAdjustments()}
        >
          <span className="text-white dark:text-black">
            {t("settingsSave")}
          </span>
        </button>
      </Container>
    </SubPage>
  );
}
