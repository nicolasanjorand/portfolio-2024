// components/AnimatedParagraphs.js
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';


const AnimatedParagraphs = () => {
    var vsOpts = {
        slides: document.querySelectorAll('.v-slide'),
        list: document.querySelector('.v-slides'),
        duration: 0.3,
        lineHeight: 50
    }

    var vSlide = gsap.timeline({
        paused: true,
        repeat: -1
    });

    vsOpts.slides.forEach(function(slide, i) {
        // Create a label
        let label = "slide" + i;
        vSlide.add(label);

        // Move the whole word
        if(i > 0) {
            vSlide.to(vsOpts.list, {
                duration: vsOpts.duration,
                y: i * -1 * vsOpts.lineHeight
            }, label);

            // Move each letter
            vSlide.from(slide, {
                duration: vsOpts.duration,
                y: 50,
                stagger: vsOpts.duration / 10
            }, label);

            // Add some blank space before the next animation
            vSlide.to({}, {duration: 1});
        }
    })
    vSlide.play();

    return (
        <div className="h-[50px] bg-[blue] overflow-hidden">
            <ul className="p-0 m-0 v-slides">
                <li className="text-light v-slide">Websites</li>
                <li className="text-light v-slide">Plugins</li>
                <li className="text-light v-slide">Web Apps</li>
                <li className="text-light v-slide">Portals</li>
                <li className="text-light v-slide">Communities</li>
                <li className="text-light v-slide">Digital Marketing</li>
            </ul>
        </div>
    );
};

export default AnimatedParagraphs;
