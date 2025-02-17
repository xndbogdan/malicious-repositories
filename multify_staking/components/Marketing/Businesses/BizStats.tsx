import React from 'react'

type Props = {}

export default function BizStats({}: Props) {
  return (
    <section className="w-full py-12 md:py-24">
      <h3 className="text-center w-full">Not convinced?<br />Check out our numbers.</h3>
      
      <div className="bg-secondaryDarkBlack px-5 py-20 my-10 mx-auto">
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto justify-between space-x-0 md:space-x-10 space-y-[60px] md:space-y-0 text-center">
          <div className="max-w-[200px] md:max-w-none mx-auto md:mx-0">
            <h4 className="numberStat text-4xl md:text-7xl">42,923</h4>
            <span className="pt-5 text-xl block text-lightTertiaryGreen">Total Giveaways Created</span>
          </div>

          <div className="">
            <h4 className="numberStat text-4xl md:text-7xl">142,923</h4>
            <span className="pt-5 text-xl block text-lightTertiaryGreen">Total Giveaway Entries</span>
          </div>

          <div className="">
            <h4 className="numberStat text-4xl md:text-7xl">1,142,923</h4>
            <span className="pt-5 text-xl block text-lightTertiaryGreen">Registered Members</span>
          </div>
        </div>
      </div>
      
      <div className="px-5">
        <p className="my-5 text-white/60 text-lg text-center w-full md:max-w-[490px] mx-auto">Quia sed quod fuga tempora. Officiis voluptas asperiores numquam. Velit occaecati et et blanditiis ab placeat qui.</p>
        <button className="buttonTertiary w-full md:max-w-[386px] mx-auto block">Grow your Business</button>
      </div>
    </section>
  )
}

