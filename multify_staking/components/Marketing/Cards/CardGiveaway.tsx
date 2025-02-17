import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

function CardGiveaway() {
  return (
    <article className="flex flex-col bg-darkPrimaryGreen rounded-lg items-center space-x-0 space-y-4 md:space-y-3 flex-shrink-0 border-[1.37px] border-w border-tertiaryGreen/40 align-center max-w-[234px] mx-auto p-3.5 my-8 md:my-0 snap-center hover:opacity-100 opacity-80 cursor-pointer transition-opacity duation-200 overflow-hidden">
        <motion.img 
        initial={{ opacity: 0.10 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .300 }}
        className="rounded-lg group-hover:scale-105 transition duration-300 ease-in-out w-full h-auto object-cover" src="/Marketing/imgs/stock/iphone-01-512.jpg" alt="iPhone" width="206" height="206" />
        <h4 className="font-medium text-white text-base w-full my-3">Marketing giveaway!</h4>
        <div className="flex w-full space-x-3 my-3">
            <span className="border-[0.91px] border-tertiaryGreen/40 rounded-sm text-white text-xs py-1 px-2">Technology</span>
            <span className="border-[0.91px] border-tertiaryGreen/40 rounded-sm text-white text-xs py-1 px-2">1hrs 34mins</span>
        </div>
        <div className="flex justify-between w-full">
            <span className="font-medium text-white text-base">$3,000</span>
            <span className="flex space-x-2 text-white text-xs uppercase group-hover:text-yellow items-center transition duration-300 ease-in-out "><span>Learn More</span> <Image className="w-[18px] h-[11px]" src="/Marketing/imgs/right-arrow.png" alt="right arrow" width="18" height="11"/></span>
        </div>
    </article>
  )
}

export default CardGiveaway