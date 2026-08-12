export function AppSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-light-gray">
      <div className="h-1 w-full bg-gradient-brand" />
      <div className="h-16 w-full border-b border-muted-gray/60 bg-white" />
      <div className="flex-1 p-6">
        <div className="h-8 w-64 animate-pulse rounded-button bg-muted-gray/40" />
      </div>
    </div>
  );
}
