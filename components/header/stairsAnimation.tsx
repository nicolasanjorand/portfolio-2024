import {motion} from "framer-motion";

export default function StairsAnimation({custom, isActive}) {
    const anim = (variants, custom) => {
        return {
            initial: 'initial',
            animate: isActive ? 'enter' : 'initial',
            variants,
            custom
        }
    }

    const nbOfColumns = 5;

    const expand = {
        enter:(i) => ({
            top: 0,
            opacity: 1,
            transition: {
                duration: 0.7,
                delay: 0.05*i,
                ease: [0.70, 0, 0.30, 1]
            },
        }),
        initial:(i) => ({
            top: "100%",
            opacity: 0,
            transition: {
                duration: 0.7,
                delay: 0.05*i,
                ease: [0.70, 0, 0.30, 1]
            },
        }),
        exit:(i)=> ({
            height: "100%",
            transition: {
                duration: 0.7,
                delay: 0.05*i,
            },
        })
    }

    const overlay = {
        initial: {
            opacity: 0,
            transition: {
                duration: 0.9,
            },
        },
        enter: {
            opacity: 0.5,
            transition: {
                duration: 0.8,
            },
        }
    }

    return (
        <div className="h-screen w-screen fixed top-0 left-0 pointer-events-none">
            <motion.div {...anim(overlay)} className="h-full w-full bg-light relative"></motion.div>
            <div className="h-screen w-screen fixed top-0 left-0 pointer-events-none flex">
                {
                    [...Array(nbOfColumns)].map((_, i) => {
                        return <motion.div className="h-full w-full bg-light relative" {...anim(expand, nbOfColumns-i)} key={i}/>
                    })
                }
            </div>
        </div>

    )
}