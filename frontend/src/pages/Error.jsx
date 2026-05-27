// src/pages/Error.jsx

import { Link } from "react-router-dom"

export default function Error() {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5">
      <div className="text-center">
        <p className="text-9xl font-bold text-richblack-300">404</p>
        <p className="mt-4 text-3xl font-semibold">Page Not Found</p>
        <p className="mt-2 text-richblack-400">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-yellow-50 px-6 py-3
                     font-semibold text-richblack-900"
        >
          Go back Home
        </Link>
      </div>
    </div>
  )
}