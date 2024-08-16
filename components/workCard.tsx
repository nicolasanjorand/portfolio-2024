import React, { useRef, useEffect, useState } from 'react';
import {motion, useScroll, useTransform} from "framer-motion";
import SplitText from "@/components/ui/splitText";

export default function WorkCard({setIsHovered, title, description, badges, src, year, progress, range, targetScale, i, setIsArrowed, description2, description3, description4}) {


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


                    <div className="flex flex-row justify-around gap-10 text-[40px] text-colored mt-10">
                        <div className="flex flex-col gap-8">
                            <div className="h-[400px] overflow-hidden">
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
                        </div>
                        <div>
                            <div onMouseEnter={() => {setIsHovered(true), setIsArrowed(true)}} onMouseLeave={() => {setIsHovered(false), setIsArrowed(false)}}  className="bg-light w-[400px] h-[400px] cursor-pointer overflow-hidden">
                                <motion.div
                                    initial={{ y: 0 }}
                                    animate={animateImage()}
                                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                                    className="bg-[green] w-[400px] h-[1600px]"
                                >
                                    <div className="bg-[yellow] w-[400px] h-[400px]"></div>
                                    <div className="bg-[blue] w-[400px] h-[400px]"></div>
                                    <div className="bg-[red] w-[400px] h-[400px]"></div>
                                    <div className="bg-[orange] w-[400px] h-[400px]"></div>
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
                            </div>

                        </div>
                    </div>
                </div>


            </motion.div>
        </div>
    );
}