
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function CreateComment({ id }) {
  const query = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      content: '',
      image: '',
    },
  })

  function addComment(values) {
    const formData = new FormData()

    if (values.content?.trim()) {
      formData.append('content', values.content.trim())
    }

    if (values.image?.[0]) {
      formData.append('image', values.image[0])
    }

    return axios.post(
      `https://route-posts.routemisr.com/posts/${id}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    )
  }

  const { mutate, isPending } = useMutation({
    mutationFn: addComment,

    onSuccess: () => {
      reset()
      query.invalidateQueries({ queryKey: ['getPosts'] })
      toast.success('Comment added successfully')
    },

    onError: () => {
      toast.error("Couldn't add comment")
    },
  })

  function handleComment(values) {
    if (!values.content?.trim() && !values.image?.[0]) {
      return
    }

    mutate(values)
  }

  return (
    <form onSubmit={handleSubmit(handleComment)}>
      <div className="flex items-center gap-2">

        <label
          htmlFor={`comment-image-${id}`}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#151D22] text-lg text-green-400 transition hover:bg-green-400/10"
          title="Add photo"
        >
          <i className="fas fa-image" />
        </label>

        <input
          {...register('image')}
          id={`comment-image-${id}`}
          type="file"
          accept="image/*"
          hidden
        />

        <input
          {...register('content')}
          type="text"
          placeholder="Write a comment..."
          className="h-11 min-w-0 flex-1 rounded-full border border-white/10 bg-[#151D22] px-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-500"
        />

        <button
          type="submit"
          disabled={isPending}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-[#151D22] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          title="Send comment"
        >
          {isPending ? (
            <i className="fas fa-spinner fa-spin" />
          ) : (
            <i className="fas fa-paper-plane" />
          )}
        </button>

      </div>
    </form>
  )
}
