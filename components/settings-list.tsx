import React, { useMemo, useState } from "react";
import Fuse from "fuse.js";

interface ISelect {
  onChange?: (value: string) => void;
  data?: { value: string; label: string }[];
  searchPlaceholder?: string;
}

const options = {
  keys: ["label"],
  threshold: 0.5,
};

const SettingsList = ({
  onChange = () => {},
  data = [],
  searchPlaceholder,
}: ISelect) => {
  const [q, setQ] = useState<string>("");

  const fuse = new Fuse(data, options);

  const results = useMemo(() => {
    return q ? fuse.search(q).map(o => o.item) : data;
  }, [q, data]);

  return (
    <div className="">
      <div className="sticky top-0 -mx-4 bg-white p-4">
        <input
          type="text"
          className="h-10 w-full rounded-lg border px-2"
          placeholder={searchPlaceholder}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        {results.map(item => (
          <button
            key={item.value}
            type="button"
            className="flex h-10 w-full items-center rounded-lg bg-zinc-100 px-2"
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
