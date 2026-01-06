"use client";

import { useEffect, useRef, ReactNode, useState } from "react";

interface AnimateInProps {
    children: ReactNode;
    animation?: "fade-up" | "fade-in" | "slide-left" | "scale-in";
    delay?: number;
    duration?: number;
    className?: string;
    triggerOnScroll?: boolean;
    threshold?: number;
}

export function AnimateIn({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 800,
    className = "",
    triggerOnScroll = true,
    threshold = 0.1,
}: AnimateInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const animations: Record<string, any> = {
            "fade-up": {
                opacity: [0, 1],
                translateY: [30, 0],
            },
            "fade-in": {
                opacity: [0, 1],
            },
            "slide-left": {
                opacity: [0, 1],
                translateX: [50, 0],
            },
            "scale-in": {
                opacity: [0, 1],
                scale: [0.9, 1],
            },
        };

        const runAnimation = () => {
            if (hasAnimated && triggerOnScroll) return;
            
            import('animejs').then((animeModule) => {
                const animate = animeModule.animate;
                const element = ref.current;
                
                if (!element) return;

                animate(element, {
                    ...animations[animation],
                    duration,
                    delay,
                    ease: "outCubic",
                });
                
                if (triggerOnScroll) {
                    setHasAnimated(true);
                }
            });
        };

        if (!triggerOnScroll) {
            runAnimation();
            return;
        }

        // Use Intersection Observer for scroll-triggered animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        runAnimation();
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [animation, delay, duration, triggerOnScroll, threshold, hasAnimated]);

    return (
        <div ref={ref} className={className} style={{ opacity: 0 }}>
            {children}
        </div>
    );
}
