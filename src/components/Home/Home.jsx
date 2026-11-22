
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ScaleLoader } from 'react-spinners'
import Postcard from '../Postcard/Postcard'
import CreatePost from '../createpost/CreatePost'

export default function Home() {
  function getAllPost() {
    return axios.get('https://route-posts.routemisr.com/posts', {
      params: {
        sort: '-createdAt',
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
  }

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['getPosts'],
    queryFn: getAllPost,
    refetchInterval: 30000,
    select: (res) => res?.data.data.posts,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <ScaleLoader color="#22d3ee" />
          <p className="text-sm text-gray-400">Loading your feed...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#202B31] p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-2xl text-red-400">
            <i className="fas fa-exclamation-circle" />
          </div>

          <h2 className="mb-2 text-xl font-semibold text-white">
            Something went wrong
          </h2>

          <p className="text-sm text-gray-400">
            {error?.message || 'Unable to load posts. Please try again.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Welcome Header */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-[#202B31] via-[#1C3038] to-[#12313B] p-6 shadow-lg sm:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
              <i className="fas fa-globe" />
              SOCIAL COMMUNITY
            </span>

            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Your Feed
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-gray-300">
              Discover what's happening in your community and stay connected with everyone.
            </p>
          </div>
        </div>

        {/* Create Post */}
        <div className="mb-10">
          <CreatePost />
        </div>

        {/* Posts Header */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              Recent Posts
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Latest updates from your community
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Latest
          </span>
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-6">
          {data?.length > 0 ? (
            data.map((Post) => (
              <Postcard key={Post.id} Post={Post} />
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#202B31] px-6 py-14 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10 text-2xl text-cyan-400">
                <i className="fas fa-comments" />
              </div>

              <h3 className="text-xl font-semibold text-white">
                No posts yet
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Be the first one to share something with the community.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}


























