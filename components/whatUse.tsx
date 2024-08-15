'use client';
import React, {useRef} from "react";
import {useScroll, motion} from "framer-motion";
import localFont from "next/font/local";
import {SplitText} from "@/components/ui/splitText";



const harmond = localFont({ src: '../public/fonts/Harmond-SemiBoldCondensed.otf' })

export default function WhatIUse({text, numero, setIsHovered, setHoveredText}){




    return(
        <div className="w-full relative h-32 flex justify-between items-center flex-row border-b-[1px] border-colored group"
             onMouseEnter={() => {setIsHovered(true), setHoveredText(text)}}
             onMouseLeave={() => {setIsHovered(false), setHoveredText('')}}
        >
            <div
                className="w-full z-40 absolute h-0 overflow-hidden bg-light group-hover:h-32 transition-all duration-500 flex justify-between items-center flex-row"
            >
                <p className="ml-2 text-dark text-[40px] what-i-use group-hover:tracking-widest group-hover:translate-x-5 transition-all duration-500 lowercase">{text}</p>
                <p className="mr-2 text-dark text-[40px] what-i-use group-hover:-translate-x-5 transition-all duration-500">{numero}</p>
            </div>
            <p className="ml-2 uppercase text-colored text-[40px] what-i-use group-hover:tracking-widest group-hover:translate-x-5 transition-all duration-500">{text}</p>
            <p className="mr-2 text-colored text-[40px] what-i-use">{numero}</p>
        </div>
    )
}