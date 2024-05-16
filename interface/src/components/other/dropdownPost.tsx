'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { SlOptions } from 'react-icons/sl'

export const DropdownPost = ({ idPost }: { idPost: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-700"
      >
        <SlOptions className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-600 border rounded ">
          <ul>
            <li className="py-2 px-4 hover:bg-zinc-800 cursor-pointer rounded">
              <Link href={`/post/${idPost}`}>Editar</Link>
            </li>
            <li className="py-2 px-4 hover:bg-zinc-800 cursor-pointer rounded">
              <Link href="/user/profile">Remove</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
