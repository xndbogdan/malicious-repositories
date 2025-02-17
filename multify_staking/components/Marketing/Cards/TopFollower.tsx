import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

export default function TopFollower() {
  return (
    <article className="flex flex-row bg-darkPrimaryGreen rounded-lg items-center space-x-5 border-[1.37px] border-w border-tertiaryGreen/40 align-center max-w-[359px] mx-auto p-8 my-8 md:my-0 snap-center hover:opacity-100 opacity-80 transition-opacity duation-200 overflow-hidden">
        <Image className="rounded-lg group-hover:scale-105 transition duration-300 ease-in-out" src="/assets/imgs/followerPhoto.png" alt="Default follower photo" width="120" height="120" />
        
        <div className="flex flex-col">
            <span className="text-[22px] font-semibold text-white w-full my-1">Michael Bell</span>
            <span className="text-[32px] font-medium text-white my-1"><span className="text-primaryGreen mr-1">$</span>2,920</span>
        </div>
    </article>
  )
}