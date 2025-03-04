export function UserUrlsLoading() {
  return (
    <div className="flex flex-col gap-3 white-card animate-pulse animate-fade-in">
      <div className="flex gap-2 items-center *:rounded-xl">
        <div className="size-7 bg-neutral-300" />
        <div className="w-24 h-7 bg-neutral-300" />
      </div>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-32 *:break-words flex flex-col gap-1 white-card bg-neutral-300"
        />
      ))}
    </div>
  );
}
