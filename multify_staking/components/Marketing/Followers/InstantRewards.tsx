import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function InstantRewards() {
  return (
    <section className="flex justify-between w-full py-16 md:py-24">
        <div className="flex flex-col-reverse md:flex-row max-w-6xl items-center justify-between md:space-x-20 px-5 mx-auto w-full">
            {/* Image left */}
            <div className="w-full md:w-1/2 py-8 md:py-0">
                <Image className="motion-safe:animate-pulse" src="/assets/imgs/IR-left-feature.svg" width="540" height="480" alt="Instant rewards" />
            </div>
            {/* Copy right */}
            <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left">
                <h3 className="text-white text-xl md:text-4xl">Instant Rewards</h3>
                <p className="my-5 text-white/60 text-base">CryptoGrowth is the first all-in-one platform that rewards its users for engagements with companies.</p>
                    <Link href="/learn">
                        <button className="buttonPrimary w-full md:max-w-[170px]">Learn more</button>
                    </Link>
            </div>
        </div>
    </section>
  )
}
