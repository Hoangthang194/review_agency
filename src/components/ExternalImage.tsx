"use client";

import Image from "next/image";

interface ExternalImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    fill?: boolean;
    priority?: boolean;
    quality?: number;
    sizes?: string;
}

/**
 * Component to handle external images.
 * For external URLs, uses regular img tag to avoid Next.js Image optimization issues.
 * For local images, uses Next.js Image component for optimization.
 */
export function ExternalImage({
    src,
    alt,
    width,
    height,
    className,
    fill,
    priority,
    quality,
    sizes,
}: ExternalImageProps) {
    // Check if src is an external URL
    const isExternal = src?.startsWith("http://") || src?.startsWith("https://");

    // For external URLs, use regular img tag to avoid Next.js Image optimization issues
    if (isExternal) {
        if (fill) {
            return (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    style={{ 
                        objectFit: "contain",
                        width: "100%",
                        height: "100%"
                    }}
                />
            );
        }
        return (
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={className}
            />
        );
    }

    // For local images, use Next.js Image normally
    if (fill) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                className={className}
                quality={quality}
                priority={priority}
                sizes={sizes}
            />
        );
    }
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            quality={quality}
            priority={priority}
        />
    );
}

