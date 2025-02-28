export default function Loading() {
  return <div>로딩중</div>;
}

export function UserUrlsLoading() {
  return (
    <div className="flex flex-col gap-3 white-card animate-pulse">
      <div className="flex gap-2 items-center *:rounded-md">
        <div className="size-6 bg-neutral-300" />
        <div className="w-24 h-6 bg-neutral-300" />
      </div>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="*:break-words flex flex-col gap-1 white-card bg-neutral-300"
        >
          <div className="w-20 h-6" />
          <div className="w-20 h-6" />
          <div className="w-20 h-6" />
          <div className="w-20 h-6" />
        </div>
      ))}
    </div>
  );
}
