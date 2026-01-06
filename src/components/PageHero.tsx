"use client";

import Link from "next/link";
import { AnimateIn } from "./AnimateIn";

interface PageHeroProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  backgroundImage?: string;
}

export function PageHero({ title, breadcrumbs, backgroundImage }: PageHeroProps) {
  return (
    <section
      className={`relative py-12 md:py-20 border-b border-gray-200 dark:border-gray-800 ${!backgroundImage ? 'hero-bg' : ''}`}
    >
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover opacity-40 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent dark:from-gray-900/80"></div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <AnimateIn animation="fade-up" duration={800}>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {title}
          </h1>
        </AnimateIn>
        <AnimateIn animation="fade-in" delay={200} duration={600}>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="material-icons-outlined text-xs text-gray-400">
                    chevron_right
                  </span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-primary font-medium">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
