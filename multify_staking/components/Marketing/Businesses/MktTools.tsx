import React from 'react'
import Lottie from 'lottie-react'
import diamond from '../../../public/Marketing/imgs/anim/diamond.json'
import winner from '../../../public/Marketing/imgs/anim/winner-02.json'
import sparkles from '../../../public/Marketing/imgs/anim/sparkles.json'
import rewards from '../../../public/Marketing/imgs/anim/rewards-02.json'


type Props = {}

function MarketingTools({}: Props) {
  return (
    <section className="w-full py-12 md:py-24">
        <div className="max-w-6xl items-center px-5 mx-auto text-center">
            <h3 className="">Our marketing tools</h3>
            <p className="mb-0 md:mb-7 my-5 text-white/60 text-lg max-w-[560px] mx-auto">Quia sed quod fuga tempora. Officiis voluptas asperiores numquam. Velit occaecati et et blanditiis ab placeat qui.</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 justify-between w-full mx-auto md:max-w-6xl px-5 py-8 md:py-0 text-center">
            <div className="border rounded-md border-tertiaryGreen p-5">
                <span className="inline-block w-[60px] h-[60px]">
                    <Lottie animationData={diamond} />
                </span>
                <h4 className="mt-3">Giveaways</h4>
                <p className="my-5 text-white/60 text-base max-w-[560px] mx-auto">Commodo in vel auctor risus viverra arcu nullam. Ultrices sed libero velit, at vestibulum dignissim aliquet.</p>
            </div>
            <div className="border rounded-md border-tertiaryGreen p-5">
                <span className="inline-block w-[60px] h-[60px]">
                    <Lottie animationData={winner} />
                </span>
                <h4 className="mt-3">Referral Contest</h4>
                <p className="my-5 text-white/60 text-base max-w-[560px] mx-auto">Commodo in vel auctor risus viverra arcu nullam. Ultrices sed libero velit, at vestibulum dignissim aliquet.</p>
            </div>

            <div className="border rounded-md border-tertiaryGreen p-5">
                <span className="inline-block w-[60px] h-[60px]">
                    <Lottie animationData={sparkles} />
                </span>
                <h4 className="mt-3">Witelist Contest</h4>
                <p className="my-5 text-white/60 text-base max-w-[560px] mx-auto">Commodo in vel auctor risus viverra arcu nullam. Ultrices sed libero velit, at vestibulum dignissim aliquet.</p>
            </div>
            <div className="border rounded-md border-tertiaryGreen p-5">
                <span className="inline-block w-[60px] h-[60px]">
                    <Lottie animationData={rewards} />
                </span>
                <h4 className="mt-3">Reward Tasks</h4>
                <p className="my-5 text-white/60 text-base max-w-[560px] mx-auto">Commodo in vel auctor risus viverra arcu nullam. Ultrices sed libero velit, at vestibulum dignissim aliquet.</p>
            </div>
        </div>
    </section>
  )
}

export default MarketingTools