import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#151D22]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 sm:flex-row">

        <Link
          to="/home"
          className="text-lg font-bold tracking-wide text-white"
        >
          Social<span className="text-cyan-400">App</span>
        </Link>

        <p className="text-center text-sm text-gray-400">
          Connect, share and stay in touch with your community.
        </p>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Social App. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
