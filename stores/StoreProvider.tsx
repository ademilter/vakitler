import { type PropsWithChildren, useRef } from "react";
import type { StoreType } from "./global";
import { initializeStore, Provider } from "./global";

export interface PreloadedStoreInterface {}

export default function StoreProvider({
  children,
  ...props
}: PropsWithChildren<PreloadedStoreInterface>) {
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
}
