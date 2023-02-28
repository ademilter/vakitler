import { create } from "zustand";
import { Data, Timer } from "@/lib/types";
import { Times } from "@/lib/model";

interface State {
  loading: boolean;
  setLoading: (state: boolean) => void;
  data: Data;
  setData: (data: Data) => void;
  times: Times | undefined;
  fetchData: (params: {
    country: string;
    region: string;
    city: string;
    timezoneOffset: number;
  }) => Promise<void>;
  timer: undefined | Timer;
  updateTimer: () => void;
}

const store = create<State>((set, get) => ({
  loading: true,
  setLoading: (state) => set(() => ({ loading: state })),
  data: null,
  setData: (data) => set(() => ({ data })),
  times: undefined,
  fetchData: async (params) => {
    const { setLoading, setData } = get();

    console.log("fetching data", params)

    try {
      setLoading(true);
      const url = new URL("/api", window.location.origin);
      url.searchParams.append("country", params.country);
      url.searchParams.append("region", params.region);
      url.searchParams.append("city", params.city);
      url.searchParams.append(
        "timezoneOffset",
        params.timezoneOffset.toString()
      );

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
