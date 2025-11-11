export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6">
      <div className="max-w-md">
        <h1 className="text-[6rem] font-extrabold text-brand-600 leading-none">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
      </div>
    </div>
  )
}