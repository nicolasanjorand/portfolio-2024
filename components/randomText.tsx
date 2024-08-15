import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import classNames from "classnames";
import {motion} from 'framer-motion';

const TextReveal = ({className, isLoaded}) => {
    const displayText = "ANJORAND";


    return (
        <div className="flex flex-row">
            <motion.p
                className="text-light text-8xl"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: -0, opacity: 1 }}
                transition={{duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0}}
            >&lt;</motion.p>
            <div className=" h-[100px] overflow-hidden">
                {
                    displayText.split('').map((letter, i) => {
                        return (
                            <motion.span
                                key={i}
                                className={classNames(className, "text-light flex flex-col text-8xl leading-1")}
                                initial={{ y: - (100*i), opacity: 0 }}
                                animate={{ y: -0, opacity: 1 }}
                                transition={{duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.05*i}}
                                style={{ display: 'inline-block' }}
                            >
                                <div>{letter}</div>
                                <LetterList n={i} />

                            </motion.span>
                        )
                    })
                }

            </div>
            <motion.p className="text-light text-8xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5}}>
                /
            </motion.p>
            <motion.p
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: -0, opacity: 1 }}
                transition={{duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.6}}
                className="text-light text-8xl">
                &gt;
            </motion.p>
        </div>
    );
};

export default TextReveal;



const LetterList = ({  n }) => {
    const elements = [];
    const letters = 'ABDEFGHJKLMNOPQRSTUVXYZW'
    const lettersList = letters.split("");

    for (let i = 0; i <= n; i++) {
        if(i < 10){elements.push(<div key={i}>{i}</div>);
        }
    }

    return (
        <div className="text-light flex flex-col text-8xl leading-1">
            {elements}
        </div>
    );
};

