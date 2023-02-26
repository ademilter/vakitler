import { create } from "zustand";
import { Data } from "@/lib/types";
import { Times } from "@/lib/model";

interface State {
  loading: boolean;
  setLoading: (state: boolean) => void;
  data: Data;
  setData: (data: Data) => void;
  times: Times | undefined;
  fetchData: () => Promise<void>;
}

const store = create<State>((set, get) => ({
  loading: true,
  setLoading: (state) => set(() => ({ loading: state })),
  data: null,
  setData: (data) => set(() => ({ data })),
  times: undefined,
  fetchData: async () => {
    const { setLoading, setData } = get();

    try {
      setLoading(true);
      const res = await fetch("/api");
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
}));

export default store;
