"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
    {
        id: 1,
        badge: "Trading Signals And Get Stable Profits",
        title: "Follow Top Traders And Lead In Forex Trading",
        titleHighlight: "Traders",
        description: "Welcome to TRADEXY, your trusted partner in forex trading. Whether you're a beginner or an expert, we simplify your journey to financial freedom.",
        slideTitle: "Forex Brokers",
        slideDescription: "Compare and review the best forex brokers. Find trusted platforms with expert analysis and detailed comparisons.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB6WZlWRssL_LuOaHV0D238JGjjshj4QbJTBELI0EtR7xd9_wvoryBPkZnL3kDnSdzvI0sxcmKw9dmQH8ujXxbHGj822BAsf5iSHBwTTvRklHgpMEdcL1s2kOyXfAaQNeDUohutUbL3jhScsdJH1ZKelcOnfwPidU95JfZBjcZXtAHyX_xgavmaZ-kG56bG3JQDHuH2kafA8_T_DNmG07sTBBKXVfYCfcewAMvTH7SiQdVl7gTpDOz4QrXo3FNyuMq_JtCvRFBqUo",
        link: "/forex-brokers",
    },
    {
        id: 2,
        badge: "Crypto Trading Made Simple",
        title: "Discover Top Cryptocurrency Exchanges",
        titleHighlight: "Exchanges",
        description: "Explore secure and reliable cryptocurrency platforms. Get comprehensive reviews and expert insights to make informed trading decisions.",
        slideTitle: "Crypto Exchanges",
        slideDescription: "Discover top cryptocurrency exchanges. Secure, reliable platforms with comprehensive reviews and ratings.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB6WZlWRssL_LuOaHV0D238JGjjshj4QbJTBELI0EtR7xd9_wvoryBPkZnL3kDnSdzvI0sxcmKw9dmQH8ujXxbHGj822BAsf5iSHBwTTvRklHgpMEdcL1s2kOyXfAaQNeDUohutUbL3jhScsdJH1ZKelcOnfwPidU95JfZBjcZXtAHyX_xgavmaZ-kG56bG3JQDHuH2kafA8_T_DNmG07sTBBKXVfYCfcewAMvTH7SiQdVl7gTpDOz4QrXo3FNyuMq_JtCvRFBqUo",
        link: "/crypto-exchanges",
    },
    {
        id: 3,
        badge: "Proprietary Trading Excellence",
        title: "Explore Leading Prop Trading Firms",
        titleHighlight: "Prop Firms",
        description: "Join thousands of traders who trust TRADEXY for prop firm reviews. Find the best opportunities to grow your trading capital.",
        slideTitle: "Prop Firms",
        slideDescription: "Explore leading proprietary trading firms. Find the best prop firms with detailed reviews and expert insights.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB6WZlWRssL_LuOaHV0D238JGjjshj4QbJTBELI0EtR7xd9_wvoryBPkZnL3kDnSdzvI0sxcmKw9dmQH8ujXxbHGj822BAsf5iSHBwTTvRklHgpMEdcL1s2kOyXfAaQNeDUohutUbL3jhScsdJH1ZKelcOnfwPidU95JfZBjcZXtAHyX_xgavmaZ-kG56bG3JQDHuH2kafA8_T_DNmG07sTBBKXVfYCfcewAMvTH7SiQdVl7gTpDOz4QrXo3FNyuMq_JtCvRFBqUo",
        link: "/prop-firms",
    },
];

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('next');
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                setTimeout(() => setIsTransitioning(false), 50);
            }, 600);
        }, 5000); // Auto-slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => {
        if (index === currentSlide || isTransitioning) return;
        const newDirection = index > currentSlide ? 'next' : 'prev';
        setDirection(newDirection);
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide(index);
            setTimeout(() => setIsTransitioning(false), 50);
        }, 600);
    };

    const nextSlide = () => {
        if (isTransitioning) return;
        setDirection('next');
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setTimeout(() => setIsTransitioning(false), 50);
        }, 600);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setDirection('prev');
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setTimeout(() => setIsTransitioning(false), 50);
        }, 600);
    };

    return (
        <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden">
            {/* Full-Width Background Slider */}
            <div className="absolute inset-0 overflow-hidden">
                {slides.map((slide, index) => {
                    const offset = index - currentSlide;
                    const isActive = index === currentSlide;
                    const isNext = offset === 1 || (currentSlide === slides.length - 1 && index === 0);
                    const isPrev = offset === -1 || (currentSlide === 0 && index === slides.length - 1);
                    
                    let translateX = '100%';
                    if (isActive) {
                        translateX = '0%';
                    } else if (isNext) {
                        translateX = '100%';
                    } else if (isPrev) {
                        translateX = '-100%';
                    } else {
                        translateX = offset > 0 ? '100%' : '-100%';
                    }

                    return (
                        <div
                            key={slide.id}
                            className="absolute inset-0 will-change-transform"
                            style={{
                                transform: `translateX(${translateX})`,
                                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                zIndex: isActive ? 10 : 0,
                            }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt={slide.slideTitle}
                                    fill
                                    className="object-cover"
                                    quality={90}
                                    priority={index === 0}
                                    sizes="100vw"
                                />
                            </div>
                            
                            {/* Dark Gradient Overlay (40-60% opacity) */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/45 to-blue-900/55"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
                        </div>
                    );
                })}
            </div>

            {/* Content Container */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden">
                <div className="w-full text-center relative" style={{ height: '100%' }}>
                    {slides.map((slide, index) => {
                        const isActive = index === currentSlide;
                        const offset = index - currentSlide;
                        const isNext = offset === 1 || (currentSlide === slides.length - 1 && index === 0);
                        const isPrev = offset === -1 || (currentSlide === 0 && index === slides.length - 1);
                        
                        let translateX = '100%';
                        if (isActive) {
                            translateX = '0%';
                        } else if (isNext) {
                            translateX = '100%';
                        } else if (isPrev) {
                            translateX = '-100%';
                        } else {
                            translateX = offset > 0 ? '100%' : '-100%';
                        }

                        return (
                        <div
                            key={slide.id}
                            className="absolute inset-0 will-change-transform flex items-center justify-center"
                            style={{
                                transform: `translateX(${translateX})`,
                                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: isActive ? 1 : 0,
                                pointerEvents: isActive ? 'auto' : 'none',
                            }}
                        >
                            {/* Glassmorphism Container */}
                            <div 
                                className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-3xl p-8 md:p-12 lg:p-16 border border-white/20 dark:border-white/10 shadow-2xl max-w-4xl mx-auto w-full"
                                style={{
                                    animation: isActive ? 'slideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both' : 'none',
                                }}
                            >
                                {/* Badge */}
                                <div 
                                    className="flex items-center justify-center gap-2 mb-6"
                                    style={{
                                        animation: isActive ? 'slideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both' : 'none',
                                    }}
                                >
                                    <span className="material-icons-outlined text-secondary animate-pulse text-xl">
                                        auto_graph
                                    </span>
                                    <span className="font-semibold text-white/90 tracking-wide text-sm uppercase">
                                        {slide.badge}
                                    </span>
                                </div>

                                {/* Main Headline */}
                                <h1 
                                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-2xl" 
                                    style={{ 
                                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)',
                                        animation: isActive ? 'slideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both' : 'none',
                                    }}
                                >
                                    {slide.title.includes(slide.titleHighlight) ? (
                                        <>
                                            {slide.title.split(slide.titleHighlight)[0]}
                                            <span className="text-secondary drop-shadow-lg" style={{ textShadow: '0 4px 20px rgba(249, 115, 22, 0.4), 0 2px 10px rgba(249, 115, 22, 0.2)' }}>
                                                {slide.titleHighlight}
                                            </span>
                                            {slide.title.split(slide.titleHighlight)[1]}
                                        </>
                                    ) : (
                                        slide.title
                                    )}
                                </h1>

                                {/* Description */}
                                <p 
                                    className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg" 
                                    style={{ 
                                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                                        animation: isActive ? 'slideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both' : 'none',
                                    }}
                                >
                                    {slide.description}
                                </p>

                                {/* CTA Buttons */}
                                <div 
                                    className="flex flex-wrap justify-center gap-4"
                                    style={{
                                        animation: isActive ? 'slideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both' : 'none',
                                    }}
                                >
                                    <Link
                                        href={slide.link}
                                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 shadow-xl shadow-blue-500/50 hover:shadow-blue-500/70 flex items-center gap-2 hover:scale-110 hover:-translate-y-1"
                                    >
                                        Explore Reviews
                                        <span className="material-icons-outlined text-sm">
                                            north_east
                                        </span>
                                    </Link>
                                    <Link
                                        href="/market-analysis"
                                        className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-xl shadow-white/20 hover:shadow-white/40 hover:scale-110 hover:-translate-y-1 border border-white/30"
                                    >
                                        Market Analysis
                                        <span className="material-icons-outlined text-sm">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-xl hover:bg-white/20 transition-all duration-300 z-30 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
            >
                <span className="material-icons-outlined text-white text-2xl drop-shadow-lg">
                    chevron_left
                </span>
            </button>
            <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-xl hover:bg-white/20 transition-all duration-300 z-30 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
            >
                <span className="material-icons-outlined text-white text-2xl drop-shadow-lg">
                    chevron_right
                </span>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        disabled={isTransitioning}
                        className={`h-2.5 rounded-full transition-all duration-300 backdrop-blur-sm disabled:cursor-not-allowed ${
                            index === currentSlide
                                ? "bg-white w-10 shadow-lg"
                                : "bg-white/40 w-2.5 hover:bg-white/60 hover:w-4"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <style jsx>{`
                @keyframes slideInFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </section>
    );
}
