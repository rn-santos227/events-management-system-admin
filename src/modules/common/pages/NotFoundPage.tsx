import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="max-w-md">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[6rem] font-extrabold text-brand-600"
        >
          404
        </motion.h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-slate-600">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
      </div>
    </main>
  )
}
