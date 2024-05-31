'use client'
import React, { useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl'
import { DeleteCommentComponent } from '../comment/deleteComment'

export const DropdownComment = ({ idComment }: { idComment: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="max-md:px-2 px-1 py-1 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-700"
      >
        <SlOptionsVertical className="max-md:w-3 w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-600 border rounded ">
          <ul>
            <DeleteCommentComponent idComment={idComment} />
          </ul>
        </div>
      )}
    </div>
  )
}
