import React, { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Loading from "components/loading";

type Item = { value: string; label: string };

interface ISelect {
  onChange?: (value: string) => void;
  data?: Item[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  pushFirst?: string[];
  loading?: boolean;
  children?: React.ReactNode;
}

export default function SettingsList({
  children,
  onChange = () => {},
  data = [],
  inputProps = {},
  pushFirst = [],
  loading = false,
}: ISelect) {
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
    <div className="grid gap-2">
      {children}

      <div className="sticky top-0 -mx-2 bg-zinc-200 p-2 dark:bg-zinc-900">
        <input
          type="text"
          autoFocus
          className="h-12 w-full text-base rounded-xl border px-4 dark:border-zinc-600 dark:bg-zinc-900"
          {...inputProps}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        {loading ? (
          <Loading />
        ) : (
          results.map(item => (
            <button
              key={item.value}
              type="button"
              className="flex h-12 w-full items-center rounded-xl bg-zinc-100 px-4 dark:bg-zinc-800"
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
