import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import {
  ICity,
  ICountry,
  IRegion,
  IRelease,
  TimeFormat,
} from "@/lib/types";

// define initial state
const initialState = {
  appLoading: false,
  themeColor: "#777",
  _settings: {
    country: undefined,
    region: undefined,
    city: undefined,
    timeFormat: TimeFormat.TwentyFour,
    adjustments: [0, 0, 0, 0, 0, 0],
  },
  releases: [],
};

interface Settings {
  country: undefined | ICountry;
  region: undefined | IRegion;
  city: undefined | ICity;
  timeFormat: TimeFormat;
  adjustments: number[];
}

interface ICommonState {
  appLoading: boolean;
  themeColor: string;
  _settings: Settings;
  settings: Settings;
  releases: IRelease[];
  actions: {
    setAppLoading: (appLoading: boolean) => void;
    setReleases: (releases: IRelease[]) => void;
    setSettings: (settings: ICommonState["_settings"]) => void;
    _setSettings: (_settings: ICommonState["_settings"]) => void;
    setThemeColour: (value: string) => void;
  };
}

export const useCommonStore = create<ICommonState>(set => ({
  ...initialState,
  settings: initialState._settings,
  actions: {
    setAppLoading: (appLoading: boolean) => set(() => ({ appLoading })),
    setReleases: (releases: IRelease[]) => set(() => ({ releases })),
    setSettings: (settings: ICommonState["_settings"]) =>
      set(() => ({ settings })),
    _setSettings: (_settings: ICommonState["_settings"]) =>
      set(() => ({ _settings })),
    setThemeColour: (themeColor: string) => set(() => ({ themeColor })),
  },
}));

export const useAppLoading = () => useCommonStore(state => state.appLoading);
export const useSettings = () => useCommonStore(state => state.settings);
export const useThemeColour = () => useCommonStore(state => state.themeColor);
export const useStore = () => useCommonStore(state => state);
export const useCommonStoreActions = () =>
  useCommonStore(state => state.actions);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("GenericStore", useCommonStore);
}
