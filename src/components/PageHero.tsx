"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimateIn } from "./AnimateIn";
import { useEffect, useRef } from "react";

interface PageHeroProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  backgroundImage?: string;
}

export function PageHero({ title, breadcrumbs, backgroundImage }: PageHeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundImage || !parallaxRef.current) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = parallaxRef.current;
      if (parallax) {
        const speed = 0.5;
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [backgroundImage]);

  return (
    <section
      className={`relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden ${!backgroundImage ? 'hero-bg' : ''}`}
    >
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={parallaxRef}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover"
              quality={90}
              priority
              sizes="100vw"
            />
          </div>
          {/* Dark Gradient Overlay (40-60% opacity) */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/45 to-blue-900/55"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
        </div>
      )}
      
      {/* Content with Glassmorphism */}
      <div className="relative z-20 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <AnimateIn animation="fade-up" duration={1000} delay={100}>
          {/* Glassmorphism Container */}
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-3xl p-8 md:p-12 lg:p-16 border border-white/20 dark:border-white/10 shadow-2xl max-w-5xl mx-auto">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight text-white" 
              style={{ 
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)',
                fontFamily: 'var(--font-plus-jakarta), Inter, system-ui, sans-serif'
              }}
            >
              {title}
            </h1>
          </div>
        </AnimateIn>
        
        <AnimateIn animation="fade-in" delay={300} duration={800}>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base mt-6">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="material-icons-outlined text-xs text-white/60">
                    chevron_right
                  </span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-primary transition-colors duration-200 font-semibold text-white/90 drop-shadow-md"
                    style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span 
                    className="text-secondary font-bold drop-shadow-lg"
                    style={{ textShadow: '0 2px 10px rgba(249, 115, 22, 0.4)' }}
                  >
                    {crumb.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}
