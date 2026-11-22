
import React, { useContext, useRef, useState } from 'react'
import { Button, Modal } from '@heroui/react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { UserData } from '../context/UserData'

export default function CreatePost() {
  const { data: userData } = useContext(UserData)

  const query = useQueryClient()
  const body = useRef(null)
  const image = useRef(null)

  const [imgSrc, setImgSrc] = useState(null)

  function previewImage(e) {
    const file = e.target.files[0]

    if (file) {
      setImgSrc(URL.createObjectURL(file))
    }
  }

  function closeImage() {
    if (imgSrc) {
      URL.revokeObjectURL(imgSrc)
    }

    setImgSrc(null)

    if (image.current) {
      image.current.value = ''
    }
  }

  function handlePostData() {
    const formData = new FormData()

    if (body.current?.value.trim()) {
      formData.append('body', body.current.value.trim())
    }

    if (image.current?.files[0]) {
      formData.append('image', image.current.files[0])
    }

    return formData
  }

  function createPost() {
    return axios.post(
      'https://route-posts.routemisr.com/posts',
      handlePostData(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    )
  }

  const {
    mutate,
    isPending,
  } = useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      if (body.current) {
        body.current.value = ''
      }

      if (image.current) {
        image.current.value = ''
      }

      if (imgSrc) {
        URL.revokeObjectURL(imgSrc)
      }

      setImgSrc(null)

      query.invalidateQueries({ queryKey: ['getPosts'] })

      toast.success('Post created successfully')
    },

    onError: () => {
      toast.error("Couldn't create post")
    },
  })

  return (
    <Modal>
      <section className="rounded-2xl border border-white/10 bg-[#202B31] p-5 shadow-lg shadow-black/10">

        <div className="mb-4 flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-cyan-500/40 bg-gray-700">
            {userData?.photo ? (
              <img
                src={userData.photo}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-semibold text-white">
                {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>

          <Modal.Trigger>
            <button
              type="button"
              className="w-full rounded-full bg-[#151D22] px-5 py-3 text-left text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              What's on your mind, {userData?.name?.split(' ')[0] || 'there'}?
            </button>
          </Modal.Trigger>
        </div>

        <div className="border-t border-white/10 pt-4">
          <Modal.Trigger>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-cyan-400"
            >
              <i className="fas fa-image text-lg text-green-400" />
              Add a new post
            </button>
          </Modal.Trigger>
        </div>

        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#202B31] text-white shadow-2xl">

              <Modal.CloseTrigger />

              <Modal.Header className="border-b border-white/10 p-5">
                <Modal.Heading className="text-xl font-bold text-white">
                  Create Post
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="p-5">

                <div className="mb-5 flex items-center gap-3">
                  <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-700">
                    {userData?.photo && (
                      <img
                        src={userData.photo}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {userData?.name || 'User'}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Posting to your feed
                    </p>
                  </div>
                </div>

                <textarea
                  ref={body}
                  className="min-h-32 w-full resize-none rounded-xl border border-white/10 bg-[#151D22] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-500"
                  rows="5"
                  placeholder="What's on your mind?"
                />

                {imgSrc && (
                  <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={imgSrc}
                      alt="Post preview"
                      className="max-h-72 w-full object-contain"
                    />

                    <button
                      type="button"
                      onClick={closeImage}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-500"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 p-3">
                  <span className="text-sm font-medium text-gray-300">
                    Add to your post
                  </span>

                  <label
                    htmlFor="Upload"
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-green-400 transition hover:bg-green-400/10"
                  >
                    <i className="fas fa-image text-lg" />
                    Photo
                  </label>

                  <input
                    ref={image}
                    onChange={previewImage}
                    id="Upload"
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </div>

              </Modal.Body>

              <Modal.Footer className="border-t border-white/10 p-5">
                <Button
                  onPress={mutate}
                  isDisabled={isPending}
                  className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-[#151D22] transition hover:bg-cyan-400 disabled:opacity-50"
                >
                  {isPending ? 'Publishing...' : 'Publish Post'}
                </Button>
              </Modal.Footer>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>

      </section>
    </Modal>
  )
}
