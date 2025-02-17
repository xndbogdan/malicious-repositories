import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HomeToggle() {
  return (
    <div className="items-center">
      <Link href="business">
        <Image className="motion-safe:animate-pulse hover:motion-safe:animate-none mb-6 cursor-pointer opacity-80 hover:opacity-100" src="/Marketing/imgs/user-toggle.svg" width="226" height="43" alt="Business Toggle" />
      </Link>
      {/* <label className="switch relative inline-block w-14 h-0">
        <span type="checkbox" className="text-white opacity-0 w-0 h-0 checked:bg-teal checked:translate-x-6 checked:absolute checked:cursor-pointer checked:top-0 checked:left-0 checked:right-0 checked:bottom-0 checked:bg-transparent checked:duration-300 checked:transition-all">label</span>
        <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-transparent duration-300 transition-all before:absolute before:content-['*'] before:w-6 before:h-6 before:left-1 before:bottom-1 before:bg-white before:duration-300 before:transition-all"></span>
      </label> */}
    </div>
  )
}