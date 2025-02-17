import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import UserToggle from './UserToggle'
import AuthModal from '../../AuthPanel/AuthModal'
import { useAuth } from '../../../context/authcontext'

function HomeHero() {
  const [open, setOpen] = useState<boolean>(false);

  const { user, authModal: { setWhichAuth } } = useAuth();

  const handleAuth = () => {
    setOpen(true);
    setWhichAuth('');
  }
  return (
    <section className="flex justify-between w-full pt-5 mt-5">
      <div className="flex flex-col md:flex-row items-center justify-between px-5 mx-auto w-full">
        <div className="w-full md:w-1/3">
          <UserToggle />
          <h2 className="text-xl md:text-3xl text-left text-teal-600 font-Ubuntu-Bold">Exciting Web3 <span className="block text-white font-Ubuntu-Regular">Giveaways</span></h2>
          <div className='flex justify-between space-x-4 mt-2'>
            {user.email ? (
              <Link className="items-center" href="/giveaways">
                <button className="buttonPrimary">Enter&nbsp;giveaways!</button>
              </Link>
            ) : (
              <button className="buttonSecondary" onClick={handleAuth}>Get&nbsp;started&nbsp;→</button>
            )}
          </div>
        </div>
        <div className="w-full md:w-2/3 py-8 md:py-0">
          <Image priority className="motion-safe:animate-pulse" src="/Marketing/imgs/hero-user-feature.png" width="854" height="548" alt="Featured Giveaways" />
        </div>
      </div>
      <AuthModal setOpen={setOpen} open={open} />
    </section>
  )
}

export default HomeHero