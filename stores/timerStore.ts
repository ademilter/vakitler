import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { Times } from "@/lib/model";
import { TypeTimer, TimeNames } from "@/lib/types";

interface ICommonState {
  times: undefined | Times;
  rawTimes: undefined | Times;
  timer: TypeTimer;
  timerRamadan: TypeTimer;
  now: TimeNames;
  actions: {
    setTimer: (timer: TypeTimer) => void;
    setTimes: (times: Times) => void;
    setRawTimes: (rawTimes: Times) => void;
    setTimerRamadan: (timerRamadan: TypeTimer) => void;
    setNow: (value: TimeNames) => void;
  };
}

export const useTimerStore = create<ICommonState>(set => ({
  rawTimes: undefined,
  times: undefined,
  timer: [0, 0, 0],
  timerRamadan: [0, 0, 0],
  now: TimeNames.Imsak,
  actions: {
    setTimer: (timer: TypeTimer) => set(() => ({ timer })),
    setTimes: (times: Times) => set(() => ({ times })),
    setRawTimes: (rawTimes: Times) => set(() => ({ rawTimes })),
    setTimerRamadan: (timerRamadan: TypeTimer) => set(() => ({ timerRamadan })),
    setNow: (now: TimeNames) => set(() => ({ now })),
  },
}));

export const useRawTimes = () => useTimerStore(state => state.rawTimes);
export const useTimes = () => useTimerStore(state => state.times);
export const useTimer = () => useTimerStore(state => state.timer);
export const useTimerRamadan = () => useTimerStore(state => state.timerRamadan);
export const useNow = () => useTimerStore(state => state.now)
export const useTimerStoreActions = () => useTimerStore(state => state.actions);

export const useUpdateTimer = () => {
  const { setTimer, setTimerRamadan } = useTimerStoreActions();
  const times = useTimes();

  if (!times) return;
  setTimer(times?.timer() as TypeTimer);
  setTimerRamadan(times?.timerRamadan() as TypeTimer);
};


  if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("TimerStore", useTimerStore);
  }