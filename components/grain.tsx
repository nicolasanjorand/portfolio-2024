"use client";

import React, {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";

export default function GrainBackground() {

    const [currentSvg, setCurrentSvg] = useState(0); // État pour suivre le SVG actuellement visible

    // useEffect pour changer le SVG toutes les secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSvg((prevSvg) => (prevSvg + 1) % 3); // Passer au prochain SVG
        }, 500);

        return () => clearInterval(interval); // Nettoyage de l'intervalle
    }, []);



    return (
        <div className="w-screen h-screen z-[53] fixed opacity-10 pointer-events-none">
            {currentSvg === 0 && (
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="pattern1" patternUnits="userSpaceOnUse" width="400" height="400">
                            <rect width="400" height="400" filter="url(#noiseFilter1)" />
                        </pattern>
                        <filter id="noiseFilter1">
                            <feTurbulence
                                seed="7329663"
                                type="turbulence"
                                baseFrequency="0.5"
                                numOctaves="6"
                                stitchTiles="stitch"
                            />
                            <feColorMatrix type="saturate" values="0"></feColorMatrix>
                        </filter>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pattern1)" />
                </svg>
            )}
            {currentSvg === 1 && (
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="pattern2" patternUnits="userSpaceOnUse" width="400" height="400">
                            <rect width="400" height="400" filter="url(#noiseFilter2)" />
                        </pattern>
                        <filter id="noiseFilter2">
                            <feTurbulence
                                seed="7329665"
                                type="turbulence"
                                baseFrequency="0.5"
                                numOctaves="6"
                                stitchTiles="stitch"
                            />
                            <feColorMatrix type="saturate" values="0"></feColorMatrix>
                        </filter>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pattern2)" />
                </svg>
            )}
            {currentSvg === 2 && (
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="pattern3" patternUnits="userSpaceOnUse" width="400" height="400">
                            <rect width="400" height="400" filter="url(#noiseFilter3)" />
                        </pattern>
                        <filter id="noiseFilter3">
                            <feTurbulence
                                seed="7329664"
                                type="turbulence"
                                baseFrequency="0.5"
                                numOctaves="6"
                                stitchTiles="stitch"
                            />
                            <feColorMatrix type="saturate" values="0"></feColorMatrix>
                        </filter>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pattern3)" />
                </svg>
            )}
        </div>
    );
}