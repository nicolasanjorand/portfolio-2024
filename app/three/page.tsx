"use client";


import StairsAnimation from "@/components/header/stairsAnimation";
import {useEffect, useState} from "react";

export default function Home() {

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsActive(true)
        }, 1000)
    }, []);


    return (
        <main className="">
            <StairsAnimation isActive={isActive}/>
        </main>
    );
}
