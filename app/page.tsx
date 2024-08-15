"use client";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type'
import React, {useEffect, useRef, useState} from "react";
import Cursor from "@/components/cursor";
import Scene from "@/components/scene";
import WhatIUse from "@/components/whatUse";
import Menu from "@/components/header/menu";
import {useScroll, useTransform, motion} from "framer-motion";
import PerspectiveText from "@/components/perspectiveText";
import BackgroundImage from "@/public/nicolas_plage_black_white.jpg";
import Works from "@/components/works";
import LoadingPage from "@/components/loadingPage";
import {loadingDuration} from "@/public/config";
import MainImage from "@/public/main.jpg";
import localFont from "next/font/local";
import classNames from "classnames";
import SplitText from "@/components/ui/splitText";
import StairsAnimation from "@/components/header/stairsAnimation";
import BlurReveal from "@/components/ui/blurReveal";
import StaggerHoverText from "@/components/staggerHoverText";
import Magnet from "@/components/ui/magnet";
import TextCarousel from "@/components/textCarousel";

gsap.registerPlugin(ScrollTrigger);


export default function Home() {

    const [isHovered, setIsHovered] = useState(false)
    const [hoveredText, setHoveredText] = useState('')
    const [isCursorArrowed, setIsCursorArrowed] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)


    gsap.config({ trialWarn: false });
    console.clear();
    gsap.registerPlugin(ScrollTrigger, SplitType);

    useEffect(() => {
        const splitTypes = document.querySelectorAll('.what-i-use')
        /*splitTypes.forEach((char,i) => {
            const text = new SplitType(char, {
                types: 'chars'
            })

            gsap.from(text.chars, {
                scrollTrigger: {
                    trigger: char,
                    start: 'top 90%',
                    end: 'top 10%',
                    scrub: false,
                    markers: false,
                    toggleActions: "play reverse play reverse",
                    onLeave: () => gsap.set(text.chars, { opacity: 1, scaleY: 1, y: 0 }), // Keep the text visible
                    onEnterBack: () => gsap.to(text.chars, { opacity: 1, scaleY: 1, y: 0, stagger: 0.01, duration: 1, ease: "power3.inOut" }), // Reappear on scrolling back up
                },
                opacity: 0,
                scaleY: 0,
                transformOrigin: 'top',
                y: -20,
                stagger: 0.01,
                duration: 1,
                ease: "power3.inOut"
            })
        })*/
    }, []);


    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    })

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight - (window.innerHeight * 0.05)) {
                setShowMenu(true);
            } else {
                setShowMenu(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const variants = {
        open: {
            scale: 1,
            transition : {duration: 0.75, ease: [0.76, 0, 0.24, 1]}
        }, closed:{
            scale: 0,
            transition: {duration: 0.75, delay:0.35, ease: [0.76, 0, 0.24, 1]}
        }
    }


    const workContactPage = useRef(null);
    const { scrollYProgress: scrollYProgressContact } = useScroll({
        target: workContactPage,
        offset: ["center start", "end end"]
    })

    useEffect(() => {
        setTimeout(function (){
            setIsLoading(false)
        }, loadingDuration);
        setTimeout(function (){
            setIsLoaded(true)
        }, loadingDuration + 1000);
    }, []);

    const landing = {
        loading: {
        }, loaded:{
            y: -window.innerHeight,
            transition: {duration: 0, ease: [0.76, 0, 0.24, 1]}
        }
    }






  return (
    <main style={ !isLoaded ? {overflow: 'hidden', height: '100vh', position: 'relative'} : {}}>
        <motion.div
            initial="loading"
            animate={isLoaded ? 'loaded' : 'loading' }
            variants={landing}
            className="h-screen w-screen absolute z-50"
        >
            <LoadingPage isLoading={isLoading} setIsLoading={setIsLoading} isLoaded={isLoaded}/>
        </motion.div>
        <motion.div transition={{duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1}} ref={container} className="relative h-200vh" animate={ isLoaded ? {padding: 24} : {padding: 0}}>
            <Page1 setIsHovered={setIsHovered} scrollYProgress={scrollYProgress} isLoaded={isLoaded}></Page1>
            <About setIsHovered={setIsHovered} scrollYProgress={scrollYProgress}></About>
        </motion.div>
        <motion.div
            initial="closed"
            animate={showMenu ? 'open' : 'closed' }
            variants={variants}
            style={{
                position: 'fixed',
                top: '40px',
                right: '20px',
                zIndex: 50,
                transformOrigin: 'center'
            }}
        >
            <Menu setIsHovered={setIsHovered} setIsLoaded={setIsLoaded}/>
        </motion.div>

        <Page2 setIsHovered={setIsHovered} scrollYProgress={scrollYProgress} setHoveredText={setHoveredText}></Page2>
        <div ref={workContactPage}>
            <Works setIsHovered={setIsHovered} setIsArrowed={setIsCursorArrowed} ref={workContactPage}/>
            <Contact setIsHovered={setIsHovered} scrollYProgress={scrollYProgressContact}/>
        </div>
        <Footer setIsHovered={setIsHovered}/>
        <Cursor isHovered={isHovered} isArrowed={isCursorArrowed} hoveredText={hoveredText}></Cursor>
    </main>
  );
}

const harmond = localFont({ src: '../public/fonts/Harmond-SemiBoldCondensed.otf' })

const Page1 = ({scrollYProgress, setIsHovered, isLoaded}) => {

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

    const landingAnimations = {
        loading: {
            opacity: 0,
            translateY: -20,
        }, loaded:{
            opacity: 1,
            translateY: 0,
        }
    }

    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;

    useEffect(() => {
        requestAnimationFrame(animation);
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: 0.25,
                onUpdate: e => direction = e.direction * -1
            },
            x: "-=300px",
        })
    }, []);


    const animation = () => {
        if(xPercent <= -100){
            xPercent = 0;
        }
        if(xPercent > 0){
            xPercent = -100;
        }
        gsap.set(firstText.current, {xPercent: xPercent})
        gsap.set(secondText.current, {xPercent: xPercent})
        xPercent += 0.1 * direction;
        requestAnimationFrame(animation)
    }

    return (
        <motion.div style={{scale, rotate}} className="w-full h-screen flex justify-between p-12 flex-col items-center bg-light sticky top-0" transition={{duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1}} animate={ isLoaded ? {borderRadius: 16} : {padding: 0}}>
            {/*<Scene isLoaded={isLoaded}>
            </Scene>*/}
            <div className="w-full h-full flex justify-center items-center absolute mb-20 pointer-events-none overflow-hidden">
                <div className="absolute rotate-z-12">
                    <div ref={slider} className={classNames(harmond.className, "relative whitespace-nowrap flex")}>
                        <motion.p transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:1}} initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations} ref={firstText} className="text-[240px]"> Nicolas ANJORAND . </motion.p>
                        <motion.p transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:1}} initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations} ref={secondText} className="text-[240px] absolute left-full"> Nicolas ANJORAND . </motion.p>
                    </div>
                </div>
                {/*<div className="absolute -rotate-z-12">
                    <div ref={slider2} className={classNames(harmond.className, "relative whitespace-nowrap flex")}>
                        <p ref={firstText2} className="text-[140px]">Nicolas ANJORAND - </p>
                        <p ref={secondText2} className="text-[140px] absolute left-full">Nicolas ANJORAND - </p>
                    </div>
                </div>*/}
            </div>
            <div className="flex flex-row justify-between px-10 w-full">
                <motion.p className="text-dark" initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations}>Nicolas.A</motion.p>
                <Magnet padding={20}>
                    <motion.p transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:0.2}} className="text-colored group" initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations}>AVAILABLE FOR WORK OCTOBER 2025</motion.p>
                </Magnet>
                <motion.a transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:0.3}} initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations} className="group cursor-pointer" href="mailto:hello@nicolasanjorand.com" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                    <p className="text-dark">hello@nicolasanjorand.com</p>
                    <div className="w-0 group-hover:w-full bg-dark h-0.5 transition-all duration-500"></div>
                </motion.a>
            </div>
            <motion.div
                transition={{duration: 1, ease: [0.76, 0, 0.24, 1], delay:0}}
                animate={isLoaded ? {scaleY: 1} : {scaleY: 0} }
                className="w-auto h-1/2 z-20 origin-bottom"
            >
                <Image className="w-auto h-full z-20" src={MainImage} alt="Illustration showing Nicolas ANJORAND on a beach"/>

            </motion.div>


            {/*<div className="flex justify-center items-end flex-col self-end text-colored">
                <motion.a transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:0.4}} initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations} href="/#about" className="group" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}><PerspectiveText textColor="text-dark" label="ABOUT"></PerspectiveText></motion.a>
                <motion.a transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:0.45}} initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations} href="/#skills" className="group" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}><PerspectiveText textColor="text-dark" label="SKILLS"></PerspectiveText></motion.a>
                <motion.a transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:0.5}} initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations} href="/#works" className="group" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}><PerspectiveText textColor="text-dark" label="WORKS"></PerspectiveText></motion.a>
                <motion.a transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:0.55}} initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations} href="/#contact" className="group" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}><PerspectiveText textColor="text-dark" label="CONTACT"></PerspectiveText></motion.a>
            </div>*/}
            {/*<div className="flex justify-center items-center flex-col" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                <p id="test" className="text-[155px] leading-10 text-dark title">NICOLAS</p>
                <p className="text-[155px] text-colored title">ANJORAND</p>
            </div>*/}
            <div className="w-full flex flex-row justify-around items-center">
                <motion.p transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:0.7}} initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations} className="text-colored w-80">A full-stack and mobile developer with an eye for <span className="text-dark font-bold">cool motion interfaces</span>.</motion.p>
                <motion.p transition={{duration: 0.5, ease: [0.76, 0, 0.24, 1], delay:0.8}} initial="loading" animate={isLoaded ? 'loaded' : 'loading' } variants={landingAnimations} className="text-dark">( Scroll if you dare )</motion.p>
            </div>
        </motion.div>
    )
}

