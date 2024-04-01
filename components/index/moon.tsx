import React, { useEffect } from "react";
import { cx } from "@/utils/helper";
import { Phease } from "@/utils/const";
import { useStore } from "@/stores/global";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function Moon({ className }: Props) {
  const { times } = useStore(store => ({
    times: store.times,
  }));

  const [slider, _] = React.useState<boolean>(false);
  const [debug, __] = React.useState<boolean>(false);

  const [phease, setPhease] = React.useState<Phease>(
    times?.today?.moonPhease || Phease.ictima
  );

  useEffect(() => {
    if (phease === Phease.ictima) return;
    //  set phease from 0 to current
    for (let i = 0; i <= phease; i++) {
      setTimeout(() => setPhease(i), i * 30);
    }
  }, []);

  const debugCSS = debug && "ring-2 ring-red-500";

  return (
    <>
      <div
        className={cx(
          "size-24 -rotate-[30deg]",
          "relative overflow-hidden rounded-full",
          "inline-flex justify-center items-center",
          "shadow-[0_0_40px_rgba(255,255,255,0.2)]",
          debugCSS,
          className
        )}
      >
        <span
          className={cx(
            "absolute inset-0 rounded-full",
            phease > Phease.dolunay ? "bg-moon-dark" : "bg-moon-light"
          )}
        />

        {phease < Phease.dolunay && (
          <>
            <span
              data-name="11"
              className={cx(
                "absolute left-0 h-full bg-moon-dark rounded-l-full w-1/2",
                debugCSS
              )}
            />
            <span
              data-name="12"
              className={cx(
                "absolute h-full rounded-[100%] w-full",
                debugCSS,
                phease === Phease.ruyet && "w-[90%]",
                phease === Phease.r1 && "w-[80%]",
                phease === Phease.r2 && "w-[70%]",
                phease === Phease.r3 && "w-[55%]",
                phease === Phease.r4 && "w-[35%]",
                phease === Phease.r5 && "w-[20%]",
                phease === Phease.ilkdordun && "w-[10%]",
                phease > Phease.ilkdordun ? "bg-moon-light" : "bg-moon-dark",
                phease === Phease.i1 && "w-[22%]",
                phease === Phease.i2 && "w-[34%]",
                phease === Phease.i3 && "w-[46%]",
                phease === Phease.i4 && "w-[58%]",
                phease === Phease.i5 && "w-[70%]",
                phease === Phease.i6 && "w-[82%]",
                phease === Phease.i7 && "w-[90%]"
              )}
            />
          </>
        )}

        {/* -------------- */}

        {phease > Phease.dolunay && (
          <>
            <span
              data-name="21"
              className={cx(
                "absolute left-0 h-full bg-moon-light rounded-l-full w-1/2",
                debugCSS
              )}
            />
            <span
              data-name="22"
              className={cx(
                "absolute h-full rounded-[100%] w-full",
                debugCSS,
                phease === Phease.d1 && "w-[85%]",
                phease === Phease.d2 && "w-[70%]",
                phease === Phease.d3 && "w-[60%]",
                phease === Phease.d4 && "w-[50%]",
                phease === Phease.d5 && "w-[40%]",
                phease === Phease.d6 && "w-[30%]",
                phease === Phease.d7 && "w-[20%]",
                phease === Phease.sondordun && "w-[10%]",
                phease > Phease.sondordun ? "bg-moon-dark" : "bg-moon-light",
                phease === Phease.sd1 && "w-[20%]",
                phease === Phease.sd2 && "w-[30%]",
                phease === Phease.sd3 && "w-[45%]",
                phease === Phease.sd4 && "w-[60%]",
                phease === Phease.sd5 && "w-[75%]",
                phease === Phease.sd6 && "w-[90%]"
              )}
            />
          </>
        )}
      </div>

      {slider && (
        <div className="mt-4 flex justify-center items-center gap-2">
          <input
            type="range"
            value={phease}
            min={Phease.ictima}
            max={Phease.sd6}
            onChange={e => setPhease(Number(e.target.value) as Phease)}
          />
        </div>
      )}
    </>
  );
}
