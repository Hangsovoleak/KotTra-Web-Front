export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 py-8 font-mono text-gray-800 antialiased">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        {(title || subtitle) && (
          <div className="mb-6">
            {title && (
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
