import React from 'react'

type Props = {}

function UserStats({}: Props) {
  return (
    <section className="w-full py-12 md:py-24">
      <h3 className="text-center w-full">Not convinced?<br />Check out numbers.</h3>
      
      <div className="px-5 py-20 mt-10 mx-auto bg-gradient-to-t from-darkGreen/40 to-darkGreen/20 ">
        <div className="max-w-6xl mx-auto justify-between space-x-0 md:space-x-10 space-y-[60px] md:space-y-0 text-center">
          <div className="max-w-[200px] md:max-w-none mx-auto md:mx-0">
            <h4 className="numberStat text-4xl md:text-7xl">242,923</h4>
            <span className="pt-5 text-xl block text-lightTertiaryGreen">Total Value Rewarded</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserStats