import React, { useRef, useEffect, useState } from 'react';
import {motion, useScroll, useTransform} from "framer-motion";
import SplitText from "@/components/ui/splitText";
import image1 from "@/public/60e073c9-3b30-4c3a-88c1-6b65bc035fc8.jpeg"
import image2 from "@/public/a10e2145-0b44-48b2-9821-8640756176d5.jpeg"
import image3 from "@/public/Serene Bedroom Retreat_ Minimalist Design with Brown & Cream Tones.jpeg"
import image4 from "@/public/Living room, sala de estar.jpeg"
import image5 from "@/public/mobile.png"
import image6 from "@/public/vitrine_video.gif"
import image7 from "@/public/dashboard_gif.gif"
import Image from "next/image";
import Button from "@/components/ui/button";


export default function WorkCard({setIsHovered, href, title, description, badges, src, year, progress, range, targetScale, i, setIsArrowed, description2, description3, description4}) {


    const scale = useTransform(progress, range, [1, targetScale])

    const containerRef = useRef(null);
    const [isAnimated, setIsAnimated] = useState(false);
    const [containerProgress, setContainerProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })

    const x = useTransform(scrollYProgress, [0, 1], [1, 0.8]);


    useEffect(() => {
        // Met à jour l'état à chaque changement de scrollYProgress
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setContainerProgress(latest);
        });

        // Cleanup pour éviter les fuites de mémoire
        return () => unsubscribe();
    }, [scrollYProgress]);

    const animateImage = () => {
        if(typeof window !== 'undefined'){
            if(containerProgress > 0.99){
                return {
                    y: (-window.innerHeight * 0.6) * 3
                }
            }
            else if(containerProgress>0.8){
                return {
                    y: (- window.innerHeight * 0.6) * 2
                }
            }
            else if(containerProgress > 0.6){
                return {
                    y: - window.innerHeight * 0.6
                }
            }
        }

    }

    const animateText = () => {
        if(containerProgress > 0.99){
            return {
                y: -1200
            }
        }
        else if(containerProgress>0.8){
            return {
                y: -800
            }
        }
        else if(containerProgress > 0.6){
            return {
                y: -400
            }
        }
    }


    return (
        <div key={i} className="flex justify-center items-start sticky top-0 mt-20">
            <motion.div
                ref={containerRef}
                className='bg-dark w-[90%] origin-top' style={{ marginTop: `${i * 80}px`, height: i == 0 ? '300vh' : '100vh' }}>
                <div className="top-0 sticky" >
                    <p className="flex flex-row items-center">
                        <SplitText text={"0" + (i+1).toString() } className="text-[64px] text-colored uppercase text-left" />
                        <SplitText text={title} className="text-[40px] text-light uppercase"  />
                    </p>


                    <div className="flex flex-row justify-around gap-10  text-colored mt-10">
                        <div className="flex flex-col gap-8">
                            <div className="h-[400px] overflow-hidden text-[40px]">
                                <motion.div
                                    initial={{ y: 0 }}
                                    animate={animateText()}
                                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                                >
                                    <p className="h-[400px]">{description}</p>
                                    <p className="h-[400px]">{description2}</p>
                                    <p className="h-[400px]">{description3}</p>
                                    <p className="h-[400px]">{description4}</p>
                                </motion.div>
                            </div>
                            <a className="relative w-[120px]" href={href} target="_blank">
                                <Button className="" text="SEE MORE" setIsHovered={setIsHovered}></Button>
                            </a>
                        </div>
                        <div>
                            <a href={href} target="_blank">
                            <div onMouseEnter={() => {setIsHovered(true), setIsArrowed(true)}} onMouseLeave={() => {setIsHovered(false), setIsArrowed(false)}}  className="bg-light w-[400px] h-[60vh] cursor-pointer overflow-hidden">
                                <motion.div
                                    initial={{ y: 0 }}
                                    animate={animateImage()}
                                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                                    className=""
                                >
                                    <div className="w-[400px] h-[60vh] overflow-hidden relative">
                                        <Image
                                            fill
                                            alt="image"
                                            className="object-cover absolute" src={image1}>

                                        </Image>
                                        <div className="h-full w-full flex justify-center items-center relative">
                                            <Image src={image6} alt="image" className="w-[90%] z-20 absolute"></Image>
                                        </div>
                                    </div>
                                    <div className="w-[400px] h-[60vh] overflow-hidden relative">
                                        <Image
                                            fill
                                            alt="image"
                                            className="object-cover absolute" src={image2}>
                                        </Image>
                                        <div className="h-full w-full flex justify-center items-center relative">
                                            <Image src={image5} alt="image" className="w-[80%] z-20 absolute"></Image>
                                        </div>
                                    </div>
                                    <div className="w-[400px] h-[60vh] overflow-hidden relative">
                                        <Image
                                            fill
                                            alt="image"
                                            className="object-cover absolute" src={image3}></Image>
                                        <div className="h-full w-full flex justify-center items-center relative">
                                            <Image src={image7} alt="image" className="w-[90%] z-20 absolute"></Image>
                                        </div>
                                    </div>
                                    <div className="w-[400px] h-[60vh] overflow-hidden relative">
                                        <Image
                                            fill
                                            alt="image"
                                            className="object-cover absolute" src={image4}></Image>
                                        <div className="h-full w-full flex justify-center items-center relative">
                                            <Image src={image6} alt="image" className="w-[90%] z-20 absolute"></Image>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="flex flex-row gap-2 justify-end mt-4 text-[18px] text-light">
                                {
                                    badges.map((badge, index) => {
                                        return (
                                            <div key={index} className="px-4 py-2 rounded-full flex justify-center items-center border-light border-[1px]">
                                                {badge}
                                            </div>
                                        )
                                    })
                                }
                                <p className="font-black px-4 py-2">{year}</p>
                            </div></a>

                        </div>
                    </div>
                </div>


            </motion.div>
        </div>
    );
}