import { motion } from 'framer-motion'
import Footer from '@/components/shared/Footer'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[6rem] font-extrabold text-brand-600"
          >
            404
          </motion.h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-slate-600 mb-8">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}