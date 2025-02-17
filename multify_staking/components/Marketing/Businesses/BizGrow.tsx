import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Lottie from 'lottie-react'
import bizRocket from '../../../public/Marketing/imgs/anim/bizRocket.json'

function BizGrow() {
  return (
    <section className="flex justify-between w-full py-5">
        <div className="flex flex-col-reverse md:flex-row max-w-6xl items-center justify-between px-5 mx-auto w-full">
            <div className="w-full md:w-1/2 py-8 md:py-0">
            <div className="">
                <Lottie animationData={bizRocket} />
            </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="">Grow your business</h3>
                <p className="my-5 text-white/60 text-lg">Quia sed quod fuga tempora. Officiis voluptas asperiores numquam. Velit occaecati et et blanditiis ab placeat qui.</p>
                <div className="flex py-4 justify-between space-x-9 md:space-x-3 text-left w-full">
                    <div className="text-3xl md:6xl">
                        <span className="numberStat">25</span>x
                        <span className="text-lg block text-gray">Profit</span>
                    </div>
                    <div className="text-3xl md:6xl">
                        <span className="numberStat">80</span>%
                        <span className="text-lg block text-gray">User satisfaction</span>
                    </div>
                    <div className="text-3xl md:6xl">
                        <span className="numberStat">4</span>x
                        <span className="text-lg block text-gray">More customers</span>
                    </div>
                </div>
                <div className="flex justify-between space-x-4 items-center">
                    <button className="buttonTertiary w-full md:max-w-[170px]">Learn more</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BizGrow