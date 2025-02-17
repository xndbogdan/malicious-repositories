import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Lottie from 'lottie-react'
import rewards from '../../../public/Marketing/imgs/anim/rewards-02.json'

function ConnectwUsers() {
  return (
    <section className="flex justify-between w-full py-12 md:py-24">
        <div className="flex flex-col-reverse md:flex-row max-w-6xl items-center justify-between md:space-x-20 px-5 mx-auto w-full">
            <div className="w-full md:w-1/2 py-8 md:py-0 justify-between">
                <div className="">
                    <Lottie className="w-[80%] md:w-[90%] mx-auto" animationData={rewards} />
                </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="">Connect with users by giving rewards</h3>
                <p className="my-5 text-lightTertiaryGreen text-lg">Quia sed quod fuga tempora. Officiis voluptas asperiores numquam. Velit occaecati et et blanditiis ab placeat qui.</p>
                <p className="my-5 text-white/60 text-lg">Quia sed quod fuga tempora. Officiis voluptas asperiores numquam. Velit occaecati et et blanditiis ab placeat qui.</p>
                
                <div className="flex justify-between space-x-4 items-center">
                    <button className="buttonTertiary w-full md:max-w-[170px]">Learn more</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ConnectwUsers