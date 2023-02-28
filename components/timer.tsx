import { Vakitler } from "@/lib/const";
import { TimeNames } from "@/lib/types";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";

export default function Timer() {
  const { timer, times } = useContext(CommonStoreContext);

  if (!timer) return null;

  return (
    <span className="flex flex-col items-center">
      <h2 className="text-4xl capitalize">
        {Vakitler[times?.time.now as TimeNames]}
      </h2>

      <div className="relative mt-4 px-4 py-2 text-xl">
        <span className="absolute inset-0 rounded-2xl bg-current opacity-10" />
        <span className="relative z-10">
          {timer[0] === 0 && timer[1] === 0 ? (
            <>
              Vakit çıkmak üzere: <b>{timer[2]}</b>
            </>
          ) : (
            <>
              <b className="tabular-nums">{timer[0]}</b> saat{" "}
              <b className="tabular-nums">{timer[1]}</b> dk{" "}
              <b className="tabular-nums">{timer[2]}</b> sn
            </>
          )}
        </span>
      </div>
    </span>
  );
}
