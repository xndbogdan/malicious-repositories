import Image from "next/image"
import Link from "next/link"
import { ArrowRightOnRectangleIcon, Bars3Icon, HomeIcon } from "@heroicons/react/24/outline"
import { BeakerIcon } from "@heroicons/react/24/solid"
import Lottie from "lottie-react"
import logo from "../../../public/Marketing/imgs/logo.json"

function Header() {
  return (
    <header className="flex justify-between items-center p-5 w-full max-w-6xl mx-auto">
        <Link className="relative block h-16 w-32 flex-shrink-0 cursor-pointer" href="/">
            <Lottie animationData={logo} loop={false} />
            {/* <Image style={{objectFit:"contain"}} layout="fill" src="/assets/imgs/fb-logo-v2-aniamted.gif" alt="Free Bling Logo" /> */}
        </Link>

        <div className="hidden md:inline-flex items-center space-x-10 text-white text-sm uppercase">
            <Link className="hover:text-yellow" href="/">Tools</Link>
            <Link className="hover:text-yellow" href="business">For Business</Link>
            <Link className="hover:text-yellow" href="/">Learn</Link>
            <Link className="hover:text-yellow" href="/">Pricing</Link>
            <span className="items-center flex">
              <Link className="hover:text-yellow items-center space-x-2" href="/">Giveaways</Link>
              <div className="rounded-[4px] bg-white hidden md:flex w-11 p-1 ml-3 items-center">
                <span className="animate-ping relative inline-flex rounded-full h-1.5 w-1.5 bg-red"></span>
                <span className="relative inline-flex items-center justify-center text-[10px] font-bold leading-none text-black bg-red-500 ml-2">live</span>
              </div>
            </span>
        </div>

        {/* Sign in and out */}


        <div className="hidden md:inline-flex items-center space-x-5">
          <Link className="hover:text-yellow" href="https://app.freebling.io/">Sign In</Link>
          <Link className="flex items-center space-x-2 text-white bg-transparent" href="https://app.freebling.io/signup">
            <button className="buttonTertiary my-0">Sign Up</button>
          </Link>
        </div>

        <div className="ml-5 text-white md:hidden">
          <Bars3Icon className="icon" />
        </div>
    </header>
  )
}

export default Header