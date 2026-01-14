"use client";

import { useRef, useEffect } from "react";
import { PageHero } from "./PageHero";
import Link from "next/link";
import Image from "next/image";
import { ExternalImage } from "./ExternalImage";
import { BrokerData, forexBrokersData, cryptoExchangesData, propFirmsData } from "@/data/mockData";

interface BrokerDetailPageProps {
    data: BrokerData;
    type: "forex" | "crypto" | "prop";
    backgroundImage?: string;
}

// Component to render HTML content with script execution support
function ContentRenderer({ 
    html, 
    onRender, 
    processHeadings = false 
}: { 
    html: string; 
    onRender: (html: string, container: HTMLDivElement) => void;
    processHeadings?: boolean;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lastHtmlRef = useRef<string>('');

    useEffect(() => {
        if (!containerRef.current || !html || html === lastHtmlRef.current) return;
        
        lastHtmlRef.current = html;
        
        // Process content to add IDs to headings if needed
        let processedContent = html;
        if (processHeadings) {
            const headingRegex = /<(h[2-4])([^>]*)>(.*?)<\/h[2-4]>/gi;
            const processedIds = new Set<string>();
            let idCounter = 0;
            
            processedContent = processedContent.replace(headingRegex, (match, tag, attrs, text) => {
                // Extract text content (remove HTML tags using regex)
                const textContent = text.replace(/<[^>]*>/g, '').trim();
                
                // Generate ID from text
                let id = textContent
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                
                // If ID is empty or already exists, add counter
                if (!id) {
                    id = `heading-${idCounter++}`;
                } else if (processedIds.has(id)) {
                    id = `${id}-${idCounter++}`;
                }
                
                processedIds.add(id);
                
                // Check if attrs already has id
                const hasId = /id\s*=\s*["']([^"']+)["']/i.test(attrs);
                if (!hasId) {
                    return `<${tag}${attrs} id="${id}" data-heading-id="${id}">${text}</${tag}>`;
                } else {
                    // Extract existing ID and use it
                    const existingIdMatch = attrs.match(/id\s*=\s*["']([^"']+)["']/i);
                    const existingId = existingIdMatch ? existingIdMatch[1] : id;
                    return `<${tag}${attrs} data-heading-id="${existingId}">${text}</${tag}>`;
                }
            });
        }
        
        // Render HTML with script execution
        if (containerRef.current) {
            onRender(processedContent, containerRef.current);
        }
    }, [html, processHeadings, onRender]);

    return (
        <div
            ref={containerRef}
            className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-secondary-text dark:text-secondary-text-dark leading-relaxed
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8 prose-h1:border-b prose-h1:border-gray-200 dark:prose-h1:border-gray-700 prose-h1:pb-2
                prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:font-semibold
                prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4 prose-h4:font-semibold
                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:text-gray-600 dark:prose-ul:text-gray-300 prose-ul:mb-4 prose-ul:ml-4
                prose-ol:text-gray-600 dark:prose-ol:text-gray-300 prose-ol:mb-4 prose-ol:ml-4
                prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:mb-2
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-4
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                prose-code:text-sm prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4"
        />
    );
}

export function BrokerDetailPage({ data, type, backgroundImage }: BrokerDetailPageProps) {
    const typeLabels = {
        forex: "Forex Brokers",
        crypto: "Crypto Exchanges",
        prop: "Prop Firms",
    };

    const typePaths = {
        forex: "/forex-brokers",
        crypto: "/crypto-exchanges",
        prop: "/prop-firms",
    };

    // Get related brokers (same type, different slug)
    const getRelatedBrokers = (): BrokerData[] => {
        let allBrokers: BrokerData[] = [];
        if (type === "forex") {
            allBrokers = Object.values(forexBrokersData);
        } else if (type === "crypto") {
            allBrokers = Object.values(cryptoExchangesData);
        } else if (type === "prop") {
            allBrokers = Object.values(propFirmsData);
        }
        // Filter out current broker and get 3 related ones
        return allBrokers.filter(broker => broker.slug !== data.slug).slice(0, 3);
    };

    const relatedBrokers = getRelatedBrokers();

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <span
                key={i}
                className={`material-icons-outlined text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
            >
                star
            </span>
        ));
    };

    // Function to execute scripts in HTML content
    const executeScripts = (container: HTMLElement) => {
        // Find all script tags in the container
        const scripts = container.querySelectorAll('script');
        scripts.forEach((oldScript) => {
            // Create new script element
            const newScript = document.createElement('script');
            
            // Copy attributes
            Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            // Copy script content
            if (oldScript.src) {
                newScript.src = oldScript.src;
            } else {
                newScript.textContent = oldScript.textContent;
            }
            
            // Replace old script with new one (this triggers execution)
            if (oldScript.parentNode) {
                oldScript.parentNode.replaceChild(newScript, oldScript);
            }
        });
    };

    // Function to normalize and attach event handlers
    const attachEventHandlers = (container: HTMLElement) => {
        // Find all elements with event handlers that haven't been processed yet
        const allElements = container.querySelectorAll('*:not([data-handlers-attached])');
        
        allElements.forEach((element) => {
            const htmlElement = element as HTMLElement;
            
            // Check all possible event handler attributes (both JSX and HTML format)
            const eventHandlerPairs = [
                ['onClick', 'onclick'],
                ['onChange', 'onchange'],
                ['onSubmit', 'onsubmit'],
                ['onMouseOver', 'onmouseover'],
                ['onMouseOut', 'onmouseout'],
                ['onFocus', 'onfocus'],
                ['onBlur', 'onblur'],
                ['onKeyDown', 'onkeydown'],
                ['onKeyUp', 'onkeyup'],
                ['onKeyPress', 'onkeypress'],
                ['onLoad', 'onload'],
                ['onError', 'onerror'],
                ['onDoubleClick', 'ondblclick']
            ];
            
            eventHandlerPairs.forEach(([jsxName, htmlName]) => {
                // Check if element has JSX format handler
                let handlerValue = htmlElement.getAttribute(jsxName);
                const hasJsxHandler = !!handlerValue;
                
                // If no JSX handler, check HTML format
                if (!handlerValue) {
                    handlerValue = htmlElement.getAttribute(htmlName);
                }
                
                if (handlerValue) {
                    // Remove JSX format if exists
                    if (hasJsxHandler) {
                        htmlElement.removeAttribute(jsxName);
                    }
                    
                    // Process handler value - handle both string and JSX arrow function format
                    let processedValue = handlerValue.trim();
                    
                    // If it's JSX arrow function format: onClick={() => console.log("haha")}
                    // Convert to: onclick="console.log('haha')"
                    if (processedValue.startsWith('() => ') || processedValue.startsWith('()=>')) {
                        // Extract the body of the arrow function
                        const arrowMatch = processedValue.match(/\(\)\s*=>\s*(.+)/);
                        if (arrowMatch) {
                            processedValue = arrowMatch[1].trim();
                            
                            // Remove surrounding braces if present
                            if (processedValue.startsWith('{') && processedValue.endsWith('}')) {
                                processedValue = processedValue.slice(1, -1).trim();
                            }
                        }
                    }
                    // If it starts with { (JSX expression), extract content
                    else if (processedValue.startsWith('{') && processedValue.endsWith('}')) {
                        processedValue = processedValue.slice(1, -1).trim();
                    }
                    // If it's wrapped in quotes, unwrap it
                    else if (
                        (processedValue.startsWith('"') && processedValue.endsWith('"')) ||
                        (processedValue.startsWith("'") && processedValue.endsWith("'"))
                    ) {
                        processedValue = processedValue.slice(1, -1);
                    }
                    
                    // Convert double quotes to single quotes in JavaScript code to avoid escaping issues
                    // This ensures: console.log("haha") becomes console.log('haha')
                    processedValue = processedValue.replace(/"/g, "'");
                    
                    // Remove any existing inline handler first to prevent duplicate execution
                    htmlElement.removeAttribute(htmlName);
                    
                    // Use addEventListener instead of inline handlers to avoid duplicate execution
                    const eventName = htmlName.replace('on', '').toLowerCase();
                    
                    try {
                        // Create a function from the handler string and attach as event listener
                        // This is more reliable than inline handlers and prevents duplicates
                        const handlerFunction = new Function('event', processedValue);
                        htmlElement.addEventListener(eventName, handlerFunction as EventListener);
                        
                        // Mark this element as processed to avoid duplicate attachments
                        htmlElement.setAttribute('data-handlers-attached', 'true');
                    } catch (error) {
                        console.warn(`Failed to attach event handler ${htmlName}:`, error, 'Value:', processedValue);
                        // Mark as processed even on error to avoid retrying
                        htmlElement.setAttribute('data-handlers-attached', 'true');
                    }
                }
            });
        });
    };

    // Function to render HTML with script execution support
    const renderHtmlWithScripts = (html: string, container: HTMLDivElement) => {
        if (!container) return;

        // First, normalize JSX-style event handlers to HTML format
        let normalizedHtml = html;
        
        // Convert JSX onClick={...} to HTML onclick="..."
        // Pattern: onClick={() => console.log("haha")} or onClick="console.log('haha')"
        normalizedHtml = normalizedHtml.replace(
            /onClick\s*=\s*{\(\)\s*=>\s*([^}]+)}/g,
            (match, body) => {
                // Extract the function body
                let handlerBody = body.trim();
                // Remove surrounding braces if present
                if (handlerBody.startsWith('{') && handlerBody.endsWith('}')) {
                    handlerBody = handlerBody.slice(1, -1).trim();
                }
                // Convert double quotes to single quotes to avoid HTML escaping issues
                handlerBody = handlerBody.replace(/"/g, "'");
                // Use double quotes wrapper (handlerBody now uses single quotes)
                return `onclick="${handlerBody}"`;
            }
        );
        
        // Convert onClick={...} (without arrow function) to onclick="..."
        normalizedHtml = normalizedHtml.replace(
            /onClick\s*=\s*{([^}]+)}/g,
            (match, body) => {
                let handlerBody = body.trim();
                // Convert double quotes to single quotes
                handlerBody = handlerBody.replace(/"/g, "'");
                return `onclick="${handlerBody}"`;
            }
        );
        
        // Convert onClick="..." to onclick="..." (already in HTML format, just lowercase)
        normalizedHtml = normalizedHtml.replace(/onClick\s*=\s*"([^"]+)"/g, (match, value) => {
            // Convert double quotes to single quotes in the value
            const converted = value.replace(/"/g, "'");
            return `onclick="${converted}"`;
        });
        normalizedHtml = normalizedHtml.replace(/onClick\s*=\s*'([^']+)'/g, "onclick='$1'");

        // Set innerHTML
        container.innerHTML = normalizedHtml;
        
        // Attach event handlers and execute scripts after a small delay
        setTimeout(() => {
            if (container) {
                attachEventHandlers(container);
                executeScripts(container);
            }
        }, 10);
    };

    return (
        <>
            <PageHero
                title={`${data.name} Review 2024`}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: typeLabels[type], href: typePaths[type] },
                    { label: data.name },
                ]}
                backgroundImage={backgroundImage}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-surface-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0">
                            {data.logo ? (
                                <div className={`w-24 h-24 ${data.logoBg || "bg-black"} rounded-xl flex items-center justify-center p-2 shadow-inner overflow-hidden`}>
                                    {data.logo.startsWith("http://") || data.logo.startsWith("https://") ? (
                                        <ExternalImage
                                            src={data.logo}
                                            alt={data.name}
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <Image
                                            src={data.logo}
                                            alt={data.name}
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className={`w-24 h-24 ${data.logoBg || "bg-black"} rounded-xl flex items-center justify-center p-2 shadow-inner`}>
                                    <span className="text-white font-bold text-xl">
                                        {data.name.substring(0, 2).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="mt-2 flex justify-center text-yellow-400 text-sm">
                                {renderStars(data.rating)}
                            </div>
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
                                {data.reviews.toLocaleString('en-US')}+ Reviews
                            </p>
                        </div>
                        <div className="flex-grow">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {data.name} Review 2024
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                {data.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {data.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded border border-blue-100 dark:border-blue-800"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-auto flex md:flex-col justify-center items-center gap-3">
                            <button className="w-full md:w-48 bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                                Visit Site{" "}
                                <span className="material-icons-outlined text-sm">
                                    open_in_new
                                </span>
                            </button>
                            <span className="text-xs text-gray-400 text-center">
                                T&amp;Cs Apply
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                        {data.stats.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center p-2 text-center ${index === 4
                                    ? "col-span-2 md:col-span-1 border-t md:border-t-0 border-gray-100 dark:border-gray-700 mt-2 md:mt-0 pt-4 md:pt-0"
                                    : ""
                                    }`}
                            >
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full mb-2">
                                    <span className="material-icons-outlined text-blue-600 dark:text-blue-400">
                                        {item.icon}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                    {item.title}
                                </span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-4 tracking-wider">
                                    Terms
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    {data.terms.map((item, i) => (
                                        <li key={i} className="flex justify-between">
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {item.label}
                                            </span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {item.value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-4 tracking-wider">
                                    Key Info
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    {data.keyInfo.map((item, i) => (
                                        <li key={i} className="flex justify-between">
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {item.label}
                                            </span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {item.value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-icons-outlined text-green-500">
                                            check_circle
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Pros
                                        </h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {data.pros.map((pro, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                                            >
                                                <span className="material-icons-outlined text-blue-500 text-base mt-0.5">
                                                    done
                                                </span>
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-icons-outlined text-red-500">
                                            cancel
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Cons
                                        </h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {data.cons.map((con, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                                            >
                                                <span className="material-icons-outlined text-red-500 text-base mt-0.5">
                                                    close
                                                </span>
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <section className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <ContentRenderer
                                html={data.content}
                                onRender={renderHtmlWithScripts}
                                processHeadings={true}
                            />
                        </section>

                        <section className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Average Reviews
                            </h2>
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="bg-primary text-white rounded-lg p-6 w-full md:w-48 flex flex-col items-center justify-center shadow-lg shadow-blue-500/20">
                                    <span className="text-4xl font-bold mb-1">
                                        {data.averageRating}
                                        <span className="text-xl font-normal text-blue-200">/5</span>
                                    </span>
                                    <div className="flex text-yellow-300 text-lg mb-2">
                                        {renderStars(data.averageRating)}
                                    </div>
                                    <span className="text-xs text-blue-100">
                                        {data.reviews.toLocaleString('en-US')}+ Ratings
                                    </span>
                                </div>
                                <div className="flex-grow w-full space-y-3">
                                    {data.ratingBreakdown.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm">
                                            <span className="w-4 font-medium text-gray-600 dark:text-gray-300">
                                                {item.stars}
                                            </span>
                                            <span className="material-icons-outlined text-yellow-400 text-base">
                                                star
                                            </span>
                                            <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-secondary h-2 rounded-full"
                                                    style={{ width: item.pct }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-6">
                        <div className="bg-secondary rounded-xl p-8 text-center text-white shadow-lg shadow-orange-500/30">
                            <div className="text-5xl font-bold mb-2">
                                {data.averageRating}
                                <span className="text-2xl font-normal opacity-80">/5</span>
                            </div>
                            <div className="flex justify-center text-white mb-2">
                                {renderStars(data.averageRating)}
                            </div>
                            <p className="text-sm font-medium opacity-90">
                                {data.reviews.toLocaleString('en-US')}+ Ratings
                            </p>
                        </div>

                        <div className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Advantages
                            </h3>
                            <div className="space-y-3">
                                {data.advantages.map((item, i) => (
                                    <div key={i}>
                                        <Link
                                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition group"
                                            href="#"
                                        >
                                            <span className="material-icons-outlined text-primary text-sm group-hover:translate-x-1 transition-transform">
                                                chevron_right
                                            </span>
                                            {item}
                                        </Link>
                                        {i < data.advantages.length - 1 && (
                                            <div className="h-px bg-gray-100 dark:bg-gray-700 border-t border-dashed w-full mt-2"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Disadvantages
                            </h3>
                            <div className="space-y-3">
                                {data.disadvantages.map((item, i) => (
                                    <div key={i}>
                                        <Link
                                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 transition group"
                                            href="#"
                                        >
                                            <span className="material-icons-outlined text-secondary text-sm group-hover:translate-x-1 transition-transform">
                                                chevron_right
                                            </span>
                                            {item}
                                        </Link>
                                        {i < data.disadvantages.length - 1 && (
                                            <div className="h-px bg-gray-100 dark:bg-gray-700 border-t border-dashed w-full mt-2"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Brokers Section */}
                {relatedBrokers.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
                            Related Reviews
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedBrokers.map((broker) => (
                                <Link
                                    key={broker.slug}
                                    href={`${typePaths[type]}/${broker.slug}`}
                                    className="bg-surface-light dark:bg-card-dark rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:-translate-y-1 group"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start gap-4 mb-4">
                                            {broker.logo ? (
                                                <div className={`w-16 h-16 ${broker.logoBg || "bg-black"} rounded-lg flex items-center justify-center p-2 shadow-inner overflow-hidden flex-shrink-0`}>
                                                    {broker.logo.startsWith("http://") || broker.logo.startsWith("https://") ? (
                                                        <ExternalImage
                                                            src={broker.logo}
                                                            alt={broker.name}
                                                            width={56}
                                                            height={56}
                                                            className="object-contain"
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={broker.logo}
                                                            alt={broker.name}
                                                            width={56}
                                                            height={56}
                                                            className="object-contain"
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                <div className={`w-16 h-16 ${broker.logoBg || "bg-black"} rounded-lg flex items-center justify-center p-2 shadow-inner flex-shrink-0`}>
                                                    <span className="text-white font-bold text-lg">
                                                        {broker.name.substring(0, 2).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex-grow min-w-0">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                                    {broker.name} Review 2024
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <div className="flex text-yellow-400">
                                                        {renderStars(broker.rating)}
                                                    </div>
                                                    <span>({broker.reviews.toLocaleString('en-US')}+ Reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                                            {broker.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {broker.tags.slice(0, 2).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded border border-blue-100 dark:border-blue-800"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}

