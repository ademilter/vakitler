import { create } from "zustand";
import { Data, Timer } from "@/lib/types";
import { Times } from "@/lib/model";
import { DateTime } from "luxon";

interface State {
  config: {
    country: string;
    region: string;
    city: string;
    timezoneOffset: number;
    language?: string;
  };
  loading: boolean;
  setLoading: (state: boolean) => void;
  data: Data;
  setData: (data: Data) => void;
  times: Times | undefined;
  fetchData: () => Promise<void>;
  timer: undefined | Timer;
  updateTimer: () => void;
}

const store = create<State>((set, get) => ({
  config: {
    country: "Turkey",
    region: "İstanbul",
    city: "İstanbul",
    timezoneOffset: 0,
    language: "tr",
  },
  loading: true,
  setLoading: (state) => set(() => ({ loading: state })),
  data: null,
  setData: (data) => set(() => ({ data })),
  times: undefined,
  fetchData: async () => {
    const { setLoading, setData, config } = get();

    try {
      setLoading(true);
      const url = new URL("/api", window.location.origin);
      url.searchParams.append("country", config.country);
      url.searchParams.append("region", config.region);
      url.searchParams.append("city", config.city);
      url.searchParams.append(
        "timezoneOffset",
        DateTime.now().offset.toString()
      );

      console.log(DateTime.now());

      const res = await fetch(url.toString());
      const data = await res.json();

      const times = new Times(data.times);
      set(() => ({ times }));

      setData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  },
  timer: undefined,
  updateTimer: () => {
    const { times } = get();
    if (!times) return;
    const timer = times.timer;
    set(() => ({ timer }));
  },
}));

export default store;
