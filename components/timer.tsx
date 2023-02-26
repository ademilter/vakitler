import store from "@/stores/list";

export default function Timer({ show = false }: { show: boolean }) {
  const { timer } = store();

  if (!show) return null;
  if (!timer) return null;

  return (
    <div className="absolute inset-y-0 right-8 flex items-center">
      <div className="flex rounded-full bg-white px-4 py-2 shadow">
        <span className="text-3xl tabular-nums leading-none">
          {timer.join(":")}
        </span>
      </div>
    </div>
  );
}
