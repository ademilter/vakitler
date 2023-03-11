import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

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

const options = {
  keys: ["label"],
  threshold: 0.5,
};

const SettingsList = ({
  onChange = () => {},
  data = [],
  inputProps = {},
  pushFirst = [],
  loading = true,
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
    <div>
      <motion.div
        className="sticky top-0 p-2 -mx-2 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {!backButtonProps?.hidden && (
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
        )}

        <input
          type="text"
          autoFocus
          className="w-full h-12 px-4 transition-colors border rounded-lg outline-none hover:border-zinc-300 focus:border-zinc-400"
          {...inputProps}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </motion.div>

      <div className="space-y-1">
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 mx-auto my-4"
          >
            <g stroke="currentColor">
              <circle
                cx="12"
                cy="12"
                r="9.5"
                fill="none"
                strokeLinecap="round"
                strokeWidth="2"
              >
                <animate
                  attributeName="stroke-dasharray"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite"
                  values="0 150;42 150;42 150;42 150"
                ></animate>
                <animate
                  attributeName="stroke-dashoffset"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite"
                  values="0;-16;-59;-59"
                ></animate>
              </circle>
              <animateTransform
                attributeName="transform"
                dur="2s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              ></animateTransform>
            </g>
          </svg>
        ) : (
          results.map(item => (
            <button
              key={item.value}
              type="button"
              className="flex items-center w-full h-12 px-4 transition-colors border rounded-lg border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100"
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

SettingsList.displayName = "SettingsList";

export default SettingsList;
