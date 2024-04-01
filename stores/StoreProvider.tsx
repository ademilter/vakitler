import { type PropsWithChildren, useEffect, useRef } from "react";
import type { StoreType } from "./global";
import { initializeStore, Provider } from "./global";

export interface PreloadedStoreInterface {}

// export interface PreloadedStoreInterface extends StoreInterface {}

export default function StoreProvider({
  children,
  ...props
}: PropsWithChildren<PreloadedStoreInterface>) {
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  const times = storeRef.current?.getState().times;

  useEffect(() => {
    storeRef.current?.getState().initApp();
  }, []);

  return <Provider value={storeRef.current}>{children}</Provider>;
}
