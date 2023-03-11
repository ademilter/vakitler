import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import useTranslation from "next-translate/useTranslation";

type Item = { value: string; label: string };

interface ISelect {
  onChange?: (value: string) => void;
  data?: Item[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  pushFirst?: string[];
  backButtonText?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const options = {
  keys: ["label"],
  threshold: 0.5,
};

const SettingsList = ({
  onChange = () => {},
  data = [],
  inputProps = {},
  pushFirst = [],
  backButtonText = undefined,
  backButtonProps = undefined,
}: ISelect) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  backButtonText = backButtonText ?? t("settingsBack");

  const [q, setQ] = useState<string>("");

  const fuse = useMemo(() => {
    return new Fuse(data, options);
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
    <div className="">
      <div className="sticky top-0 p-2 -mx-2 bg-white">
        {!backButtonProps?.hidden && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex items-center h-12 shrink-0"
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
          </div>
        )}
        <div>
          <input
            type="text"
            autoFocus
            className="w-full h-12 px-4 border rounded-lg"
            {...inputProps}
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        {results.map(item => (
          <button
            key={item.value}
            type="button"
            className="flex items-center w-full h-12 px-4 transition-colors rounded-lg bg-zinc-100 hover:bg-zinc-200"
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

SettingsList.displayName = "SettingsList";

export default SettingsList;
