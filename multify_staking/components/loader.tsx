import React from 'react'
import Image from 'next/image'
import logo from '../public/assets/anim/logo.json'
import GIF from '../public/assets/images/loader.gif'
import Lottie from 'lottie-react';

// Loading Spinner
export default function Loader({ show }: any) {
    return show ?
        <div className="center w-[300px]">
            <Lottie animationData={logo} loop={true} />
        </div> : null;
}
