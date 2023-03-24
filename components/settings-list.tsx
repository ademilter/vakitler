import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import useTranslation from "next-translate/useTranslation";
import Loading from "@/components/loading";
import Box from "@/components/box";

type Item = { value: string; label: string };

interface ISelect {
  onChange?: (value: string) => void;
  data?: Item[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  pushFirst?: string[];
  backButtonText?: string;
  loading?: boolean;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const SettingsList = ({
  onChange = () => {},
  data = [],
  inputProps = {},
  pushFirst = [],
  loading = false,
  backButtonText = undefined,
  backButtonProps = undefined,
}: ISelect) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  backButtonText = backButtonText ?? t("settingsBack");

  const [q, setQ] = useState<string>("");

  const fuseOptions = {
    keys: ["label"],
    threshold: 0.5,
  };

  const fuse = useMemo(() => {
    return new Fuse(data, fuseOptions);
  }, [data]);

  const pushFirstData = useMemo(() => {
    return pushFirst
      .map(id => data.find(d => d.value === id))
      .filter(d => d) as Item[];
  }, [data, pushFirst]);

  const results = useMemo(() => {
    const removeFirstDataFromData = data.filter(
      d => !pushFirstData.find(p => p.value === d.value)
    );

    return q
      ? fuse.search(q).map(o => o.item)
      : [...pushFirstData, ...removeFirstDataFromData];
  }, [fuse, q, data, pushFirstData]);

  return (
    <div>
      <Box
        className="sticky top-0 z-20 -mx-2 p-2"
        helperClass="bg-white opacity-100"
      >
        {!backButtonProps?.hidden && (
          <button
            type="button"
            className="flex h-12 shrink-0 items-center text-zinc-500"
            onClick={() => router.back()}
            {...backButtonProps}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 6 9 12 15 18" />
            </svg>

            <span>{backButtonText}</span>
          </button>
        )}

        <input
          type="text"
          autoFocus
          className="h-12 w-full rounded-lg border bg-white px-4"
          {...inputProps}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </Box>

      <div className="mt-1 space-y-1">
        {loading ? (
          <Loading />
        ) : (
          results.map(item => (
            <Box key={item.value}>
              <button
                type="button"
                className="flex h-12 w-full items-center rounded-lg px-4"
                onClick={() => onChange(item.value)}
              >
                {item.label}
              </button>
            </Box>
          ))
        )}
      </div>
    </div>
  );
};

SettingsList.displayName = "SettingsList";

export default SettingsList;
