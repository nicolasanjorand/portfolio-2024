import {motion, useAnimation} from "framer-motion";
import PerspectiveText from "@/components/perspectiveText";
import classNames from "classnames";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {useEffect} from "react";


export default function Button ({setIsHovered, text, className}) {

    const ctrls = useAnimation();

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            ctrls.start("visible");
        }
        if (!inView) {
            ctrls.start("hidden");
        }
    }, [ctrls, inView]);

    const wordAnimation = {
        hidden: {
            opacity: 0,
            y: `0.25em`,
        },
        visible: {
            opacity: 1,
            y: `0em`,
            transition: {
                duration: 1,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };

    const characterAnimation = {
        hidden: {
            opacity: 0,
            y: `0.25em`,
        },
        visible: {
            opacity: 1,
            y: `0em`,
            transition: {
                duration: 1,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };

    return (
        <motion.div
            aria-hidden="true"
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            ref={ref} className={classNames(className, "h-[40px] bg-light rounded-full cursor-pointer overflow-hidden")}>
            <div
                        className="relative h-full w-full"
            >
                <div className="w-full h-full group px-5 justify-center items-center" onMouseEnter={() => {
                    setIsHovered(true)
                }} onMouseLeave={() => {
                    setIsHovered(false)
                }}>
                    <PerspectiveText label={text} textColor="text-dark"/>
                </div>
            </div>
        </motion.div>
    )
}

