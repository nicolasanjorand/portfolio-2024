import {useEffect, useRef} from "react";
import gsap from "gsap";
import {motion} from "framer-motion";

export default function Cursor({isHovered,isArrowed, hoveredText}) {
    const size = hoveredText != '' ? 300 : (isHovered ? 100 : 30);

    const circle = useRef()
    const mouse = useRef({
        x:0,
        y:0
    })

    const manageMouseMove = (e) => {
        const {clientX, clientY} = e;
        mouse.current = {
            x: clientX,
            y: clientY
        }
    }

    const lerp = (x,y,a) => x * (1 - a) + y * a

    const delayedMouse = useRef({
        x:0,
        y:0,
    })

    const moveCircle = (x,y) => {
        gsap.set(circle.current, {x, y, xPercent: -50, yPercent: -50})
    }

    const animate = () => {
        const {x,y} = delayedMouse.current;
        delayedMouse.current = {
            x: lerp(x, mouse.current.x, 0.075),
            y: lerp(y, mouse.current.y, 0.075),
        }
        moveCircle(delayedMouse.current.x, delayedMouse.current.y)
        window.requestAnimationFrame(animate)
    }

    useEffect(() => {
        animate();
        window.addEventListener("mousemove", manageMouseMove)
        return () => window.removeEventListener("mousemove", manageMouseMove)
    }, []);


    const variants = {
        open: {
            width: 40,
            transition : {duration: 0.75, ease: [0.76, 0, 0.24, 1]}
        }, closed:{
            width: 0,
            transition: {duration: 0.75, delay:0.35, ease: [0.76, 0, 0.24, 1]}
        }
    }

    return (
        <div
            ref={circle}
            className="fixed flex justify-center items-center top-0 left-0 bg-light rounded-full mix-blend-difference pointer-events-none z-50"
            style={{
                width: size,
                height: size,
                backgroundColor: hoveredText != '' ? 'transparent' : '#F3EEEA',
                borderColor: 'white',
                borderStyle: 'solid',
                transition: 'height 0.3s ease-out, width 0.3s ease-out'
        }}
        >
            {
                hoveredText != '' &&
                <div className="text-center text-light w-full h-full flex justify-center items-center">
                    <span>{hoveredText}</span>
                </div>
            }
            {
                hoveredText == '' &&
                <div className="w-full h-full justify-center items-center flex">
                    <div className="h-[40px] w-[40px] flex justify-between items-center flex-col">
                        <motion.div className="w-[40px] bg-dark h-[2px]"
                                    initial="closed"
                                    animate={isArrowed ? 'open' : 'closed' }
                                    variants={variants}

                        ></motion.div>
                        <motion.div initial="closed"
                                    animate={isArrowed ? 'open' : 'closed' }
                                    variants={{open: {
                                            width: 50,
                                            transition : {duration: 0.75, ease: [0.76, 0, 0.24, 1]}
                                        }, closed:{
                                            width: 0,
                                            transition: {duration: 0.75, delay:0.35, ease: [0.76, 0, 0.24, 1]}
                                        }}}
                                    className="w-[50px] bg-dark h-[2px] -rotate-45"></motion.div>
                        <div></div>
                        <motion.div initial="closed"
                                    animate={isArrowed ? 'open' : 'closed' }
                                    variants={variants}
                                    className="w-[40px] bg-dark h-[2px] rotate-90 absolute mt-[19px] ml-[40px]"></motion.div>
                    </div>
                </div>
            }


        </div>
    )
}