const About = ({scrollYProgress, setIsHovered}) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);

    const container = useRef();

    const { scrollYProgress: carouselProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    })


    return (
        <motion.div ref={container} style={{scale, rotate}} className="w-full p-12 bg-dark h-screen relative flex justify-around items-center flex-col rounded-2xl overflow-hidden">
            <div className="flex flex-row justify-between px-10 w-full">
                <SplitText text="ABOUT ME" className="text-light text-[25px]" />
            </div>
            <TextCarousel scrollYProgress={carouselProgress}/>
            <SplitText delay={0.12} text="A frenchie in Seattle, searching for a job where I can create amazing digital experiences." className="text-[30px] text-light text-right" />
            {/*<div className="w-full h-full py-20 flex justify-center items-center flex-row">
                <div className="flex flex-col justify-around items-end h-full w-full">
                    <SplitText delay={0.12} text="A frenchie in Seattle, searching for a job where I can create amazing digital experiences." className="text-[30px] text-colored text-right" />
                    <div className="flex flex-row gap-2 self-start ml-10">
                        <div className="relative overflow-hidden h-[200px]">
                            <p className="text-right text-light vertical-carousel">FULL-STACK</p>
                            <p className="text-right text-light vertical-carousel">CREATIVE</p>
                            <p className="text-right text-light vertical-carousel">FRONT-END</p>
                            <p className="text-right text-light vertical-carousel">BACK-END</p>
                        </div>
                        <p className="text-light font-black">DEVELOPER</p>
                    </div>
                </div>


            </div>*/}

        </motion.div>
    )
}


