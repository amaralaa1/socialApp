import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/Userdata'


export default function Navbar() {

  let { Token, setToken , data } = useContext(UserData)

  let navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-16 bg-gray-300">

        <div className="flex-1">

          {/* يظهروا فقط بعد Login */}
          {Token !== null && (
            <>
              <Link to="/home" className="btn btn-ghost text-xl">
                Home
              </Link>

              <Link to="/profile" className="btn btn-ghost text-xl">
                Profile
              </Link>
            </>
          )}

          {/* يظهر فقط بعد Logout */}
          {Token === null && (
            <Link to="/social" className="btn btn-ghost text-xl">
              Social App
            </Link>
          )}

        </div>

        <div className="flex gap-2">

          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src={data?.photo}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >

              {Token !== null ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-2xl text-black"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/register" className="text-2xl text-black">
                      Register
                    </Link>
                  </li>

                  <li>
                    <Link to="/login" className="text-2xl text-black">
                      Login
                    </Link>
                  </li>
                </>
              )}

            </ul>

          </div>

        </div>

      </div>
    </>
  )
}