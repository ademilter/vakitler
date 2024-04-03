import { type PropsWithChildren, useEffect, useRef } from "react";
import type { StoreType } from "./global";
import { initializeStore, Provider } from "./global";
import { useRouter } from "next/router";

export interface PreloadedStoreInterface {}

export default function StoreProvider({
  children,
  ...props
}: PropsWithChildren<PreloadedStoreInterface>) {
  const { push } = useRouter();
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  useEffect(() => {
    if (!storeRef.current) return;

    const { hasLocalData, initApp } = storeRef.current.getState();

    if (hasLocalData()) {
      initApp();
    } else {
      push("/settings/country");
    }
  }, [storeRef.current]);

  return <Provider value={storeRef.current}>{children}</Provider>;
}
