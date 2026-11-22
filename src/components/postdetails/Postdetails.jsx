
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'

import Singelcomment from '../SingelComment/Singelcomment'
import CreateComment from '../createcomment/CreateComment'

export default function Postdetails() {
  const { id } = useParams()

  function getAllComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    )
  }

  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery({
    queryKey: ['getComments', id],
    queryFn: getAllComments,
    select: (res) => res?.data.data.comments,
  })

  function getPostDetails() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    )
  }

  const {
    data: post,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['postDetails', id],
    queryFn: getPostDetails,
    select: (res) => res?.data.data.post,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <ScaleLoader color="#22d3ee" />
        <p className="text-sm text-gray-400">Loading post...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#202B31] p-8 text-center">
          <i className="fas fa-exclamation-circle mb-4 text-3xl text-red-400" />

          <h2 className="text-xl font-semibold text-white">
            Couldn't load this post
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {error?.message || 'Please try again later.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Post Details
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            View the post and join the conversation.
          </p>
        </div>

        {/* Post */}
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#202B31] shadow-lg">

          <header className="flex items-center gap-3 p-5">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-cyan-500/40 bg-gray-700">
              {post?.user?.photo && (
                <img
                  src={post.user.photo}
                  alt={post.user?.name || 'User'}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-white">
                {post?.user?.name}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                {post?.createdAt}
              </p>
            </div>
          </header>

          {post?.body && (
            <div className="px-5 pb-4">
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-200">
                {post.body}
              </p>
            </div>
          )}

          {post?.image && (
            <div className="overflow-hidden bg-[#151D22]">
              <img
                src={post.image}
                alt="Post"
                className="max-h-[600px] w-full object-contain"
              />
            </div>
          )}

          <div className="mx-5 flex items-center justify-between border-b border-white/10 py-3 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <i className="fas fa-thumbs-up text-cyan-400" />
              {post?.likesCount || 0} Likes
            </span>

            <span className="flex items-center gap-2">
              <i className="fas fa-comment text-cyan-400" />
              {comments?.length || 0} Comments
            </span>
          </div>

          <div className="px-5 py-4">
            <CreateComment id={id} />
          </div>

        </article>

        {/* Comments */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white">
              Comments
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Join the conversation.
            </p>
          </div>

          {commentsLoading && (
            <div className="flex justify-center py-10">
              <ScaleLoader color="#22d3ee" />
            </div>
          )}

          {commentsError && (
            <div className="rounded-xl border border-red-500/20 bg-[#202B31] p-5 text-center text-sm text-red-400">
              Couldn't load comments.
            </div>
          )}

          {!commentsLoading && !commentsError && comments?.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#202B31] px-6 py-10 text-center">
              <i className="fas fa-comments mb-3 text-3xl text-gray-500" />

              <h3 className="font-semibold text-white">
                No comments yet
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Be the first to comment on this post.
              </p>
            </div>
          )}

          {!commentsLoading && !commentsError && (
            <div className="flex flex-col gap-3">
              {comments?.map((comment) => (
                <Singelcomment
                  key={comment._id}
                  comment={comment}
                />
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  )
}
