
import React, { useContext } from 'react'
import { UserData } from '../context/UserData'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ScaleLoader } from 'react-spinners'
import Postcard from '../Postcard/Postcard'
import profileCover from '../../assets/profile-cover.jpg'
import myProfile from '../../assets/my-profile.jpg'

export default function Profile() {
  const { data: userData } = useContext(UserData)

  const userId = userData?.id || userData?._id

  function getUserPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userId}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    )
  }

  const {
    data: userPosts,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['userPosts'],
    queryFn: getUserPosts,
    enabled: Boolean(userId),
    select: (res) => res?.data.data.posts,
  })

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">

        <section className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-[#202B31] shadow-xl">

          {/* Cover */}
          <div className="relative h-44 overflow-hidden sm:h-60">
            <img
              src={profileCover}
              alt="Profile cover"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#061629]/50 via-[#061629]/20 to-cyan-900/30" />

            <div className="absolute bottom-5 left-6 z-10">
              <span className="rounded-full border border-cyan-300/30 bg-[#061629]/60 px-4 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-md">
                MY PROFILE
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="px-6 pb-8">

            <div className="relative z-10 -mt-16 flex flex-col items-center gap-4 sm:flex-row sm:items-end">

              <div className="relative h-36 w-36 sm:h-40 sm:w-40 shrink-0 overflow-hidden rounded-full border-4 border-[#202B31] bg-gray-700 shadow-xl">
                <img
                  src={myProfile}
                  alt={userData?.name || 'Profile'}
                  className="h-full w-full object-cover object-[center_22%] scale-[1.7]"
                />
              </div>

              <div className="pb-2 text-center sm:flex-1 sm:text-left">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  {userData?.name || 'User'}
                </h1>

                <p className="mt-2 text-sm text-gray-400">
                  Welcome to your profile
                </p>
              </div>

              <div className="pb-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-medium text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Active Account
                </span>
              </div>

            </div>

            {/* Profile Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">

              <div className="rounded-xl bg-[#151D22] p-4 text-center">
                <h3 className="text-2xl font-bold text-cyan-400">
                  {userPosts?.length ?? (isLoading ? '...' : 0)}
                </h3>
                <p className="mt-1 text-sm text-gray-400">Posts</p>
              </div>

              <div className="rounded-xl bg-[#151D22] p-4 text-center">
                <h3 className="text-2xl font-bold text-cyan-400">
                  <i className="fas fa-user-check text-lg" />
                </h3>
                <p className="mt-1 text-sm text-gray-400">Member</p>
              </div>

            </div>

          </div>
        </section>

        {/* User Posts */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">My Posts</h2>
              <p className="mt-1 text-sm text-gray-400">
                All your shared posts in one place.
              </p>
            </div>

            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-400">
              {userPosts?.length || 0} Posts
            </span>
          </div>

          {isLoading && (
            <div className="flex min-h-64 flex-col items-center justify-center gap-4">
              <ScaleLoader color="#22d3ee" />
              <p className="text-sm text-gray-400">Loading your posts...</p>
            </div>
          )}

          {isError && (
            <div className="rounded-2xl border border-red-500/20 bg-[#202B31] p-8 text-center">
              <i className="fas fa-exclamation-circle mb-3 text-3xl text-red-400" />
              <h3 className="text-lg font-semibold text-white">
                Couldn't load your posts
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {error?.message || 'Please try again later.'}
              </p>
            </div>
          )}

          {!isLoading && !isError && userPosts?.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#202B31] px-6 py-14 text-center">
              <i className="fas fa-camera mb-4 text-4xl text-gray-500" />
              <h3 className="text-xl font-semibold text-white">No posts yet</h3>
              <p className="mt-2 text-sm text-gray-400">
                Your posts will appear here when you share something.
              </p>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="flex flex-col gap-6">
              {userPosts?.map((Post) => (
                <Postcard key={Post.id} Post={Post} />
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  )
}
