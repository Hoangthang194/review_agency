"use client";

import { useEffect } from "react";

interface Script {
  id: number;
  script_content: string;
}

// Helper function to validate attribute name
function isValidAttributeName(name: string): boolean {
  // HTML attribute names must start with a letter and can contain letters, digits, hyphens, underscores, and colons
  // They cannot contain spaces, backticks, or other special characters
  return /^[a-zA-Z][a-zA-Z0-9\-_:]*$/.test(name) && name.length > 0;
}

// Helper function to safely set attributes
function setAttributesSafely(target: HTMLElement, source: Element) {
  Array.from(source.attributes).forEach((attr) => {
    if (isValidAttributeName(attr.name)) {
      try {
        target.setAttribute(attr.name, attr.value);
      } catch (error) {
        console.warn(`Failed to set attribute "${attr.name}":`, error);
      }
    } else {
      console.warn(`Skipping invalid attribute name: "${attr.name}"`);
    }
  });
}

export default function ScriptsInjector() {
  useEffect(() => {
    // Fetch active scripts
    const fetchAndInjectScripts = async () => {
      try {
        const response = await fetch("/api/scripts?activeOnly=true");
        const data = await response.json();

        if (data && Array.isArray(data)) {
          const scripts: Script[] = data;

          // Inject each script into the head
          scripts.forEach((script) => {
            // Check if script already exists to avoid duplicates
            const existingScript = document.head.querySelector(
              `[data-script-id="${script.id}"]`
            );

            if (existingScript) {
              return; // Skip if already injected
            }

            // Create a temporary container to parse HTML
            const container = document.createElement("div");
            container.innerHTML = script.script_content;

            // Get all elements from the container
            const elements = Array.from(container.children);

            elements.forEach((element) => {
              // For script tags, we need special handling
              if (element.tagName === "SCRIPT") {
                const scriptElement = document.createElement("script");

                // Copy all attributes safely
                setAttributesSafely(scriptElement, element);

                // Copy innerHTML/textContent if it exists
                if (element.textContent) {
                  scriptElement.textContent = element.textContent;
                }

                scriptElement.setAttribute("data-script-id", script.id.toString());
                document.head.appendChild(scriptElement);
              } else if (element.tagName === "LINK" || element.tagName === "META") {
                // For link and meta tags, create new element and copy attributes safely
                const clonedElement = document.createElement(element.tagName.toLowerCase());
                setAttributesSafely(clonedElement, element);
                clonedElement.setAttribute("data-script-id", script.id.toString());
                document.head.appendChild(clonedElement);
              } else if (element.tagName === "NOSCRIPT") {
                // For noscript tags, append to body instead
                const clonedElement = document.createElement(element.tagName.toLowerCase());
                setAttributesSafely(clonedElement, element);
                // Copy innerHTML for noscript
                if (element.innerHTML) {
                  clonedElement.innerHTML = element.innerHTML;
                }
                clonedElement.setAttribute("data-script-id", script.id.toString());
                document.body.appendChild(clonedElement);
              } else {
                // For any other tags, try to append to head
                const clonedElement = document.createElement(element.tagName.toLowerCase());
                setAttributesSafely(clonedElement, element);
                // Copy innerHTML if it exists
                if (element.innerHTML) {
                  clonedElement.innerHTML = element.innerHTML;
                }
                clonedElement.setAttribute("data-script-id", script.id.toString());
                document.head.appendChild(clonedElement);
              }
            });
          });
        }
      } catch (error) {
        console.error("Error fetching scripts:", error);
      }
    };

    // Only run on client side and after a small delay to ensure DOM is ready
    if (typeof window !== "undefined") {
      fetchAndInjectScripts();
    }
  }, []);

  return null; // This component doesn't render anything
}

