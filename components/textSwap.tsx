import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function TextSwap() {
    const [isHovered, setIsHovered] = useState(false);
    const textRef = useRef(null);
    const swapRef = useRef(null);

    useEffect(() => {
        if (isHovered) {
            gsap.to(textRef.current, { y: -30, opacity: 0, duration: 0.5, ease: 'power3.out' });
            gsap.to(swapRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.3 });
        } else {
            gsap.to(swapRef.current, { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' });
            gsap.to(textRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.3 });
        }
    }, [isHovered]);

    return (
        <div className="relative inline-block h-10 overflow-hidden text-dark"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
            <div ref={textRef} className="absolute top-0 left-0 w-52 transition-transform duration-500 ease-in-out">
                <p className="text-dark">Text Original</p>
            </div>
            <div ref={swapRef} className="absolute top-full left-0 w-full opacity-0 transition-transform duration-500 ease-in-out">
                <p className="text-colored">Text Hover</p>
            </div>
        </div>
    );
}