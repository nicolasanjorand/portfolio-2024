'use client';
import React from "react";
import {Canvas} from "@react-three/fiber";
import Model from "@/components/Model";
import {Environment, OrbitControls} from "@react-three/drei";
import {Leva} from "leva";
import {motion} from "framer-motion";


export default function Scene({isLoaded}){

    const landingAnimations = {
        loading: {
            opacity: 1,
            translateY: typeof window !== "undefined" ? -window.innerHeight : 0,
        }, loaded:{
            opacity: 1,
            translateY: 0,
        }
    }

    return(
        <div

            className="absolute top-0 pointer-events-none w-full h-screen"
        >
            <Canvas attach="background" args={['white']} style={{top:0, position: 'absolute', pointerEvents: 'none'}}>
                <ambientLight intensity={1} color="white" />
                <Environment preset='city'></Environment>
                <Model></Model>
                <Leva hidden={true} />
            </Canvas>
        </div>

    )
}