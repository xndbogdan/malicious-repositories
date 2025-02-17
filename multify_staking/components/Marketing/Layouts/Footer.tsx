import Image from "next/image"
import Link from "next/link"
import { animated } from "react-spring";
import Lottie from "lottie-react"
import logo from "../../../public/Marketing/imgs/logo.json"

function Footer() {
    return (
        <footer className="flex justify-between w-full bg-darkGreen/30 py-20">
            <div className="max-w-6xl px-5 md:px-0 mx-auto w-full">
                <div className="flex items-center justify-between py-[30px] space-x-20 w-full"> 
                    {/* <Link className="relative block h-16 w-32 flex-shrink-0 cursor-pointer" href="/">
                        <Image className="w-[122.5] object-contain cursor-pointer" fill src="/assets/imgs/logo-v3-white.png" alt="Free Bling Logo" />
                    </Link> */}
                    <Link className="relative block h-16 w-32 flex-shrink-0 cursor-pointer" href="/">
                        <Lottie animationData={logo} loop={false} />
                        {/* <Image style={{objectFit:"contain"}} layout="fill" src="/assets/imgs/fb-logo-v2-aniamted.gif" alt="Free Bling Logo" /> */}
                    </Link>
                    <div className="hidden md:block text-white">
                        <p className="max-w-[359px]">Web3 Marketing & Rewards Platform</p>
                    </div>
                    <div className="inline-flex items-center space-x-6 text-white text-sm uppercase">
                        <a className="hover:text-yellow hover:animate-bounce" href="https://fb.com/freebling" target="_blank" rel="noreferrer">
                            <animated.img
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                                src="/Marketing/imgs/icon-facebook.svg" alt="Freebling Facebook"
                            />
                        </a>
                        <a className="hover:text-yellow hover:animate-bounce" href="https://instagram.com/freebling" target="_blank" rel="noreferrer">
                            <animated.img
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                                src="/Marketing/imgs/icon-instagram.svg" alt="Freebling Instagram"
                            />
                        </a>
                        <a className="hover:text-yellow hover:animate-bounce" href="https://twitter.com/freeblingio" target="_blank" rel="noreferrer">
                            <animated.img
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                                src="/Marketing/imgs/icon-twitter.svg" alt="Freebling Twitter"
                            />
                        </a>
                    </div>
                </div>

                <div className="inline-flex border-y border-white/20 justify-center items-center py-[30px] space-x-10 text-white text-sm capitalize w-full">
                    <Link className="LinkTxt" href="https://learn.freebling.io/privacy-policy" target="_blank">Privacy Policy</Link>
                    <Link className="LinkTxt" href="https://learn.freebling.io/terms-and-conditions" target="_blank">Terms & Conditions</Link>
                </div>

                <div className="inline-flex justify-between items-center py-[30px] space-x-10 w-full">
                    <p className="mx-auto text-center text-white text-sm">Copyright © 2023 <Link href="/">FreeBling.io</Link>. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer