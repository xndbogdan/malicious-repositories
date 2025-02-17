import Image from 'next/image'
import React, { useState } from 'react'
import BizToggle from './BizToggle'
import AuthModal from '../../AuthPanel/AuthModal'
import { useAuth } from '../../../context/authcontext';

function HomeBizHero() {
  const [open, setOpen] = useState<boolean>(false);

  const { user, authModal: { setWhichAuth } } = useAuth();

  const handleAuth = () => {
    setOpen(true);
    setWhichAuth('');
  }

  return (
    <section className="flex justify-between w-full pt-10 mt-10">
      <div className="flex justify-between flex-col md:flex-row max-w-6xl items-center px-5 mx-auto w-full">
        <div className="w-full md:w-1/2">
          <BizToggle />
          <h2 className="text-white text-4xl md:text-6xl">Marketing tools designed for your Business</h2>
          <p className="my-5 text-white/60 text-lg">Quia sed quod fuga tempora. Officiis voluptas asperiores numquam. Velit occaecati et et blanditiis ab placeat qui.</p>
          {/* <div className="flex space-x-4 items-center">
                    <button className="buttonTertiary">Create a Giveaway!</button>
                    <button className="buttonSecondary">Get started →</button>
                </div> */}
          <div className='flex justify-between space-x-4 mt-2'>
            <a className="items-center" href="/">
              <button className="buttonPrimary">Enter&nbsp;giveaways!</button>
            </a>
            {!user.email && <button className="buttonSecondary" onClick={handleAuth}>Get&nbsp;started&nbsp;→</button>}
          </div>
        </div>
        <div className="w-full md:w-1/2 py-8 md:py-0">
          <Image priority className="motion-safe:animate-pulse" src="/Marketing/imgs/hero-biz-feature.png" width="600" height="525" alt="Featured Giveaways" />
        </div>
      </div>
      <AuthModal setOpen={setOpen} open={open} />
    </section>
  )
}

export default HomeBizHero