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
  backButton?: boolean;
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
  backButtonText = "Back",
  backButtonProps = undefined,
}: ISelect) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  backButtonText = t("settingsBack");

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
    return q ? fuse.search(q).map(o => o.item) : [...pushFirstData, ...data];
  }, [fuse, q, data, pushFirstData]);

  return (
    <div className="">
      <div className="relative sticky top-0 -mx-2 bg-white p-2">
        {!backButtonProps?.hidden && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-12 shrink-0 items-center"
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
            className="h-12 w-full rounded-lg border px-4"
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
            className="flex h-12 w-full items-center rounded-lg bg-zinc-100 px-4"
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
