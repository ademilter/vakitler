import store from "@/stores/list";

export default function Timer() {
  const { timer, times } = store();

  if (!timer) return null;

  return (
    <span className="text-current">
      <h2 className="text-4xl capitalize">{times?.time.now}</h2>

      <p>vaktin çıkmasına</p>

      <div className="text-3xl tabular-nums leading-none">
        {timer.join(":")}
      </div>
    </span>
  );
}
