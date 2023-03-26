import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import { useSettings, useRawTimes, useCommonStoreActions } from "@/stores";
import { TimeNames } from "@/lib/types";
import { adjustedTime, cx, formattedTime } from "@/lib/utils";
import SubPage from "@/components/layout/sub";
import useFetchData from "@/hooks/use-fetch-data";

const timeKeys = Object.values(TimeNames);

export default function Adjust() {
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  const settings = useSettings();
  const rawTimes = useRawTimes();
  const { setSettings } = useCommonStoreActions();

  const [fetchData] = useFetchData();

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
          "flex items-center px-4 py-4",
          "first:rounded-t-xl last:rounded-b-xl",
          "bg-white dark:bg-zinc-800",
          isActive && "bg-blue-50 dark:bg-zinc-700 dark:bg-opacity-60"
        )}
      >
        <span className="grid grow">
          <span>{t(timeKeys[i])}</span>
          <span className="opacity-60">{visualizeAdjustment(i)}</span>
        </span>

        <span className="flex items-center gap-2">
          {isActive && (
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center"
              onClick={() => onChangeAdjustment(0, i)}
            >
              {adjustments[i]}
            </button>
          )}

          <span className="flex items-center gap-px">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-l-lg bg-zinc-200 dark:bg-zinc-700"
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
              className="flex h-10 w-10 items-center justify-center rounded-r-lg bg-zinc-200 dark:bg-zinc-700"
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
      <Container className="grid gap-8 pt-8">
        <p>{t("adjustments:description")}</p>

        <div className="grid gap-px">{Times}</div>

        <div className="sticky bottom-0 z-20 mt-60 pb-10">
          <span className="pointer-events-none absolute inset-x-0 bottom-0 -top-24 -z-10 bg-gradient-to-t from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-900 dark:via-zinc-900 dark:to-transparent" />
          <button
            className="mt-auto flex h-12 w-full items-center justify-center rounded-xl bg-current px-4"
            onClick={() => onSaveAdjustments()}
          >
            <span className="text-white dark:text-black">{t("save")}</span>
          </button>
        </div>
      </Container>
    </SubPage>
  );
}
