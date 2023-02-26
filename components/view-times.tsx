import store from "@/stores/list";
import { TimeNames } from "@/lib/types";

export default function ViewTimes() {
  const { times } = store();

  if (!times) return null;

  return (
    <div className="grid h-full">
      {Object.keys(times.today).map((key) => {
        const time = times.today[key as TimeNames];
        return (
          <div className="bg-blue-50 px-6" key={key}>
            <div className="mx-auto flex h-full max-w-screen-sm items-center">
              <div>
                {times.time.now === key && (
                  <div className="h-4 w-4 rounded-full bg-red-500">now</div>
                )}
                <h4 className="">{key}</h4>
                <h4 className="text-xl font-bold">{time}</h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
