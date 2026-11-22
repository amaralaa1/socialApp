
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import Singelcomment from '../SingelComment/Singelcomment'
import CreateComment from '../createcomment/CreateComment'
import DropDown from '../DropDown/DropDown'
import { UserData } from '../context/UserData'

export default function Postcard({ Post }) {
  const { data: userData } = useContext(UserData)
  const query = useQueryClient()

  function LikePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${Post.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    )
  }

  const {
    data: likepost,
    mutate: likeFn,
    isPending,
  } = useMutation({
    mutationFn: LikePost,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['getPosts'] })
      query.invalidateQueries({ queryKey: ['userPosts'] })
      toast.success('Liked')
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const isLiked = likepost?.data?.data?.liked

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#202B31] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-xl">

      {/* Post Header */}
      <header className="flex items-center justify-between p-5 sm:p-6">

        <Link
          to={`/home/postdetails/${Post.id}`}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-cyan-400/40 bg-[#151D22] shadow-md">
            {Post.user?.photo ? (
              <img
                src={Post.user.photo}
                alt={Post.user?.name || 'User'}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-cyan-400">
                {Post.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white transition hover:text-cyan-400">
              {Post.user?.name || 'User'}
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              {Post.createdAt}
            </p>
          </div>
        </Link>

        {Post.user?._id === userData?._id && (
          <DropDown id={Post._id} />
        )}

      </header>

      {/* Post Content */}
      {Post.body && (
        <div className="px-5 pb-5 sm:px-6">
          <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-200 sm:text-base">
            {Post.body}
          </p>
        </div>
      )}

      {/* Post Image */}
      {Post.image && (
        <div className="overflow-hidden border-y border-white/5 bg-[#151D22]">
          <img
            src={Post.image}
            alt="Post"
            className="max-h-[600px] w-full object-contain"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="mx-5 flex items-center justify-between gap-2 border-b border-white/10 py-3 text-sm text-gray-400 sm:mx-6">

        <button
          onClick={() => likeFn()}
          disabled={isPending}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-2 py-3 transition duration-200 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50 ${
            isLiked
              ? 'bg-cyan-400/10 text-cyan-400'
              : 'hover:text-cyan-400'
          }`}
        >
          <i className="fas fa-thumbs-up" />
          <span>{Post.likesCount || 0} Likes</span>
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-2 py-3 transition duration-200 hover:bg-white/5 hover:text-cyan-400"
        >
          <i className="fas fa-comment" />
          <span>Comment</span>
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-2 py-3 transition duration-200 hover:bg-white/5 hover:text-cyan-400"
        >
          <i className="fas fa-share" />
          <span>Share</span>
        </button>

      </div>

      {/* Add Comment */}
      <div className="px-5 py-5 sm:px-6">
        <CreateComment id={Post.id} />
      </div>

      {/* Top Comment */}
      {Post.topComment && (
        <div className="border-t border-white/10 bg-[#1B2328]/50 px-5 py-4 sm:px-6">
          <Singelcomment comment={Post.topComment} />
        </div>
      )}

    </article>
  )
}
