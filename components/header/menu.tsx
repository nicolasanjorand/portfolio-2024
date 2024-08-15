'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {AnimatePresence, motion, useScroll} from 'framer-motion';
import classNames from 'classnames';
import Links from "@/components/header/links";
import PerspectiveText from "@/components/perspectiveText";
import StairsAnimation from "@/components/header/stairsAnimation";


export default function Menu({setIsHovered}) {

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = window.innerHeight.toString() + 'px';
            document.body.style.position = 'relative';
        } else {
            document.body.classList.remove('disable-scroll');
        }
    }, [isActive]);


    const variants = {
        open: {
            width: 480,
            height: 658,
            top: "-25px",
            right: "-25px",
            transition : {duration: 0.75, ease: [0.76, 0, 0.24, 1]}
        }, closed:{
            width: 100,
            height: 40,
            top: "0px",
            right: "0px",
            transition: {duration: 0.75, delay:0.35, ease: [0.76, 0, 0.24, 1]}
        }
    }

    return (
        <div onClick={() => setIsActive(!isActive)} className="sticky top-0 mr-10 z-[52] touch-none">
            {// MENU


                <motion.div className="w-[480px] h-[658px] bg-light rounded-3xl absolute top-0 right-0"
                                          variants={variants}
                                          animate={isActive ? "open" : "closed"}
                                          initial="closed"
                >
                    <AnimatePresence>
                    {isActive && <Links setIsHovered={setIsHovered}/>}
                    </AnimatePresence>

                </motion.div>
            }


            {//<StairsAnimation isActive={isActive}/>
                 }
            {// BUTTON
            }
            <div className="h-[40px] w-[100px] bg-light rounded-full cursor-pointer overflow-hidden absolute top-0 right-0">
                <motion.div animate={{top: isActive ? "-100%" : '0'}}
                            key="menu"
                            className="relative h-full w-full"
                            transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1]}}
                >
                    <div className="w-full h-full group" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                        <PerspectiveText label="MENU" textColor="text-dark"/>
                    </div>
                    <div className="absolute w-full h-full top-[100%] bg-dark group" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                        <PerspectiveText label="CLOSE" textColor="text-light"/>
                    </div>
                </motion.div>
            </div>



        </div>

    );
}

