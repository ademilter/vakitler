import store from "@/stores/list";

export default function Timer() {
  const { timer, times } = store();

  if (!timer) return null;

  return (
    <span className="flex flex-col items-center">
      <h2 className="text-3xl capitalize">{times?.time.now}</h2>

      <div className="relative mt-4 px-4 py-2 text-xl">
        <span className="absolute inset-0 rounded-xl bg-current opacity-10" />
        <span className="relative z-10">
          <b>{timer[0]}</b> saat <b>{timer[1]}</b> dk
        </span>
      </div>
    </span>
  );
}
