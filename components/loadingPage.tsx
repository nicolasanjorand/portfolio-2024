'use client';
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import TextReveal from "@/components/randomText";
import {loadingDuration} from "@/public/config";
import StairsAnimation from "@/components/header/stairsAnimation";



export default function LoadingPage({isLoading, setIsLoading, isLoaded}){


    useEffect(() => {
        setTimeout(function (){

            setIsLoading(false)

        }, loadingDuration);
    }, []);


    const variants = {
        open: {
            width: '100vw',
            height: '100vh',
            marginLeft: 0,
            transition : {duration: 0.75, ease: [0.76, 0, 0.24, 1]}
        }, closed:{
            width: 40,
            height: 40,
            marginLeft: 20,
            transition: {duration: 0.75, ease: [0.76, 0, 0.24, 1]}
        }
    }



    return(
        <div className="bg-dark flex justify-center items-center w-screen h-screen">
            <StairsAnimation isActive={!isLoading}/>
            <div className="absolute bottom-0 left-0 mb-10 ml-10">
                <TextReveal isLoaded={true} className=""/>
            </div>
            <SquareAnimation/>
            {/*<motion.div className="w-20 h-20 bg-light absolute"
                        initial="closed"
                        animate={!isLoading ? 'open' : 'closed' }
                        variants={variants}
            >

            </motion.div>*/}
        </div>
    )
}


const SquareAnimation = ({  n }) => {

    const [state, setState] = useState(0);

    const variants = {
        one: {
            width: 100,
            height: 200,
        },
        two: {
            width: 100,
            height: 120,
        },
        three: {
            width: 100,
            height: 80
        }
    }

    const checkState = () => {
        switch (state){
            case 0:
                return 'one';
            case 1:
                return 'two';
            case 2:
                return 'three';
        }
    }

    const checkState1 = () => {
        switch (state){
            case 0:
                return 'two';
            case 1:
                return 'three';
            case 2:
                return 'one';
        }
    }

    const checkState2 = () => {
        switch (state){
            case 0:
                return 'three';
            case 1:
                return 'one';
            case 2:
                return 'two';
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setState(1);
        }, 1000)
        setTimeout(() => {
            setState(2);
        }, 2000)
        setTimeout(() => {
            setState(0);
        }, 3000)
    }, []);


    return (
        <div className="flex flex-row items-center ">
            <motion.div
                transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1], repeat: Infinity, repeatDelay: 3}}
                initial="one"
                animate={checkState()}
                variants={variants}
                className="opacity-15 bg-light w-[100px] h-[100px]"></motion.div>
            <motion.div
                transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1], repeat: Infinity, repeatDelay: 3}}
                initial="two"
                animate={checkState1()}
                variants={variants}
                className="opacity-10 bg-light w-[80px] h-[100px]"></motion.div>
            <motion.div
                transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1], repeat: Infinity, repeatDelay: 3}}
                initial="three"
                animate={checkState2()}
                variants={variants}
                className="opacity-5 bg-light w-[60px] h-[100px]"></motion.div>


        </div>
    );
};