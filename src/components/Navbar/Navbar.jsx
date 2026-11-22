
import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserData'
import myProfile from '../../assets/my-profile.jpg'

export default function Navbar() {
  const { Token, setToken, data } = useContext(UserData)
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('userToken')
    setToken(null)
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-cyan-500/15 text-cyan-400'
        : 'text-gray-300 hover:bg-white/10 hover:text-white'
    }`

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#151D22]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link
          to={Token ? '/home' : '/login'}
          className="flex items-center gap-2 text-xl font-bold tracking-wide text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-lg text-[#151D22]">
            S
          </span>
          <span>
            Social<span className="text-cyan-400">App</span>
          </span>
        </Link>

        {Token && (
          <div className="hidden items-center gap-2 md:flex">
            <NavLink to="/home" className={linkClass}>
              Home
            </NavLink>

            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
          </div>
        )}

        <div className="flex items-center gap-3">
          {!Token && (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-[#151D22] transition hover:bg-cyan-400"
              >
                Register
              </Link>
            </div>
          )}

          {Token && (
            <div className="dropdown dropdown-end">
              <button
                type="button"
                tabIndex={0}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1.5 pr-3 transition hover:bg-white/10"
              >
                <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-cyan-500/50 bg-gray-700">
                  <img
                    src={myProfile}
                    alt="Profile"
                    className="h-full w-full object-cover object-center scale-[1.6]"
                  />
                </div>

                <span className="hidden max-w-28 truncate text-sm font-medium text-white sm:block">
                  {data?.name || 'My Account'}
                </span>

                <span className="text-xs text-gray-400">▼</span>
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[60] mt-3 w-52 rounded-xl border border-white/10 bg-[#202B31] p-2 text-white shadow-xl"
              >
                <li>
                  <Link
                    to="/profile"
                    className="rounded-lg py-3 text-gray-200 hover:bg-white/10 hover:text-cyan-400"
                  >
                    My Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {Token && (
        <div className="flex items-center justify-center gap-2 border-t border-white/5 px-3 py-2 md:hidden">
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
        </div>
      )}
    </nav>
  )
}
