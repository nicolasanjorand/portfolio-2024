'use client';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {motion} from 'framer-motion';
import classNames from 'classnames';
import PerspectiveText from "@/components/perspectiveText";
import localFont from "next/font/local";
import StaggerHoverText from "@/components/staggerHoverText";

const harmond = localFont({ src: '../../public/fonts/Harmond-SemiBoldCondensed.otf' })



const perspective = {
    initial: {
        rotateX: 90,
        translateY: 80,
        translateX: -20,
        opacity: 0,
    }, enter: (i) => ({
        opacity: 1,
        rotateX: 0,
        translateY: 0,
        translateX: 0,
        transition: {
            delay: 0.5 + (i * 0.1),
            duration: 0.65,
            opacity: {duration: 0.35},
            ease: [.215, .61, .355, 1]
        }
    }), exit: {
        opacity: 0,
        transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1]}
    }
}

const perspective2 = {
    initial: {
        rotateX: 90,
        translateY: 80,
        translateX: -20,
        opacity: 0,
    }, enter: (i) => ({
        opacity: 1,
        rotateX: 0,
        translateY: 0,
        translateX: 0,
        transition: {
            delay: 1 + (i * 0.1),
            duration: 0.65,
            opacity: {duration: 0.35},
            ease: [.215, .61, .355, 1]
        }
    }), exit: {
        opacity: 0,
        transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1]}
    }
}

export default function Links({setIsHovered}) {

    const links = [
        {
            title: "about",
            href: "/#about",
        },
        {
            title: "skills",
            href: "/#skills",
        },
        {
            title: "works",
            href: "/#works",
        },
        {
            title: "contact",
            href: "/#contact",
        }
    ]




    return (
        <div className="h-full pl-[40px] pr-[40px] py-[100px] box-border" >
            <div className="text-dark flex gap-[10px] flex-col">
                {links.map((link, i) => {
                    return (
                        <div key={i} >
                            <motion.div
                                variants={perspective}
                                animate="enter"
                                exit="exit"
                                initial="initial"
                                custom={i}
                                className="perspective-[120px] perspective-origin-top-left flex justify-start"
                            >
                                <a onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} className="text-[47px] group" href={link.href}>
                                    <StaggerHoverText label={link.title}/>
                                </a>
                            </motion.div>
                        </div>
                    )
                })}
            </div>
            <div className={classNames(harmond.className, "mt-20")}>
                <motion.p className="text-colored"
                          animate={{opacity: 1, transition:{delay:1}}}
                          initial={{opacity: 0}}
                          exit={{opacity: 0}}
                >SOCIALS</motion.p>
                <div className="flex flex-row gap-10" >
                    <motion.div
                        variants={perspective2}
                        animate="enter"
                        exit="exit"
                        initial="initial"
                        custom={0}
                        className="perspective-[120px] perspective-origin-top-left flex justify-start"
                    >
                        <a className="uppercase text-xl group cursor-pointer"><PerspectiveText textColor="text-dark" label="LINKEDIN"></PerspectiveText></a>
                    </motion.div>
                    <motion.div
                        variants={perspective2}
                        animate="enter"
                        exit="exit"
                        initial="initial"
                        custom={1}
                        className="perspective-[120px] perspective-origin-top-left flex justify-start"
                    >
                        <a className="uppercase text-xl group cursor-pointer"><PerspectiveText textColor="text-dark" label="AWWWARDS"></PerspectiveText></a>
                    </motion.div>
                    <motion.div
                        variants={perspective2}
                        animate="enter"
                        exit="exit"
                        initial="initial"
                        custom={2}
                        className="perspective-[120px] perspective-origin-top-left flex justify-start"
                    >
                        <a className="uppercase text-xl group cursor-pointer"><PerspectiveText textColor="text-dark" label="MALT"></PerspectiveText></a>
                    </motion.div>
                    <motion.div
                        variants={perspective2}
                        animate="enter"
                        exit="exit"
                        initial="initial"
                        custom={3}
                        className="perspective-[120px] perspective-origin-top-left flex justify-start"
                    >
                        <a className="uppercase text-xl group cursor-pointer"><PerspectiveText textColor="text-dark" label="GITHUB"></PerspectiveText></a>
                    </motion.div>
                </div>
            </div>

        </div>

    );
}
