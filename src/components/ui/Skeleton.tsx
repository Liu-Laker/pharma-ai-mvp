export function Skeleton({ className = '', width, height }: { className?: string; width?: string; height?: string }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height }}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton width="40px" height="40px" className="rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton width="120px" height="16px" />
          <Skeleton width="80px" height="12px" />
        </div>
      </div>
      <Skeleton width="100%" height="60px" />
      <div className="flex gap-2">
        <Skeleton width="80px" height="24px" className="rounded-full" />
        <Skeleton width="80px" height="24px" className="rounded-full" />
      </div>
    </div>
  )
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
