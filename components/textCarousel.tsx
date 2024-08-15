import classNames from "classnames";
import {useScroll, useTransform, motion} from "framer-motion";
import {useRef} from "react";
import localFont from "next/font/local";
const pp = localFont({ src: '../public/fonts/PPNeueWorld-Regular.ttf' })
const general = localFont({ src: '../public/fonts/GeneralSans-Light.woff2' })

export default function TextCarousel({scrollYProgress}){



    return (
        <div className="overflow-hidden w-screen">
            <Slide direction={'left'} left={"-40%"} progress={scrollYProgress} text={["Creative", "Front-end", "Mobile"]}/>
            <Slide direction={'right'} left={"-25%"} progress={scrollYProgress} text={["Full-stack", "Mobile", "Creative"]}/>
            <Slide direction={'left'}  left={"-50%"} progress={scrollYProgress} text={["Mobile", "Creative", "Back-end"]}/>
        </div>

    )
}

const Slide = (props) => {

    const direction = props.direction == 'left' ? -1 : 1;
    const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction])

    return (
        <motion.div style={{x: translateX, left: props.left}} className="relative flex whitespace-nowrap">
            {
                props.text.map((element, i) => {
                    return (
                        <Phrase src={props.src} key={i} text={element}/>
                    )
                })
            }
        </motion.div>
    )

}

const Phrase = ({text}) => {
    return (
        <div className="px-5 flex gap-5 items-center">
            <p className={classNames(pp.className,"text-[7.5vw] text-light")}>{text}</p>
            <p className={classNames(pp.className,"text-[7.5vw] text-colored")}>Developer</p>
            <div className="w-30 h-30 bg-light"></div>
        </div>
    )
}