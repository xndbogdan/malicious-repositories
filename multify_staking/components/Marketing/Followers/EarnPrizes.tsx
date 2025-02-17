import Image from 'next/image'
import React, { useState } from 'react'
import Lottie from 'lottie-react'
import giftBox from '../../../public/Marketing/imgs/anim/gift-box.json'


export default function EarnPrizes() {

    return (
        <section className="flex justify-between w-full py-16 md:py-24">
            <div className="flex flex-col md:flex-row max-w-6xl items-center justify-between md:space-x-20 px-5 mx-auto w-full">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-white text-xl md:text-4xl">Earn Prizes</h3>
                    <p className="my-5 text-white/60 text-base">Earn prizes and crypto tokens from great companies with upside potential in the future.</p>
                    <div className="flex justify-between space-x-4 items-center">
                        <button className="buttonPrimary w-full md:max-w-[195px]">Start Earning Now</button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 py-8 md:py-0 grid place-items-center rounded-xl md:border-[1.37px] border-w border-tertiaryGreen/40">
                    <span className="block w-[80%] md:w-[420px] md:h-[420px] mb-10"><Lottie animationData={giftBox}/></span>
                </div>
            </div>
        </section>
    )
}
