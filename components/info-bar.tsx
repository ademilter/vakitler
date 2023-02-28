import store from "@/stores/times";

export default function InfoBar({}: {}) {
  const { times } = store();

  if (!times) return null;

  return (
    <div className="fixed inset-x-0 top-0 grid place-items-center">
      <div className="">asdasd</div>
    </div>
  );
}
