export function PageSkeleton() {
  return (
    <div>
      <div className="card p-3.5">
        <div className="skeleton h-11 w-full" />
        <div className="mt-2.5 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-9 w-24 rounded-full" />
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card overflow-hidden p-0">
            <div className="skeleton aspect-[4/3] w-full rounded-none" />
            <div className="space-y-2 p-3.5">
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-2/3" />
              <div className="skeleton h-9 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
