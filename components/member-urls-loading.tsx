export function UserUrlsLoading() {
  return (
    <div className="flex flex-col gap-3 white-card animate-pulse dark:dark-card">
      <div className="flex gap-2 items-center *:rounded-xl">
        <div className="size-7 bg-neutral-300 dark:bg-neutral-700" />
        <div className="w-24 h-7 bg-neutral-300 dark:bg-neutral-700" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-20 *:break-words flex flex-col gap-1 white-card bg-neutral-300 dark:bg-neutral-700"
        />
      ))}
    </div>
  );
}
