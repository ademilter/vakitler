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

  const { settings, times, saveSettings } =
    useContext(CommonStoreContext);

  const today = times?.today;

  const timeFormat = settings.timeFormat;
  const adjustments = settings.adjustments || [0, 0, 0, 0, 0, 0];

  const onChangeAdjustment = async (e: React.ChangeEvent<HTMLInputElement>, timeIndex: number) => {
    if (timeIndex < 0 || timeIndex > 5) return;

    const value = e.target.value;
    adjustments[timeIndex] = parseInt(value);
    await saveSettings({
      ...settings,
      adjustments,
    })
  };

  const Times = Array.from(Array(6).keys()).map((i) => {
    return <div key={`time${i}`} className="flex items-center gap-px rounded-lg border border-gray-200 bg-gray-200 bg-zinc-200">
      <label className="flex h-10 grow cursor-pointer items-center gap-2 px-4 bg-white first:rounded-l-lg last:rounded-r-lg">
        <span className="flex-1">{t(`times${timeKeys[i]}`)} — {adjustedTime(today?.[timeKeys[i]], adjustments[i], timeFormat)}</span>
        <span className="text-xs">
          <input
            className="outline-none appearance-none text-center"
            type="number"
            max={60}
            min={-60}
            value={adjustments[i]}
            onChange={e => onChangeAdjustment(e, i)} />
        </span>
      </label>
    </div>
  })

  return (
    <Container className="flex h-full flex-col gap-6 py-10">
      <div className="grid gap-6 text-sm">
        <div>
          {t("settingsCustomAdjustmentsDetails")}
        </div>
        {Times}
      </div>

      <Link
        href="/settings"
        className="mt-auto flex h-12 w-full items-center justify-center rounded-lg bg-current px-4"
      >
        <span className="text-white">{t("settingsBack")}</span>
      </Link>
    </Container>
  );
}
