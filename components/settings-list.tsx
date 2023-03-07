import React, { useMemo, useState } from "react";
import Fuse from "fuse.js";

type Item = { value: string; label: string };

interface ISelect {
  onChange?: (value: string) => void;
  data?: Item[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  pushFirst?: string[];
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
}: ISelect) => {
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
      <div className="sticky top-0 -mx-2 bg-white p-2">
        <input
          type="text"
          autoFocus
          className="h-12 w-full rounded-lg border px-4"
          {...inputProps}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
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
