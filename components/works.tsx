import React, { useRef, useEffect, useState } from 'react';
import {motion, useScroll, useTransform} from "framer-motion";
import WorkCard from "@/components/workCard";
import SplitText from "@/components/ui/splitText";

export default function Works({setIsHovered, setIsArrowed, ref}) {

    const container = useRef(null);
    const {scrollYProgress} = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const works = [
        {
            title: 'LotyApp',
            description: 'LotyApp is a SaaS (Software As A Service) I created which allows small shops owners to create easily a digital loyalty program. This project is made up of two mobile apps (one for shops owners and one for shops customers), one dashboard web-app and one website.',
            description2: 'I started this projet by designing and developing the two mobile apps using React Native. I also conceived the data system using MySQL. For the Back-end part, I developed an API using Django REST Framework (Python).',
            description3: 'Then, I created a dashboard web-app to enable shops owners to configure their account, check statistics and send notifications to their customers. This web-app is working with NextJS, Typescript and Tailwind CSS.',
            description4: 'Finally, I used Webflow to easily design and publish the presenting website of this project LotyApp.',
            src: null,
            badges: ['DESIGN', 'WEB', 'MOBILE'],
            year: "2024",
            href: "https://lotyapp.fr"
        },
    ]




    return (
        <div className="pb-32 mt-20" id="works">
            <div className="flex flex-row justify-between px-10 w-full">
                <SplitText text="WHAT I DO" className="text-light text-[25px]" />
            </div>
            <div className="text-light" ref={container}>
                {
                    works.map((work, i) => {
                        const targetScale = 1 - ((works.length - i) * 0.05)
                        return (
                        <WorkCard setIsArrowed={setIsArrowed} setIsHovered={setIsHovered} key={i} i={i} {...work} progress={scrollYProgress} range={[i * 0.25, 100]} targetScale={targetScale}/>
                        )})
                }
            </div>
        </div>
    );
}