const Page2 = ({scrollYProgress, setIsHovered, setHoveredText}) => {

    return (
        <motion.div className="w-full p-12 bg-dark relative">
            <div className="flex flex-row justify-between px-10 w-full">
                <SplitText text="WHAT I USE" className="text-light text-[25px]" />
            </div>
            <div className="w-full">
                <div className="w-full bg-light h-[1px] mt-20"/>
                <div className="flex flex-col justify-around items-start">
                    <SplitText text="Web design" className="text-light text-[64px] mt-10 w-full" />
                    <div className="w-full flex justify-center flex-col items-center pt-40">
                        <WhatIUse text="FIGMA" numero="01" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                        <WhatIUse text="AFTER EFFECTS" numero="02" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                        <WhatIUse text="PHOTOSHOP" numero="03" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                        <WhatIUse text="ILLUSTRATOR" numero="04" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                    </div>
                </div>
            </div>
            <div className="w-full mt-[20%]">
                <div className="w-full bg-light h-[1px] mt-20"/>
                <div className="flex flex-col justify-around items-start">
                    <SplitText text="Web development" className="text-light text-[64px] mt-10 w-full" />
                    <div className="w-full flex justify-center flex-col items-center pt-40">
                        <WhatIUse text="C, C++, PYTHON, JAVA" numero="01" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                        <WhatIUse text="HTML, CSS, JS, TS" numero="02" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                        <WhatIUse text="Django, PHP, Springboot" numero="03" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                        <WhatIUse text="React, Angular, NextJS" numero="04" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                        <WhatIUse text="Oracle, MySQL, MariaDB" numero="05" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                        <WhatIUse text="Gitlab, Jenkins, Docker" numero="06" setIsHovered={setIsHovered} setHoveredText={setHoveredText}/>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const Contact = ({setIsHovered, scrollYProgress}) => {



    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scaleY = useTransform(scrollYProgress, [0, 1], [1, 0]);



    return (
        <div>
            <motion.div style={{scaleY}} className="bg-dark w-full h-full absolute z-[51] origin-top"></motion.div>
            <motion.div style={{scaleX}} className="w-full p-12 bg-light h-screen relative z-50 ">
                <div className="flex flex-row justify-between px-10 w-full">
                    <SplitText text="LET&apos;S STAY IN TOUCH" className="text-dark text-[25px]"  />
                </div>
                <div className="flex justify-around items-center flex-row w-full h-full">
                    <SplitText delay={0.07} text="I’m would be glad to read about your project or any idea you want to talk about." className="text-[64px] text-dark w-[600px] leading-[70px]"  />
                    <div className="flex flex-col h-[50%]  justify-between pl-20">
                        <p>to :
                            <a className="group cursor-pointer" href="mailto:hello@nicolasanjorand.com" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                                <p className="text-dark text-4xl">hello@nicolasanjorand.com</p>
                                <div className="w-full mt-2 group-hover:w-0 bg-dark h-1 transition-all duration-500"></div>
                            </a>
                        </p>
                        <div>
                            <p className="text-colored">SOCIALS</p>
                            <div className="flex flex-row gap-10" >
                                <a className="uppercase text-xl group cursor-pointer"><PerspectiveText textColor="text-dark" label="LINKEDIN"></PerspectiveText></a>
                                <a className="uppercase text-xl group cursor-pointer"><PerspectiveText textColor="text-dark" label="AWWWARDS"></PerspectiveText></a>
                                <a className="uppercase text-xl group cursor-pointer"><PerspectiveText textColor="text-dark" label="MALT"></PerspectiveText></a>
                                <a className="uppercase text-xl group cursor-pointer"><PerspectiveText textColor="text-dark" label="GITHUB"></PerspectiveText></a>
                            </div>
                        </div>
                    </div>
                </div>


            </motion.div>

        </div>

    )
}



const Footer = ({setIsHovered}) => {






    return (
        <div className="bg-light flex flex-row gap-20 items-start px-20 py-20">
            <div className="flex flex-col justify-center items-start">
                <p className="text-xs">SECTIONS</p>
                <div className="w-48 h-[1px] bg-dark mt-3"></div>
                <a className="uppercase text-xs group cursor-pointer mt-3"><PerspectiveText textColor="text-dark" label="HOME"></PerspectiveText></a>
                <a className="uppercase text-xs group cursor-pointer"><PerspectiveText textColor="text-dark" label="ABOUT"></PerspectiveText></a>
                <a className="uppercase text-xs group cursor-pointer"><PerspectiveText textColor="text-dark" label="SKILLS"></PerspectiveText></a>
                <a className="uppercase text-xs group cursor-pointer"><PerspectiveText textColor="text-dark" label="WORKS"></PerspectiveText></a>
                <a className="uppercase text-xs group cursor-pointer"><PerspectiveText textColor="text-dark" label="CONTACT"></PerspectiveText></a>
            </div>

            <div className="flex flex-col justify-center items-start">
                <p className="text-xs">SOCIALS</p>
                <div className="w-48 h-[1px] bg-dark mt-3"></div>
                <a className="uppercase text-xs group cursor-pointer mt-3"><PerspectiveText textColor="text-dark" label="LINKEDIN"></PerspectiveText></a>
                <a className="uppercase text-xs group cursor-pointer"><PerspectiveText textColor="text-dark" label="AWWWARDS"></PerspectiveText></a>
                <a className="uppercase text-xs group cursor-pointer"><PerspectiveText textColor="text-dark" label="MALT"></PerspectiveText></a>
                <a className="uppercase text-xs group cursor-pointer"><PerspectiveText textColor="text-dark" label="GITHUB"></PerspectiveText></a>
            </div>

            <p className="text-xs text-colored mt-10">Designed and developed by Nicolas ANJORAND, using Figma and NextJS (Typescript, Tailwind). </p>

        </div>

    )
}
