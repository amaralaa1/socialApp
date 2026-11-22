
import React from 'react'

export default function Singelcomment({ comment }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-[#151D22]/70 p-3">

      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-gray-700">
        {comment?.commentCreator?.photo ? (
          <img
            src={comment.commentCreator.photo}
            alt={comment?.commentCreator?.name || 'User'}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-semibold text-white">
            {comment?.commentCreator?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="inline-block max-w-full rounded-2xl bg-[#26343B] px-4 py-3">
          <h4 className="mb-1 text-sm font-semibold text-white">
            {comment?.commentCreator?.name || 'User'}
          </h4>

          {comment?.content && (
            <p className="break-words text-sm leading-6 text-gray-300">
              {comment.content}
            </p>
          )}
        </div>

        {comment?.image && (
          <img
            src={comment.image}
            alt="Comment attachment"
            className="mt-2 max-h-56 max-w-full rounded-xl object-cover"
          />
        )}
      </div>

    </div>
  )
}
